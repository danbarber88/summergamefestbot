import * as Discord from "discord.js";
import Moment from "moment";
import schedule from "../schedule.json";
import config from "../config.json";

let startingCheck: NodeJS.Timer;

export const run = (
    client: Discord.Client,
    message: Discord.Message,
    args: String[]
) => {
    // Check if user has permission to use this command
    if (message.author.id !== config.ownerID) return;

    if (args.length === 0) {
        startingCheck
            ? message.channel.send("Notification ON")
            : message.channel.send("Notification OFF");
    }

    //temp
    // if (args[0] === "test") {
    //     // Filter out events before todays date and then sort them by their start date.
    //     const upcomingEvents = schedule.events
    //         .filter((event) => Moment(event.start) > Moment())
    //         .sort(
    //             (a, b) => Moment(a.start).valueOf() - Moment(b.start).valueOf()
    //         );
    //     // First event in the sorted list is the next event to happen.
    //     const nextEvent = upcomingEvents[1];

    //     const whereToWatch = (): string => {
    //         const sites = nextEvent.where;
    //         let linkString = "";
    //         for (let i = 0; i < sites.length; i++) {
    //             i === nextEvent.where.length - 1
    //                 ? (linkString += `[${sites[i].name}](${sites[i].url})`)
    //                 : (linkString += `[${sites[i].name}](${sites[i].url}) - `);
    //         }
    //         return linkString;
    //     };

    //     const embed = new Discord.MessageEmbed()
    //         .setTitle(`An event is scheduled to begin in less than 5 minutes.`)
    //         .setDescription(
    //             "Look below to find out where you can watch."
    //         )
    //         .setThumbnail(nextEvent.partner.logo)
    //         .addField(nextEvent.title, nextEvent.description)
    //         .addField("Where", whereToWatch())
    //         .setURL(nextEvent.url)
    //         .setImage(nextEvent.image)
    //         .setColor("#45b1ce");
    //     message.channel.send({ embed });
    // }

    if (args[0] === "off") {
        clearInterval(startingCheck);
        message.channel.send(`Event Starting Notification Off`);
    }

    if (args[0] === "on") {
        // Filter out events before todays date and then sort them by their start date.
        const upcomingEvents = schedule.events
            .filter((event) => Moment(event.start) > Moment())
            .sort(
                (a, b) => Moment(a.start).valueOf() - Moment(b.start).valueOf()
            );
        // First event in the sorted list is the next event to happen.
        const nextEvent = upcomingEvents[0];

        const whereToWatch = (): string => {
            const sites = nextEvent.where;
            let linkString = "";
            for (let i = 0; i < sites.length; i++) {
                i === nextEvent.where.length - 1
                    ? (linkString += `[${sites[i].name}](${sites[i].url})`)
                    : (linkString += `[${sites[i].name}](${sites[i].url}) - `);
            }
            return linkString;
        };

        // Check if an event is starting every five minutes.
        const fiveMinsInMs = 1000 * 60 * 5;
        startingCheck = setInterval(() => {
            // if five minutes from now is after the events start time.
            if (Moment().add(5, "minutes") > Moment(nextEvent.start)) {
                if (nextEvent) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(
                            `An event is scheduled to begin in less than 5 minutes.`
                        )
                        .setDescription(
                            "Look below to find out where you can watch."
                        )
                        .setThumbnail(nextEvent.partner.logo)
                        .addField(nextEvent.title, nextEvent.description)
                        .addField("Where", whereToWatch())
                        .setURL(nextEvent.url)
                        .setImage(nextEvent.image)
                        .setColor("#45b1ce");

                    const allGuilds = client.guilds.cache.array();
                    for (const guild of allGuilds) {
                        const guildChannels = guild.channels.cache.array();

                        for (const channel of guildChannels) {
                            if (channel.type === "text") {
                                (channel as Discord.TextChannel).send({
                                    embed,
                                });
                            }
                        }
                    }
                } else {
                    message.channel.send(
                        "Can't find next event right now. Try again later."
                    );
                }
            }
        }, fiveMinsInMs);

        message.channel.send(`Event Starting Notification On`);
    }
};
