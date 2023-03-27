#!/usr/bin/env node

/*
* Generate JOI validations according to Prisma Schema
*/

// import { copyFileSync, writeFileSync } from 'node:fs'
// import { join, dirname } from 'node:path'

// import { Prisma } from '@prisma/client'
// import { plural } from '@devnetic/utils'

// import { config } from '../../config/index.js'
// import { createValidations } from '../../src/utils/generators/prisma.js'

// const validations = createValidations(Prisma.dmmf.datamodel, config.schema)

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
