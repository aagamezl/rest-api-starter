/**
 * The complete OpenAPI Operation.
 *
 * @typedef DatabaseUrl
 * @property {string} provider - Indicates the database provider [postgres|mysql|oracle].
 * @type {object}
 * @property {string} [provider] - Indicates the database provider.
 * @property {string} [username] - Indicates the database user.
 * @property {string} [password] - Indicates the database password.
 * @property {string} [host]     - Indicates the database host.
 * @property {number} [port]     - Indicates the database port.
 * @property {string} [name]     - Indicates the database name.
 * @property {string} [schema]   - Indicates the database schema.
 */

/**
 * Parse a database connection string URL and return the individual parts
 *
 * @param {string} url
 * @returns {DatabaseUrl}
 */
export const parseDatabaseUrl = (url = '') => {
  const match = url.match(/^(\w+):\/\/(.+):(.+)@(.+):(\d+)\/(.+)\?schema=(.+)$/)

  return match
    ? {
        provider: match[1],
        username: match[2],
        password: match[3],
        host: match[4],
        port: Number(match[5]),
        name: match[6],
        schema: match[7]
      }
    : {}
}
