import * as Discord from "discord.js";
import eventStart from "../notifications/eventStart";

export default (client: Discord.Client) => {
    console.log(
        `Ready to serve in ${client.channels.cache.size} channels on 
        ${client.guilds.cache.size} servers, for a total of ${
            client.users.cache.size
        } users.`
    );

    eventStart(client);
};
