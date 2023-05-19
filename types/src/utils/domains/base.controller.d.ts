export const CONTENT_TYPE: "application/vnd.api+json; charset=utf-8";
export function baseController<T, M>(model: import("./base.model.js").Model<T>, methods?: M): BaseController<M>;
/**
 * <M>
 */
export type BaseController<M> = M & {
    create: (req: import('express').Request, res: import('express').Response) => Promise<void>;
    delete: (req: import('express').Request, res: import('express').Response) => Promise<void>;
    getAll: (req: import('express').Request, res: import('express').Response) => Promise<void>;
    getById: (req: import('express').Request, res: import('express').Response) => Promise<void>;
    update: (req: import('express').Request, res: import('express').Response) => Promise<void>;
};
