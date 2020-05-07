import * as Discord from "discord.js";
import Moment from "moment";
import getNextEvent from "../helpers/getNextEvent";
import whereToWatch from "../helpers/whereToWatch";
import { IEvent } from "../IEvent";

// TODO: set a timeout to delete the message after an hour?

export default (client: Discord.Client) => {
    const fiveMinsInMs = 1000 * 60 * 5;

    // Check if an event is starting every five minutes.
    setInterval(() => {
        getNextEvent().then((data: IEvent) => {
            console.log(`Checking for ${data.title} start`);

            // if five minutes from now is after the events start time.
            if (Moment().add(5, "minutes") > Moment(data.start)) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(
                        `An event is scheduled to begin in less than 5 minutes.`
                    )
                    .setDescription(
                        "Look below to find out where you can watch."
                    )
                    .setThumbnail(data.partner.logo)
                    .addField(data.title, data.description)
                    .addField("Watch", whereToWatch(data))
                    .setURL(data.url)
                    .setImage(data.image)
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
            }
        });
    }, fiveMinsInMs);
};
