export interface User {
    id?: string,
    name:string,
    surName:string,
    password:string,
    fullName:string,
    email:string,
    birthDate: string | null,
    telephone: string,
    employment: string,
    userAgreement: boolean,
}

export interface AuthData {
    email: string,
    password: string
}