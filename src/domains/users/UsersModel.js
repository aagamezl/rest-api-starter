import BaseModel from '../../utils/domains/BaseModel.js'

export default class UserModel extends BaseModel {
  constructor (model, options = {}) {
    super(model, { ...options, ...{ excludedFields: ['password'] } })
  }
}
