export function baseModel<T>(modelName: string, methods?: T): Model<T>;
/**
 * <T>
 */
export type Model<T> = T & {
    create: (payload: {
        [x: string]: unknown;
    }) => Promise<{
        [x: string]: unknown;
    }>;
    delete: (query: import('../../data-source.js').Query) => Promise<{
        [x: string]: unknown;
    }>;
    getAll: (requestData: import('../query/requestParser.js').RequestData) => Promise<{
        [x: string]: unknown;
    }>;
    getById: (requestData: import('../query/requestParser.js').RequestData) => Promise<{
        [x: string]: unknown;
    }>;
    update: (id: string, payload: {
        [x: string]: unknown;
    }) => Promise<{
        [x: string]: unknown;
    }>;
};
