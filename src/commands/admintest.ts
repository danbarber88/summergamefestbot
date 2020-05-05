import * as Discord from "discord.js";
import config from "../config.json";

export const run = (
    client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    if (message.author.id !== config.ownerID) return;

    const allGuilds = client.guilds.cache.array();

    for(const guild of allGuilds) {
       const guildChannels = guild.channels.cache.array()

       for(const channel of guildChannels) {
           if(channel.type === 'text') {
               (channel as Discord.TextChannel).send("beep boop");
           }
       }
    }
};
