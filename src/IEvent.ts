interface IPartner {
    name: string,
    logo: string
}

interface IWhere {
    name: string;
    url: string;
}

export interface IEvent {
    title: string;
    description: string;
    image: string;
    url: string;
    start: string;
    where: IWhere[];
    partner: IPartner
}