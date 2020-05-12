import * as Discord from "discord.js";

export const run = (
    _client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription(
            "**Event Starting Notification:** The bot will send a message to the first text channel in your server roughly five minutes before an event is due to start. The message will contain a description and tell you where to watch."
        )
        .addField(
            "Commands",
            "- ***next_event*** - Lets you know which event is happening next on the SGF calendar. \n" + 
            "- ***schedule*** - Displays a list of up to five upcoming events."
        )
        .setColor("#45b1ce");

    message.channel.send({ embed });
};
