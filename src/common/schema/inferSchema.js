import {
  getTableColumns,
  is
} from 'drizzle-orm'
import { MySqlChar, MySqlVarBinary, MySqlVarChar } from 'drizzle-orm/mysql-core'
import { PgChar, PgUUID, PgVarchar } from 'drizzle-orm/pg-core'
import { SQLiteText } from 'drizzle-orm/sqlite-core'

const jsonSchemaTypes = [
  'string',
  'number',
  'integer',
  'boolean',
  'array',
  'object',
  'null'
]

const mapColumnToJsonSchema = (column) => {
  let schema

  if (column.enumValues && column.enumValues.length) {
    schema = { type: 'string', enum: column.enumValues }
  } else if (is(column, PgUUID)) {
    schema = { type: 'string', format: 'uuid' }
  } else if (column.dataType === 'custom') {
    schema = {}
  } else if (column.dataType === 'json') {
    schema = { type: ['string', 'number', 'boolean', 'object', 'array', 'null'] }
  } else if (column.dataType === 'array') {
    schema = { type: 'array', items: mapColumnToJsonSchema(column.baseColumn) }
  } else if (column.dataType === 'number') {
    schema = { type: 'number' }
  } else if (column.dataType === 'bigint') {
    schema = { type: 'integer', format: 'int64' }
  } else if (column.dataType === 'boolean') {
    schema = { type: 'boolean' }
  } else if (column.dataType === 'date') {
    schema = { type: 'string', format: 'date-time' }
  } else if (column.dataType === 'string') {
    schema = { type: 'string' }
    if (
      (is(column, PgChar) || is(column, PgVarchar) || is(column, MySqlVarChar) ||
        is(column, MySqlVarBinary) || is(column, MySqlChar) || is(column, SQLiteText)) &&
      typeof column.length === 'number'
    ) {
      schema.maxLength = column.length
    }
  } else {
    schema = {}
  }

  if (!column.notNull) {
    schema = { anyOf: [schema, { type: 'null' }] }
  } else if (column.hasDefault && jsonSchemaTypes.includes(column.default)) {
    schema = { ...schema, default: column.default }
  }

  return schema
}

export const createInsertSchema = (table, refine) => {
  const columns = getTableColumns(table)
  const schema = {
    type: 'object',
    properties: {},
    required: []
  }

  for (const [name, column] of Object.entries(columns)) {
    schema.properties[name] = mapColumnToJsonSchema(column)

    if (column.notNull && !column.hasDefault) {
      schema.required.push(name)
    }
  }

  if (refine) {
    for (const [name, refineColumn] of Object.entries(refine)) {
      if (typeof refineColumn === 'function') {
        schema.properties[name] = refineColumn(schema.properties)
      } else {
        schema.properties[name] = refineColumn
      }
    }
  }

  return schema
}

export const createSelectSchema = (table, refine) => {
  const columns = getTableColumns(table)
  const schema = {
    type: 'object',
    properties: {},
    required: []
  }

  for (const [name, column] of Object.entries(columns)) {
    schema.properties[name] = mapColumnToJsonSchema(column)

    if (!column.notNull) {
      schema.properties[name] = { anyOf: [schema.properties[name], { type: 'null' }] }
    }

    schema.required.push(name)
  }

  if (refine) {
    for (const [name, refineColumn] of Object.entries(refine)) {
      if (typeof refineColumn === 'function') {
        schema.properties[name] = refineColumn(schema.properties)
      } else {
        schema.properties[name] = { ...schema.properties[name], ...refineColumn }
      }
    }
  }

  return schema
}
