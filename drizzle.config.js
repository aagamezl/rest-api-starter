/** @type {import('drizzle-kit').Config} */
export default {
  schema: './src/**/*.schema.js',
  out: './drizzle/migrations',
  driver: 'pg'
}
