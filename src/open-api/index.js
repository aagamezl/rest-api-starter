import { healthOperations } from './operations/health/index.js'
import { mergeOperationPaths } from '../utils/docs/mergeOperationPaths.js'
import { userOperations } from './operations/user/index.js'

import { info } from './info.js'
import { servers } from './servers.js'
import { components } from './components.js'
import { tags } from './tags.js'

export const openAPI = {
  ...info,
  ...servers,
  ...components,
  ...tags,
  ...mergeOperationPaths([ // merge operations paths
    userOperations,
    healthOperations
  ])
}
