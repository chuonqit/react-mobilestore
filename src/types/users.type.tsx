export type PayloadLogin = {
    email: string;
    password: string;
};

export type LoginResponse = {
    user: UserType | null;
    accessToken: string;
    refreshToken: string;
};

export type AuthState = {
    isAuthenticated: boolean;
} & LoginResponse;

export type UserType = {
    _id?: string;
    email: string;
    password: string;
    fullname: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: "ADMIN" | "MANAGER";
};
