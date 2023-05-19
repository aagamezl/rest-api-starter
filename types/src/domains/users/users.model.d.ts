export const model: import("../../utils/index.js").Model<{
    create: (payload: {
        [x: string]: unknown;
    }) => Promise<{
        [x: string]: unknown;
    }>;
    getAll: (requestData: import('../../utils/index.js').RequestData) => Promise<import('../../data-source.js').FindAndCountAll>;
    getById: (requestData: import('../../utils/index.js').RequestData) => Promise<{
        [x: string]: unknown;
    }>;
    login: ({ email, password }: LoginPayload) => Promise<UserData>;
    logout: (authorization: any) => Promise<{
        [x: string]: unknown;
    }>;
    update: (id: string, payload: {
        [x: string]: unknown;
    }) => Promise<{
        [x: string]: unknown;
    }>;
}>;
export type UserModelMethods = {
    /**
     * - The login
     */
    login: (payload: LoginPayload) => Promise<UserData>;
    /**
     * -  logout function.
     */
    logout: (authorization: string) => Promise<{
        [x: string]: unknown;
    }>;
};
/**
 * Represents a user model.
 */
export type UserModel = import('../../utils/index.js').Model<UserModelMethods>;
export type LoginPayload = {
    /**
     * - The user's email.
     */
    email: string;
    /**
     * - The user's password.
     */
    password: string;
};
export type UserData = {
    /**
     * - The user's authentication token.
     */
    token: string;
    /**
     * - The user's username.
     */
    username: string;
    /**
     * - The user's email.
     */
    email: string;
};
