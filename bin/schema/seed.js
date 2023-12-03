import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

import { config } from '../../config/index.js'
import { generateSeed } from '../../src/utils/generators/prisma.js'

const filename = join(
  process.cwd(),
  config.database.generator.seed.path,
  config.database.generator.seed.filename
)

const code = generateSeed()

writeFileSync(filename, code)
