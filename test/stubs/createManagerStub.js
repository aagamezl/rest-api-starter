export const createManagerStub = () => {
  return {
    create: (payload) => {},
    deleteById: (id) => {},
    findAll: async (query) => { },
    findAndCountAll: async (query) => {},
    findOne: (query) => {},
    findUnique: (query) => {},
    update: (id, payload) => {}
  }
}
