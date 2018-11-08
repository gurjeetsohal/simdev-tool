export interface IUserData {
    [index: string]: {
        [key: string]: string;
        value: string;
    };
}

export interface IUserDataProperty {
    [key: string]: string;
    value?: string;
}
