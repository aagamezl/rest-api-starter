#!/usr/bin/env node

import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

import { Prisma } from '@prisma/client'
import { plural } from '@devnetic/utils'

import { config } from '../../config/index.js'
import { generateValidations } from '../../src/utils/generators/prisma.js'

const DOMAIN_PATH = 'src/domains'

const validations = generateValidations(Prisma.dmmf.datamodel, config.schema)

for (const { data, name } of validations) {
  const modelName = name.toLowerCase()
  const domain = plural(modelName)
  const fileName = join(process.cwd(), DOMAIN_PATH, domain, `${domain}.schema2.js`)

  try {
    console.info(`Backing up current ${name} schema`)

    // copyFileSync(fileName, join(dirname(fileName), `${domain}.schema-backup.js`))
  } catch (error) {
    console.error(error.message)
  }

  try {
    console.info(`Creating ${name} schema\n`)

    writeFileSync(fileName, data.join('\n'))
  } catch (error) {
    console.error(error.message)
  }
}
