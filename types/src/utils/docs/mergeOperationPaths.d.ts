export function mergeOperationPaths(operations: Operation[]): Operation;
/**
 * The complete OpenAPI Operation.
 */
export type Operation = {
    /**
     * - Indicates the Operation path for an entity.
     */
    paths: {
        [x: string]: object;
    };
};
