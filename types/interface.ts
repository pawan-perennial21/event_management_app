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
    id?: string;
    key?: string;
}
export interface EventDetails {
    id: string;
    title: string;
    location: string;
    date: string;
    time: string;
    _id?: any;
    registered?: boolean;
}
