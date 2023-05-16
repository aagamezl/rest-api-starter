export namespace healthCheck {
    namespace get {
        const tags: string[];
        const description: string;
        const operationId: string;
        const security: {
            bearerAuth: any[];
        }[];
        const responses: {
            [x: number]: any;
            200: {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
        };
    }
}
