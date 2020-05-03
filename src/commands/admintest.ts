import * as Discord from "discord.js";
import config from "../config.json";

export const run = (
    _client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    if (message.author.id !== config.ownerID) return;
    message.channel.send("admin test success");
};
