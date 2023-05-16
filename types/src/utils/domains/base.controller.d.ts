export const CONTENT_TYPE: "application/vnd.api+json; charset=utf-8";
export function baseController(model: import('./base.model.js').Model, methods?: {
    [x: string]: Function;
}): BaseController;
/**
 * BaseController
 */
export type BaseController = {
    create: (req: Request, res: Response) => void;
    deleteById: (req: Request, res: Response) => void;
    getAll: (req: Request, res: Response) => void;
    getById: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
};
