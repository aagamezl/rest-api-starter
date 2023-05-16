export const postId: joi.ObjectSchema<any>;
export const post: joi.ObjectSchema<any>;
export const postSchema: import("joi-to-swagger").SwaggerSchema;
export const postInput: import("joi-to-swagger").SwaggerSchema;
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
