export function getBaseResponse(schema: Record<string, unknown>): {
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
