export const HEALTH_CONTENT_TYPE: "application/health+json; charset=utf-8";
export function health(req: Request, res: Response): Promise<void>;
