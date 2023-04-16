import { randomUUID } from 'node:crypto'
import os from 'node:os'

import { dataSource } from '../../data-source.js'

import { config } from '../../../config/index.js'
import { formatBytes } from '../../utils/formatBytes.js'
import { getCpuLoad } from '../../utils/getCpuLoad.js'
import { COMPONENT_TYPES } from './componentTypes.js'

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

const check = async () => {
  return {
    ...base(),
    checks: {
      ...await server(),
      ...await database()
    },
    links: {
      about: `${config.server.hostname}`
    }
  }
}

const database = async () => {
  let status = 'pass'
  const dbInstance = dataSource.getInstance()
  let connectionTime = Date.now()

  try {
    await dbInstance.$connect()

    connectionTime = Date.now() - connectionTime
  } catch (error) {
    status = 'error'
  } finally {
    dbInstance.$disconnect()
  }

  return {
    'postgres:database': [{
      componentId: SERVICE_IDS.database,
      componentType: COMPONENT_TYPES.datastore,
      observedValue: connectionTime,
      observedUnit: 'ms',
      status,
      time: new Date()
    }]
  }
}

// TODO: Get the CPU utilization of each core
const getCpuUtilization = async () => {
  const cpuAverage = await getCpuLoad(1000, 100)

  return {
    'cpu:utilization': [{
      componentId: SERVICE_IDS.cpu,
      componentType: COMPONENT_TYPES.system,
      node: 1,
      observedValue: cpuAverage,
      observedUnit: 'percent',
      status: 'warn',
      time: new Date()
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
      componentType: COMPONENT_TYPES.system,
      node: 1,
      observedValue: value,
      observedUnit: unit,
      status,
      time: new Date()
    }]
  }
}

const server = async () => {
  return {
    uptime: [{
      componentId: SERVICE_IDS.server,
      componentType: COMPONENT_TYPES.system,
      observedValue: os.uptime(),
      observedUnit: 's',
      status: 'pass',
      time: new Date()
    }],
    ...await getCpuUtilization(),
    ...getMemoryUtilization()
  }
}

export const model = {
  check
}
