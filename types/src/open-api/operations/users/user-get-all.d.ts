export namespace userGetAll {
    namespace get {
        export const tags: string[];
        export const description: string;
        export const operationId: string;
        export { getAll as parameters };
        export const security: {
            bearerAuth: any[];
        }[];
        export const responses: {
            200: {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            type: string;
                            properties: {
                                items: Record<string, unknown>;
                                count: {
                                    type: string;
                                    format: string;
                                };
                            };
                            required: string[];
                            additionalProperties: boolean;
                        };
                    };
                };
            };
            400: {
                description: string;
            };
            403: {
                description: string;
            };
            500: {
                description: string;
            };
        };
    }
}
import { getAll } from "../queryParameter.js";
