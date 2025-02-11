export interface IUser {
    role: string;
    email: string;
    password: string;
    notifications: {
        message: string;
        date: Date;
        isRead: boolean;
    }[];
    settingId: string
}