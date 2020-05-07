import * as Discord from "discord.js";
import Moment from "moment";
import getNextEvent from "../helpers/getNextEvent";
import whereToWatch from "../helpers/whereToWatch";
import { IEvent } from '../IEvent'

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
                            .format("MMMM Do, h:mm a [BST]")
                )
                .addField("Where", whereToWatch(data))
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
