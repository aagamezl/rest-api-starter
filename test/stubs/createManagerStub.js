export const createManagerStub = () => {
  return {
    create (payload) {},
    delete (query) {},
    async findAll (query) { },
    async findAndCountAll (query) {},
    findOne (query) {},
    findUnique (query) {},
    update (id, payload) {}
  }
}
