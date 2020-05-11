import * as Discord from "discord.js";
import Moment from "moment";
import getNextEvent from "../helpers/getNextEvent";
import whereToWatch from "../helpers/whereToWatch";

// TODO: set a timeout to delete the message after an hour?

export default async (client: Discord.Client) => {
    const fiveMinsInMs = 1000 * 60 * 5;

    const nextEvent = await getNextEvent();

    // Check if an event is starting every five minutes.
    setInterval(() => {
        console.log(`Checking for ${nextEvent.title} start`);

        // if five minutes from now is after the events start time.
        if (Moment().add(5, "minutes") > Moment(nextEvent.start)) {
            const embed = new Discord.MessageEmbed()
                .setTitle(
                    `An event is scheduled to begin in less than 5 minutes.`
                )
                .setDescription("Look below to find out where you can watch.")
                .setThumbnail(nextEvent.partner.logo)
                .addField(nextEvent.title, nextEvent.description)
                .addField("Watch", whereToWatch(nextEvent))
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
                        break;
                    }
                }
            }
        }
    }, fiveMinsInMs);
};
