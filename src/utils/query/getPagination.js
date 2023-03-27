import { config } from './../../../config/index.js'

export const getPagination = (page) => {
  const { number, size } = page

  return {
    number: Number(number ?? 0),
    size: Number(size ?? config.database.pagination.limit)
  }
}
