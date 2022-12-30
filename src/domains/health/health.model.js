import { randomUUID } from 'node:crypto'
import os from 'node:os'

import { dataSource } from '../../data-source.js'

import { config } from '../../../config/index.js'
import { formatBytes } from '../../utils/formatBytes.js'
import { getCpuLoad } from '../../utils/getCpuLoad.js'

const SERVICE_IDS = {
  base: randomUUID(),
  cpu: randomUUID(),
  database: randomUUID(),
  memory: randomUUID(),
  server: randomUUID()
}

const THRESHOLDS = {
  memory: 1024 * 1024
}

const base = () => {
  return {
    status: 'pass',
    version: config.server.version.split('.')[0],
    releaseId: config.server.version,
    notes: [''],
    output: '',
    serviceId: SERVICE_IDS.base,
    description: 'health of api service'
  }
}

export const check = async () => {
  return {
    ...base(),
    checks: {
      ...await server(),
      ...await database()
    }
  }
}

// TODO: Get the CPU utilization of each core
const getCpuUtilization = async () => {
  const cpuAverage = await getCpuLoad(1000, 100)

  return {
    'cpu:utilization': [{
      componentId: SERVICE_IDS.cpu,
      node: 1,
      componentType: 'system',
      observedValue: cpuAverage,
      observedUnit: 'percent',
      status: 'warn',
      time: '2018-01-17T03:36:48Z',
      output: ''
    }]
  }
}

const getMemoryUtilization = () => {
  const freemem = os.freemem()

  const status = (os.totalmem() - freemem) < THRESHOLDS.memory ? 'warn' : 'pass'
  const { value, unit } = formatBytes(os.freemem())

  return {
    'memory:utilization': [{
      componentId: SERVICE_IDS.memory,
      node: 1,
      componentType: 'system',
      observedValue: value,
      observedUnit: unit,
      status,
      time: '2018-01-17T03:36:48Z',
      output: ''
    }]
  }
}

const database = async () => {
  let status = 'pass'
  const sequelize = dataSource.getInstance()

  try {
    await sequelize.authenticate()
  } catch (error) {
    status = 'error'
  } finally {
    sequelize.close()
  }

  return {
    'api:database': [{
      componentId: SERVICE_IDS.database,
      status,
      time: Date.now()
    }]
  }
}

const server = async () => {
  return {
    uptime: [{
      componentType: 'system',
      componentId: SERVICE_IDS.server,
      observedValue: os.uptime(),
      observedUnit: 's',
      status: 'pass',
      time: Date.now()
    }],
    ...await getCpuUtilization(),
    ...getMemoryUtilization()
  }
}
