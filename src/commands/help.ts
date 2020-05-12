import * as Discord from "discord.js";

export const run = (
    _client: Discord.Client,
    message: Discord.Message,
    _args: String[]
) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription(
            "**Play The Future** \n" +
            "Bringing the world together to celebrate video games from the comfort of home. Summer Game Fest is a season of digital video game events from publishers, select playable content, in-game events, and more to be announced. \n\n" +
            "**Subscribe to the master calendar [here](https://www.addevent.com/calendar/DP262560) for all events.**" +
            "\n\n----------------\n\n" +
            "**Event Starting Notification:** The bot will send a message to the first text channel in your server roughly five minutes before an event is due to start. The message will contain a description and tell you where to watch."
        )
        .addField(
            "Commands",
            "- ***next_event*** - Lets you know which event is happening next on the SGF calendar. \n" + 
            "- ***schedule*** - Shows up to three upcoming events."
        )
        .setFooter('Contact me at decrepitdan#1040 with questions or suggestions')
        .setColor("#45b1ce");

    message.channel.send({ embed });
};
