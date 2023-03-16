import { config } from './../../../config/index.js'

export const getPagination = (page) => {
  const { number, size } = page

  return {
    offset: Number(number ?? 0),
    limit: Number(size ?? config.database.pagination.limit)
  }
}