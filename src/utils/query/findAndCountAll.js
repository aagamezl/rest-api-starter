import { PrismaClient } from '@prisma/client'
// import { dataSource } from '../../data-source.js'

export const findAndCountAll = async (entity, query) => {
  const prisma = new PrismaClient()
  return await prisma.$transaction([
    entity.count(),
    entity.findMany()
  ])
}
