import sinon from 'sinon'

export const mock = () => {
  const mocks = []
  const stubs = []

  return {
    /**
     *
     * @param {object} target
     * @returns {sinon.SinonMock}
     */
    createMock: (target) => {
      const newMock = sinon.mock(target)

      mocks.push(newMock)

      return newMock
    },
    createSpy: (target, method) => {
      return sinon.spy(target, method)
    },
    createStub: (target, method) => {
      // return sinon.stub(target, method)
      const newStub = sinon.stub(target, method)

      stubs.push(newStub)

      return newStub
    },
    restoreStub: (target, method) => {
      // target[method].restore()
      stubs.forEach((stub) => {
        stub.restore()
      })
    },
    createStubInstance: (Constructor, overrides) => {
      return sinon.createStubInstance(Constructor, overrides)
    },
    sinon,
    verifyMock: () => {
      mocks.forEach((mock) => {
        mock.verify()
      })
    }
  }
}
