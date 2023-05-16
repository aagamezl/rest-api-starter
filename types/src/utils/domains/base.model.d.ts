export function baseModel(modelName: string, methods?: {
    [x: string]: Function;
}): Model;
/**
 * Base Model
 */
export type Model = {
    create: (payload: {
        [x: string]: unknown;
    }) => Promise<{
        [x: string]: unknown;
    }>;
    deleteById: (id: string) => Promise<{
        [x: string]: unknown;
    }>;
    getAll: (requestData: import('../query/requestParser.js').RequestData) => Promise<GetAllResponse>;
    getById: (id: string, requestData: import('../query/requestParser.js').RequestData) => Promise<{
        [x: string]: unknown;
    }>;
    update: (id: string, payload: UpdatePayload<TEntity>) => Promise<{
        [x: string]: unknown;
    }>;
};
