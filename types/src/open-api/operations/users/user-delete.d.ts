export namespace userDelete {
    export namespace _delete {
        const tags: string[];
        const description: string;
        const operationId: string;
        const parameters: {
            name: string;
            in: string;
            schema: {
                $ref: string;
            };
            required: boolean;
            description: string;
        }[];
        const security: {
            bearerAuth: any[];
        }[];
        const responses: {
            200: {
                description: string;
            };
            400: {
                description: string;
            };
            403: {
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
    export { _delete as delete };
}
