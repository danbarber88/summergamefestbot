import * as Discord from "discord.js";
import Moment from "moment";
import getNextEvents from "../helpers/getNextEvents";
import { IEvent } from "../IEvent";

const buildDescription = (events: IEvent[]) => {
    let description = "";

    for (const event of events) {
        description += `*${Moment(event.start)
            .utcOffset(-7)
            .format("MMMM Do")}*\n**${event.title}**\n`;

        if (event.reminders) {
            const { apple, google, outlook } = event.reminders
            description += `${event.description} \n`
            description += `***Add to calendar:** [Apple](${apple}) - [Google](${google}) - [Outlook](${outlook})*\n\n`
        } else {
            description += `${event.description} \n\n`
        }
    }

    return description;
};

export const run = async (
    _client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    const events = await (await getNextEvents()).slice(0, 3);

    const embed = new Discord.MessageEmbed()
        .setTitle("Upcoming Events")
        .setDescription(buildDescription(events))
        .setThumbnail(
            "https://pbs.twimg.com/profile_images/1255985245649686530/7sxvVPqt_400x400.jpg"
        )
        .addField(
            "View Full Schedule",
            "[Click here](https://www.summergamefest.com/#link--schedule-section) for the full Summer Game Fest schedule. Or [Click here](https://www.addevent.com/calendar/DP262560) to subscribe to the master calendar."
        )
        .setURL("https://www.summergamefest.com/#link--schedule-section")
        .setFooter("All dates are PST")
        .setColor("#45b1ce");

    message.channel.send({ embed });
};
