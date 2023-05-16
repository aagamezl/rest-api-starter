export namespace userLogin {
    namespace post {
        const tags: string[];
        const description: string;
        const operationId: string;
        const parameters: any[];
        namespace requestBody {
            const content: {
                'application/json': {
                    schema: {
                        $ref: string;
                    };
                };
            };
        }
        const responses: {
            201: {
                description: string;
            };
            400: {
                description: string;
            };
            404: {
                description: string;
            };
            500: {
                description: string;
            };
        };
    }
}
