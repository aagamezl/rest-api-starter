export function notFound(entity: any): {
    404: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                    example: {
                        message: string;
                        internal_code: string;
                    };
                };
            };
        };
    };
};
