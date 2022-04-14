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
    role: "ADMIN" | "MANAGER";
};

export type UserFormType = {
    email: string;
    password: string;
    fullname: string;
    role: "ADMIN" | "MANAGER";
};

export type UserExcelFormType = {
    email: string;
    password: string;
    fullname: string;
    phoneNumber: string;
    role: string;
};
