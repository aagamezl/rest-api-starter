export function excludeFields(entity: {
    [x: string]: unknown;
}, keys: string[]): {
    [x: string]: boolean;
};
