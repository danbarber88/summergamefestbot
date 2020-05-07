import { IEvent } from "../IEvent";

export default (nextEvent: IEvent): string => {
    const sites = nextEvent.where;
    let linkString = "";
    for (let i = 0; i < sites.length; i++) {
        i === nextEvent.where.length - 1
            ? (linkString += `[${sites[i].name}](${sites[i].url})`)
            : (linkString += `[${sites[i].name}](${sites[i].url}) - `);
    }
    return linkString;
};
