export const userId: joi.ObjectSchema<any>;
export const user: joi.ObjectSchema<any>;
export const userSchema: import("joi-to-swagger").SwaggerSchema;
export const userInput: import("joi-to-swagger").SwaggerSchema;
export const responseAll: {
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
import joi from "joi";
