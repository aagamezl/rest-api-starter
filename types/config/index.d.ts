export namespace config {
    export namespace authentication {
        const secret: string;
        const expiresIn: number;
    }
    export namespace server {
        const hostname: string;
        const port: string | number;
        const environment: string;
        const version: string;
    }
    export namespace health {
        const avgTime: number;
        const delay: number;
    }
    export namespace database {
        export { username };
        export { password };
        export { name };
        export { schema };
        export { port };
        export { host };
        export { provider };
        export namespace pagination {
            const limit: number;
        }
    }
    export namespace schema_1 {
        const user: string[];
        const post: string[];
    }
    export { schema_1 as schema };
}
declare const username: string;
declare const password: string;
declare const name: string;
declare const schema: string;
declare const port_1: number;
declare const host: string;
declare const provider: string;
export {};
