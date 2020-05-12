import * as Discord from "discord.js";
import Moment from "moment";
import getNextEvents from "../helpers/getNextEvents";
import whereToWatch from "../helpers/whereToWatch";

export const run = async (
    _client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    const events = await getNextEvents();
    const nextEvent = events.filter(event => event.hasStartTime)[0];

    const embed = new Discord.MessageEmbed()
        .setTitle(nextEvent.title)
        .setDescription(nextEvent.description)
        .setThumbnail(nextEvent.partner.logo)
        .addField(
            "When",
            Moment(nextEvent.start)
                .utcOffset(-7)
                .format("MMMM Do, h:mm a [PT]") +
                "\n" +
                Moment(nextEvent.start)
                    .utcOffset(-4)
                    .format("MMMM Do, h:mm a [ET]") +
                "\n" +
                Moment(nextEvent.start)
                    .utcOffset(+1)
                    .format("MMMM Do, h:mm a [BST]")
        )
        .addField("Where", whereToWatch(nextEvent))
        .setURL(nextEvent.url)
        .setImage(nextEvent.image)
        .setColor("#45b1ce");
    
    // Add ability to set reminders if the event has them.
    nextEvent.reminders && embed.addField(
        "Add to calendar", 
        `[Apple](${nextEvent.reminders.apple}) - ` + 
        `[Google](${nextEvent.reminders.google}) - ` + 
        `[Outlook](${nextEvent.reminders.outlook})`
    )

    message.channel.send({ embed });
};
