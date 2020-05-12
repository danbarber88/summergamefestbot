interface IPartner {
    name: string,
    logo: string
}

interface IWhere {
    name: string;
    url: string;
}

interface IReminder {
    apple: string,
    google: string,
    outlook: string
}

export interface IEvent {
    title: string;
    description: string;
    image: string;
    url: string;
    hasStartTime: boolean;
    start: string;
    where: IWhere[];
    partner: IPartner
    reminders?: IReminder
}