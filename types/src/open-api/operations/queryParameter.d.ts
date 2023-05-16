export const getAll: ({
    in: string;
    name: string;
    schema: {
        type: string;
        properties?: undefined;
    };
    description: string;
    explode?: undefined;
    style?: undefined;
    allowReserved?: undefined;
} | {
    in: string;
    name: string;
    description: string;
    explode: boolean;
    style: string;
    allowReserved: boolean;
    schema: {
        type: string;
        properties: {
            limit: {
                type: string;
                description: string;
                minimum: number;
                maximum: number;
                default: number;
            };
            offset: {
                type: string;
                description: string;
                minimum: number;
                default: number;
            };
        };
    };
})[];
