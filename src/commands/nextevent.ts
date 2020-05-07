import * as Discord from "discord.js";
import Moment from "moment";
import { promises as fs } from "fs";
import path from "path";

interface IPartner {
    name: string,
    logo: string
}

interface IWhere {
    name: string;
    url: string;
}

interface IEvent {
    title: string;
    description: string;
    image: string;
    url: string;
    start: string;
    where: IWhere[];
    partner: IPartner
}

const getNextEvent = async () => {
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

const whereToWatch = (nextEvent: IEvent): string => {
    let linkString = "";
    for (const site of nextEvent.where) {
        linkString += `[${site.name}](${site.url})\n`;
    }
    return linkString;
};

export const run = (
    _client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    getNextEvent()
        .then((data: IEvent) => {
            const embed = new Discord.MessageEmbed()
                .setTitle(data.title)
                .setDescription(data.description)
                .setThumbnail(data.partner.logo)
                .addField(
                    "When",
                    Moment(data.start)
                        .utcOffset(-7)
                        .format("MMMM Do, h:mm a [PT]") +
                        "\n" +
                        Moment(data.start)
                            .utcOffset(-4)
                            .format("MMMM Do, h:mm a [ET]") +
                        "\n" +
                        Moment(data.start)
                            .utcOffset(+1)
                            .format("MMMM Do, h:mm a [BST]"),
                    true
                )
                .addField("Where", whereToWatch(data), true)
                .setURL(data.url)
                .setImage(data.image)
                .setColor("#45b1ce");

            message.channel.send({embed});
        })
        .catch(() => {
            message.channel.send(
                "Can't find next event right now. Try again later."
            );
        });
};
