#!/bin/bash

# Reset
CO='\033[0m'       # Text Reset

# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White

# Bold
BBlack='\033[1;30m'       # Black
BRed='\033[1;31m'         # Red
BGreen='\033[1;32m'       # Green
BYellow='\033[1;33m'      # Yellow
BBlue='\033[1;34m'        # Blue
BPurple='\033[1;35m'      # Purple
BCyan='\033[1;36m'        # Cyan
BWhite='\033[1;37m'       # White

# Check if domain parameter is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <domain-path>"
  exit 1
fi

# Assign the domain path and extract the domain name
domain_path="$1"
domain_name=$(basename "$domain_path")

# Create the directory if it doesn't exist
mkdir -p "$domain_path"

# Array of file names to create
domain_files=("index.js" "${domain_name}.controller.js" "${domain_name}.model.js" "${domain_name}.routes.js" "${domain_name}.schema.js" "${domain_name}.validation.js")

# Create each file in the specified directory
for file in "${domain_files[@]}"; do
  touch "$domain_path/$file"
done

# Populate index with exports for each file
index_file="$domain_path/index.js"
{
  echo "export * from './${domain_name}.controller.js'"
  echo "export * from './${domain_name}.model.js'"
  echo "export * from './${domain_name}.routes.js'"
  echo "export * from './${domain_name}.schema.js'"
  echo "export * from './${domain_name}.validation.js'"
} > "$index_file"

# Populate controler with exports for each file
{
  echo "import { baseController } from '../../common/index.js'"
  echo "import * as model from './users.model.js'"
  echo ""
  echo "export const controller = baseController(model)"
} > "${domain_path}/${domain_name}.controller.js"

# Populate model with exports for each file
{
  echo "import { baseModel } from '../../common/index.js'"
  echo "import { users } from './users.schema.js'"
  echo ""
  echo "export const model = baseModel(users)"
} > "${domain_path}/${domain_name}.model.js"

# Populate routes with exports for each file
{
  echo "import { controller } from './users.controller.js'"
  echo "import { validations } from './users.validation.js'"
  echo ""
  echo "export const routes = async (app) => {"
  echo "  app.post("
  echo "    '/${domain_name}',"
  echo "    { schema: { ...validations.create, tags: ['${domain_name^}'] } },"
  echo "    controller.create"
  echo "  )"
  echo ""
  echo "  app.get("
  echo "    '/${domain_name}',"
  echo "    { schema: { ...validations.getAll, tags: ['${domain_name^}'] } },"
  echo "    controller.getAll"
  echo "  )"
  echo ""
  echo "  app.get("
  echo "    '/${domain_name}/:id',"
  echo "    { schema: { ...validations.getById, tags: ['${domain_name^}'] } },"
  echo "    controller.getById"
  echo "  )"
  echo ""
  echo "  app.delete("
  echo "    '/${domain_name}/:id',"
  echo "    { schema: { ...validations.delete, tags: ['${domain_name^}'] } },"
  echo "    controller.deleteById"
  echo "  )"
  echo ""
  echo "  app.patch("
  echo "    '/${domain_name}/:id',"
  echo "    { schema: { ...validations.patch, tags: ['${domain_name^}'] } },"
  echo "    controller.patch"
  echo "  )"
  echo "}"
} > "${domain_path}/${domain_name}.routes.js"

# Populate schema with exports for each file
{
  echo "import {"
  echo "  pgTable,"
  echo "  timestamp,"
  echo "  uuid"
  echo "} from 'drizzle-orm/pg-core'"
  echo ""
  echo "export const ${domain_name^} = pgTable('${domain_name}', {"
  echo "  id: uuid('id').primaryKey().defaultRandom().notNull(),"
  echo "  created_at: timestamp('created_at', { precision: 6, withTimezone: true })"
  echo "    .defaultNow()"
  echo "    .notNull(),"
  echo "  updated_at: timestamp('updatedAt', { precision: 6, withTimezone: true })"
  echo "    .defaultNow()"
  echo "    .notNull()"
  echo "})"
} > "${domain_path}/${domain_name}.schema.js"

# Populate validation with exports for each file
{
  echo "import {"
  echo "  REQUEST_SEGMENTS,"
  echo "  createDeleteByIdSchema,"
  echo "  createGetAllResponseSchema,"
  echo "  createByIdResponseSchema,"
  echo "  createResponseSchema"
  echo "} from '../../common/index.js'"
  echo "import {"
  echo "  CreateUserSchema,"
  echo "  IdUserSchema,"
  echo "  UpdateUserSchema"
  echo "} from './index.js'"
  echo ""
  echo "export const validations = {"
  echo "  // POST /users"
  echo "  create: {"
  echo "    [REQUEST_SEGMENTS.BODY]: CreateUserSchema,"
  echo "    [REQUEST_SEGMENTS.RESPONSE]: createResponseSchema({ \$ref: '${domain_name^}' })"
  echo "  },"
  echo "  // DELETE /users/:id"
  echo "  delete: {"
  echo "    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,"
  echo "    [REQUEST_SEGMENTS.RESPONSE]: createDeleteByIdSchema()"
  echo "  },"
  echo "  // GET /users"
  echo "  getAll: {"
  echo "    [REQUEST_SEGMENTS.RESPONSE]: createGetAllResponseSchema({ \$ref: '${domain_name^}' })"
  echo "  },"
  echo "  // GET /users/:id"
  echo "  getById: {"
  echo "    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,"
  echo "    [REQUEST_SEGMENTS.RESPONSE]: createByIdResponseSchema({ \$ref: '${domain_name^}' })"
  echo "  },"
  echo "  // PATCH /users/:id"
  echo "  patch: {"
  echo "    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,"
  echo "    [REQUEST_SEGMENTS.BODY]: UpdateUserSchema,"
  echo "    [REQUEST_SEGMENTS.RESPONSE]: createByIdResponseSchema({ \$ref: '${domain_name^}' })"
  echo "  }"
  echo "}"
} > "${domain_path}/${domain_name}.validation.js"

# echo "Files created in $domain_path:"
# for file in "${domain_files[@]}"; do
#   echo "$file"
# done

# echo ""

# echo -e "\033[33mindex.js\033[m file populated with exports."
echo -e "${Yellow}index.js${CO}\t\t populated with exports."
echo -e "${Yellow}${domain_name}.controller.js${CO}\t populated with default crud controller."
echo -e "${Yellow}${domain_name}.model.js${CO}\t\t populated with default crud model."
echo -e "${Yellow}${domain_name}.routes.js${CO}\t\t populated with default crud routes."
echo -e "${Yellow}${domain_name}.schema.js${CO}\t\t populated with domain schema."
echo -e "${Yellow}${domain_name}.validations.js${CO}\t populated with default crud validations."
