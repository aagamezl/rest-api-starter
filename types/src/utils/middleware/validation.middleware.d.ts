export function validate(schema: ValidationSchema): import('express').RequestHandler;
/**
 * Represent the Request Data for an JSON API URL
 */
export type ValidationSchema = {
    [validation: string]: import("joi").ObjectSchema<any>;
};
/**
 * Represents an extended request object.
 */
export type RequestExtended = import('express').Request & {
    files: {
        [x: string]: string;
    };
};
