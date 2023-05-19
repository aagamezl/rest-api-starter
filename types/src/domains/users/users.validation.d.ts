export namespace validations {
    export const create: {
        [x: string]: import("joi").ObjectSchema<any>;
    };
    const _delete: {
        [x: string]: import("joi").ObjectSchema<any>;
    };
    export { _delete as delete };
    export const getById: {
        [x: string]: import("joi").ObjectSchema<any>;
    };
    export const login: {
        [x: string]: import("joi").ObjectSchema<any>;
    };
    export const update: {
        [x: string]: import("joi").ObjectSchema<any>;
    };
}
