export interface User {
    email?: string | null | undefined;
    role?: string;
    fullName?: string;
    accessToken?: string;
}

export interface EventFormValues {
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    _id?: string;
    id?: any;
    key?: string;
}
export interface EventDetails {
    id: any;
    title: string;
    location: string;
    date: string;
    time: string;
    _id?: any;
}
