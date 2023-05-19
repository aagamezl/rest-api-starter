export function parseDatabaseUrl(url?: string): DatabaseUrl;
/**
 * The complete OpenAPI Operation.
 */
export type DatabaseUrl = {
    /**
     * - Indicates the database provider [postgres|mysql|oracle].
     */
    provider?: string;
    /**
     * - Indicates the database user.
     */
    username?: string;
    /**
     * - Indicates the database password.
     */
    password?: string;
    /**
     * - Indicates the database host.
     */
    host?: string;
    /**
     * - Indicates the database port.
     */
    port?: number;
    /**
     * - Indicates the database name.
     */
    name?: string;
    /**
     * - Indicates the database schema.
     */
    schema?: string;
};
