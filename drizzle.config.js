import { defineConfig } from 'drizzle-kit'

/** @type {import('drizzle-kit').Config} */
export const drizzleConfig = defineConfig({
  dialect: 'postgresql',
  // driver: 'pg',
  schema: './src/**/*.schema.js',
  out: './drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  migration: {
    table: 'migrations',
    schema: 'public'
  }
})
