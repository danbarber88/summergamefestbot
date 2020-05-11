import * as Discord from "discord.js";
import Moment from "moment";
import getNextEvent from "../helpers/getNextEvent";
import whereToWatch from "../helpers/whereToWatch";

export const run = async (
    _client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    const nextEvent = await getNextEvent();

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

    message.channel.send({ embed });
};
