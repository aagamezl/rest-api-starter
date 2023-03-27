// import { readFile, writeFile } from 'node:fs/promises'
// import { copyFileSync, writeFileSync } from 'node:fs'
// import { join, dirname } from 'node:path'

import { Prisma } from '@prisma/client'
// import { plural } from '@devnetic/utils'

export const seed = () => {
  const code = [
    'import { PrismaClient } from \'@prisma/client\'\n',
    'const prisma = new PrismaClient()\n',
    'const main = async () => {',
    '}\n',
    'main()',
    '  .then(async () => {',
    '    await prisma.$disconnect()',
    '  })',
    '  .catch(async (error) => {',
    '    console.error(error)',
    '    await prisma.$disconnect()',
    '    process.exit(1)',
    '  })'
  ]

  return code.join('\n')
}

export const createValidations = (schema = Prisma.dmmf.datamodel, schemaFields = []) => {
  const validations = generateSchema(schema, schemaFields)

  return Object.entries(validations).reduce((result, [name, validation]) => {
    const modelName = name.toLowerCase()

    const data = [
      'import joi from \'joi\'',
      'import joiToSwagger from \'joi-to-swagger\'\n',
      'import { getBaseResponse } from \'../../utils/docs/getBaseResponse.js\'\n',
      `export const ${modelName}Id = ${validation.id}\n`,
      `export const ${modelName} = ${validation.input}\n`,
      `export const ${modelName}Schema = joiToSwagger(${modelName}Id.concat(${modelName})).swagger`,
      `export const ${modelName}Input = joiToSwagger(${modelName}).swagger`,
      `export const responseAll = getBaseResponse(${modelName}Schema)`,
      '' // for StandardJS
    ]

    result.push({
      data,
      name
    })

    return result
  }, [])

  // for (const [name, validation] of Object.entries(validations)) {
  //   const modelName = name.toLowerCase()
  //   const domain = plural(modelName)
  //   const fileName = join(process.cwd(), 'src/domains', domain, `${domain}.schema.js`)

  //   const data = [
  //     'import joi from \'joi\'',
  //     'import joiToSwagger from \'joi-to-swagger\'\n',
  //     // 'import { getBaseResponse } from \'../../utils/docs/getBaseResponse.js\'\n',
  //     `export const ${modelName}Id = ${validation.id}\n`,
  //     `export const ${modelName}Input = ${validation.input}\n`,
  //     `const ${modelName}Schema = joiToSwagger(${modelName}Id.concat(${modelName}Input)).swagger\n`,
  //     'export const schema = {',
  //     `  ${modelName}: ${modelName}Schema,`,
  //     `  input: joiToSwagger(${modelName}Input).swagger,`,
  //     // `  responseAll: getBaseResponse(${name}Schema)`,
  //     '}',
  //     '' // for StandardJS
  //   ]

  //   try {
  //     console.info(`Backing up current ${name} schema`)

  //     copyFileSync(fileName, join(dirname(fileName), `${domain}.schema-backup.js`))
  //   } catch (error) {
  //     console.error(error.message)
  //   }

  //   try {
  //     console.info(`Creating ${name} schema`)

  //     // mkdirSync(dirname(fileName), { recursive: true })
  //     writeFileSync(fileName, data.join('\n'))
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }
}

/**
 *
 * @param {string} model
 * @returns {object}
 */
export const generateSchema = (schema, schemaFields = []) => {
  console.log(schemaFields)

  const models = schema.models.reduce((validation, model) => {
    const schema = parseModel(model)

    // const modelSchema = schema.input.map(field => field.code)
    // const input = modelSchema
    //   .filter(item => !schemaFields[model.name.toLowerCase()].includes(item.field))
    const modelSchema = schema.input.reduce((result, item) => {
      (result.schema ??= []).push(item.code)

      if (!(schemaFields[model.name.toLowerCase()] ?? []).includes(item.field)) {
        (result.input ??= []).push(item.code)
      }

      return result
    }, {})

    validation[model.name] = {
      id: schema.id,
      // input: `joi.object({\n  ${schema.input.map(field => field.code).join(',\n  ')}\n}).unknown(false)`
      ...modelSchema
    }

    return validation
  }, {})

  const enums = schema.enums.reduce((result, { name, values }) => {
    result[name] = values.map(({ name }) => name)

    return result
  }, {})

  return parseRelatedTypes(models, enums)
}

const getType = (field) => {
  const validator = {
    array: { type: 'array' },
    boolean: { type: 'boolean' },
    bigint: { type: 'number', subtype: 'integer' },
    datetime: { type: 'date' },
    enum: { type: 'enum', subtype: field.type },
    float: { type: 'number', subtype: 'float' },
    int: { type: 'number', subtype: 'integer' },
    object: { type: 'array' },
    string: { type: 'string' }
  }

  return validator[field.type.toLowerCase()] ?? validator[field.kind.toLowerCase()]
}

const parseDefault = (value, type) => {
  const defaultTypes = {
    string: parseString(value),
    date: parseDate(value)
  }

  if (!Array.isArray(value)) {
    return defaultTypes[type] ?? value
  }

  return `[${value.reduce((result, item) => {
    if (type === 'string') {
      item = parseString(item)
    }

    result.push(item)
    return result
  }, []).join(', ')}]`
}

const parseDate = (value) => 'new Date()'

const parseEnum = (field) => {
  const { subtype } = getType(field)

  const code = [`joi.string().valid([Enum:${subtype}])`]

  if (field.hasDefaultValue) {
    code.push(`default(${parseDefault(field.default, 'string')})`)
  }

  if (field.isRequired === true) {
    code.push('required()')
  }

  return code.join('.')
}

const parseField = (field) => {
  switch (field.kind) {
    case 'enum':
      return parseEnum(field)

    case 'object':
      return parseObject(field)

    case 'scalar':
      return parseScalar(field)
  }
}

const parseId = (field) => {
  // const { type } = getType(field)
  // const code = [`joi.${type}()`]
  const code = parseIdCode(field)

  // if (type === 'string') {
  //   code.push('guid({ version: \'uuidv4\' })')
  // }

  // return `joi.object({\n  id: ${code.join('.')}\n})`
  return `joi.object({\n  id: ${code}\n})`
}

const parseIdCode = (field) => {
  const { type } = getType(field)
  const code = [`joi.${type}()`]

  if (type === 'string') {
    code.push('guid({ version: \'uuidv4\' })')
  }

  code.push('required()')

  return code.join('.')
}

const parseModel = (model) => {
  return model.fields
    .filter(field => shouldParseField(field))
    .reduce((result, field) => {
      const schema = parseField(field)

      if (field.isId) {
        result.id = schema

        result.input.push({
          field: field.name,
          code: `${field.name}: ${parseIdCode(field)}`
        })
        return result
      }

      // Single relations are ignored because a Scalar ID is always provided
      if (field.relationFromFields?.length > 0) {
        return result
      }

      // result.input.push(`${field.name}: ${schema}`)
      result.input.push({
        field: field.name,
        code: `${field.name}: ${schema}`
      })

      return result
    }, { input: [] })
}

const parseObject = (field) => {
  if (field.isList) {
    return `joi.array().items([Object:${field.type}])`
  }

  return `joi.object([Object:${field.type}])`
}

const parseRelatedTypes = (models, enums) => {
  const enumRegex = /\[Enum:(\w+)\]/gm
  const objectRegex = /\[Object:(\w+)\]/gm

  return Object.entries(models).reduce((result, [model, { id, input, schema }]) => {
    // Array.from(input.matchAll(enumRegex)).forEach(([, name]) => {
    Array.from(input.join('\n').matchAll(enumRegex)).forEach(([, name]) => {
      input = input.replaceAll(`[Enum:${name}]`, enums[name].map(parseString).join(', '))
    })

    // Array.from(input.matchAll(objectRegex)).forEach(([, name]) => {
    Array.from(input.join('\n').matchAll(objectRegex)).forEach(([, name]) => {
      input = input.replaceAll(`[Object:${name}]`, models[name].input.replaceAll(/ {2}(\w+)/gm, '    $1').replace('})', '  })'))
    })

    result[model] = {
      id,
      input
    }

    return result
  }, {})
}

const parseScalar = (field) => {
  if (field.isId) {
    return parseId(field)
  }

  const { type } = getType(field)

  const scalar = [`joi.${type}()`]

  if (field.hasDefaultValue) {
    scalar.push(`default(${parseDefault(field.default, type)})`)

    if (field.isList) {
      const code = [`joi.${type}()`]

      scalar[0] = `joi.array().items(${code.join('.')})`
    }
  }

  if (field.isRequired === true) {
    scalar.push('required()')
  } else {
    scalar.push('optional()')
  }

  return scalar.join('.')
}

const parseString = (value) => `'${value}'`

/**
 * Check if the field should be parsed acording to the optional skipped fields
 * and the always skipped isUpdatedAt field.
 *
 * @param {object} field
 * @param {string} [skippedFields=['created']]
 * @return {boolean}
 */
const shouldParseField = (field, skippedFields = [/* 'created' */]) => {
  // if (field.isUpdatedAt) {
  //   return false
  // }

  return !skippedFields.find(value => field.name.includes(value))
}
