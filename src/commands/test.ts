import * as Discord from 'discord.js'

export const run = (_client: Discord.Client, message: Discord.Message, _args: String[]) => {
    message.channel.send('test success').catch(console.error);
}