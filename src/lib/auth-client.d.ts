export declare const authClient: import("better-auth/react").ReactAuthClient<{
    baseURL: any;
}>;
export declare const signUp: {
    email: <FetchOptions extends import("better-auth").ClientFetchOption<Partial<{
        name: string;
        email: string;
        password: string;
        image?: string | undefined;
        callbackURL?: string | undefined;
        rememberMe?: boolean | undefined;
    }> & Record<string, any>, Partial<Record<string, any>> & Record<string, any>, Record<string, any> | undefined>>(data_0: import("better-auth").Prettify<{
        email: string;
        name: string;
        password: string;
        image?: string | undefined;
        callbackURL?: string | undefined;
        fetchOptions?: FetchOptions | undefined;
    }>, data_1?: FetchOptions | undefined) => Promise<import("@better-fetch/fetch").BetterFetchResponse<(Omit<{
        token: null;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    }, "user"> & {
        user: import("better-auth").StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        }>;
    }) | (Omit<{
        token: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    }, "user"> & {
        user: import("better-auth").StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        }>;
    }), {
        code?: string | undefined;
        message?: string | undefined;
    }, FetchOptions["throw"] extends true ? true : false>>;
}, signIn: {
    social: <FetchOptions extends import("better-auth").ClientFetchOption<Partial<{
        provider: (string & {}) | "linear" | "huggingface" | "github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paybin" | "paypal" | "polar" | "railway" | "vercel" | "wechat";
        callbackURL?: string | undefined;
        newUserCallbackURL?: string | undefined;
        errorCallbackURL?: string | undefined;
        disableRedirect?: boolean | undefined;
        idToken?: {
            token: string;
            nonce?: string | undefined;
            accessToken?: string | undefined;
            refreshToken?: string | undefined;
            expiresAt?: number | undefined;
            user?: {
                name?: {
                    firstName?: string | undefined;
                    lastName?: string | undefined;
                } | undefined;
                email?: string | undefined;
            } | undefined;
        } | undefined;
        scopes?: string[] | undefined;
        requestSignUp?: boolean | undefined;
        loginHint?: string | undefined;
        additionalData?: Record<string, any> | undefined;
    }> & Record<string, any>, Partial<Record<string, any>> & Record<string, any>, Record<string, any> | undefined>>(data_0: import("better-auth").Prettify<{
        provider: (string & {}) | "linear" | "huggingface" | "github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paybin" | "paypal" | "polar" | "railway" | "vercel" | "wechat";
        callbackURL?: string | undefined;
        newUserCallbackURL?: string | undefined;
        errorCallbackURL?: string | undefined;
        disableRedirect?: boolean | undefined;
        idToken?: {
            token: string;
            nonce?: string | undefined;
            accessToken?: string | undefined;
            refreshToken?: string | undefined;
            expiresAt?: number | undefined;
            user?: {
                name?: {
                    firstName?: string | undefined;
                    lastName?: string | undefined;
                } | undefined;
                email?: string | undefined;
            } | undefined;
        } | undefined;
        scopes?: string[] | undefined;
        requestSignUp?: boolean | undefined;
        loginHint?: string | undefined;
        additionalData?: Record<string, any> | undefined;
    } & {
        fetchOptions?: FetchOptions | undefined;
    }>, data_1?: FetchOptions | undefined) => Promise<import("@better-fetch/fetch").BetterFetchResponse<{
        redirect: boolean;
        url: string;
    } | (Omit<{
        redirect: boolean;
        token: string;
        url: undefined;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    }, "user"> & {
        user: import("better-auth").StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        }>;
    }), {
        code?: string | undefined;
        message?: string | undefined;
    }, FetchOptions["throw"] extends true ? true : false>>;
} & {
    email: <FetchOptions extends import("better-auth").ClientFetchOption<Partial<{
        email: string;
        password: string;
        callbackURL?: string | undefined;
        rememberMe?: boolean | undefined;
    }> & Record<string, any>, Partial<Record<string, any>> & Record<string, any>, Record<string, any> | undefined>>(data_0: import("better-auth").Prettify<{
        email: string;
        password: string;
        callbackURL?: string | undefined;
        rememberMe?: boolean | undefined;
    } & {
        fetchOptions?: FetchOptions | undefined;
    }>, data_1?: FetchOptions | undefined) => Promise<import("@better-fetch/fetch").BetterFetchResponse<Omit<{
        redirect: boolean;
        token: string;
        url?: string | undefined;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    }, "user"> & {
        user: import("better-auth").StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        }>;
    }, {
        code?: string | undefined;
        message?: string | undefined;
    }, FetchOptions["throw"] extends true ? true : false>>;
}, signOut: <FetchOptions extends import("better-auth").ClientFetchOption<never, Partial<Record<string, any>> & Record<string, any>, Record<string, any> | undefined>>(data_0?: import("better-auth").Prettify<{
    query?: Record<string, any> | undefined;
    fetchOptions?: FetchOptions | undefined;
}> | undefined, data_1?: FetchOptions | undefined) => Promise<import("@better-fetch/fetch").BetterFetchResponse<{
    success: boolean;
}, {
    code?: string | undefined;
    message?: string | undefined;
}, FetchOptions["throw"] extends true ? true : false>>, useSession: () => {
    data: {
        user: import("better-auth").StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        }>;
        session: import("better-auth").StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        }>;
    } | null;
    isPending: boolean;
    isRefetching: boolean;
    error: import("@better-fetch/fetch").BetterFetchError | null;
    refetch: (queryParams?: {
        query?: import("better-auth").SessionQueryParams;
    } | undefined) => Promise<void>;
};
