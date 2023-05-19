export function excludeFields(entity: {
    [x: string]: unknown;
}, keys: string[]): import("./queryBuilder").Select;
