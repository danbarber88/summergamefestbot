import * as Discord from "discord.js";
import Moment from "moment";
import schedule from "node-schedule";
import getNextEvents from "../helpers/getNextEvents";
import whereToWatch from "../helpers/whereToWatch";

export default (client: Discord.Client) => {
    schedule.scheduleJob("*/10 * * * *", async () => {
        const events = await getNextEvents();
        const nextEvent = events.filter((event) => event.hasStartTime)[0];

        console.log(
            `${Moment().format("HH:mm:ss")}: Checking for ${
                nextEvent.title
            } start`
        );

        // if ten minutes from now is after the events start time.
        if (Moment().add(10, "minutes") >= Moment(nextEvent.start)) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`An event is scheduled to begin in 10 minutes.`)
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
    });
};
