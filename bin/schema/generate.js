#!/usr/bin/env node

import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { /* copyFileSync,  */writeFileSync } from 'node:fs'

import { Prisma } from '@prisma/client'
import { plural } from '@devnetic/utils'

import { config } from '../../config/index.js'
import { generateSeed, generateValidations } from '../../src/utils/generators/prisma.js'

const APP_NAME = 'Kiirus-API-Gen'

const options = {
  seed: { type: 'boolean', short: 'S' },
  validations: { type: 'boolean', short: 'V' }
}

const { values } = parseArgs({ options, strict: false })
// const values = { validations: true, seed: true }

console.log(values)

for (const type of Object.keys(values)) {
  switch (type) {
    case 'seed': {
      const code = generateSeed()
      const filename = join(
        process.cwd(),
        config.database.generator.seed.path,
        config.database.generator.seed.filename
      )

      writeFileSync(filename, code)

      break
    }

    case 'validations': {
      const validations = generateValidations(Prisma.dmmf.datamodel, config.schema)

      for (const { data, name } of validations) {
        const modelName = name.toLowerCase()
        const domain = plural(modelName)
        const fileName = join(process.cwd(), 'src/domains', domain, `${domain}.schema2.js`)

        try {
          console.info(`Backing up current ${name} schema`)

          // copyFileSync(fileName, join(dirname(fileName), `${domain}.schema-backup.js`))
        } catch (error) {
          console.error(error.message)
        }

        try {
          console.info(`Creating ${name} schema`)

          writeFileSync(fileName, data.join('\n'))
        } catch (error) {
          console.error(error.message)
        }
      }

      break
    }

    default:
      console.error(`WARNING ${APP_NAME}: '${type}' isn't a ${APP_NAME} command. See '${APP_NAME} help'.`)

      break
  }
}

/*
* Generate JOI validations according to Prisma Schema
*/

// import { copyFileSync, writeFileSync } from 'node:fs'
// import { join, dirname } from 'node:path'

// import { Prisma } from '@prisma/client'
// import { plural } from '@devnetic/utils'

// import { config } from '../../config/index.js'
// import { generateValidations } from '../../src/utils/generators/prisma.js'

// const validations = generateValidations(Prisma.dmmf.datamodel, config.schema)

// console.log(validations)

// for (const { data, name } of validations) {
//   const modelName = name.toLowerCase()
//   const domain = plural(modelName)
//   const fileName = join(process.cwd(), 'src/domains', domain, `${domain}.schema.js`)

//   try {
//     console.info(`Backing up current ${name} schema`)

//     copyFileSync(fileName, join(dirname(fileName), `${domain}.schema-backup.js`))
//   } catch (error) {
//     console.error(error.message)
//   }

//   try {
//     console.info(`Creating ${name} schema`)

//     writeFileSync(fileName, data.join('\n'))
//   } catch (error) {
//     console.error(error.message)
//   }
// }
