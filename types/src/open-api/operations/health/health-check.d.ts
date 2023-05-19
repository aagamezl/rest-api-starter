export namespace healthCheck {
    namespace get {
        const tags: string[];
        const description: string;
        const operationId: string;
        const security: {
            bearerAuth: any[];
        }[];
        const responses: {
            500: {
                description: import("http-status-codes").ReasonPhrases;
            };
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
