export interface IRegister {
    email: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
    avatar?: Object;
}

export interface ILogin {
    email: string;
    password: string;
}
