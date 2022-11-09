export interface IRestore {
    email: string;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IRegister extends ILogin {
    email: string;
    confirmPassword: string;
}

export interface IAuthResponse {
    accessToken: string;
    typeToken: string;
    refreshToken: string;
    status: string | null;
    message: string | null;
    errors: [] | null;
}
