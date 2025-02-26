export interface IUser {
    _id: number,
    role: string;
    email: string;
    password: string;
    notifications: {
        notifId:number;
        message: string;
        date: Date;
        isRead: boolean;
    }[];
    settings: {
        enableNotifications: boolean;
        enableAlarm: boolean;
    };
    raspberry_pis: {
        raspID: Number;
    }[];
}