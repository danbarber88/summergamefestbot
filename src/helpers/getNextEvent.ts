import Moment from "moment";
import path from "path";
import { promises as fs } from "fs";
import { IEvent } from "../IEvent";

export default async () => {
    const data = await fs.readFile(
        path.join(__dirname, "../schedule.json"),
        "utf-8"
    );

    const schedule = JSON.parse(data);

    // Filter out events before todays date and then sort them by their start date.
    const upcomingEvents = schedule.events
        .filter((event: IEvent) => Moment(event.start) > Moment())
        .sort(
            (a: IEvent, b: IEvent) =>
                Moment(a.start).valueOf() - Moment(b.start).valueOf()
        );
    // First event in the sorted list is the next event to happen.
    return upcomingEvents[0];
};