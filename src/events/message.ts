import * as Discord from "discord.js";
import * as config from "../config.json";
import { commands } from "../bot";

export default (client: Discord.Client, message: Discord.Message) => {
    // Ignore all bots
    if (message.author.bot) return;

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift()!.toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};
