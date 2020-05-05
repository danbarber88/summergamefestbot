import * as Discord from 'discord.js'
import Moment from 'moment'
import schedule from "../schedule.json"

export const run = (_client: Discord.Client, message: Discord.Message, _args: String[]) => {
    // Filter out events before todays date and then sort them by their start date.
    const upcomingEvents = schedule.events.filter(event => Moment(event.start) > Moment())
        .sort((a, b) => Moment(a.start).valueOf() - Moment(b.start).valueOf())
    // First event in the sorted list is the next event to happen.
    const nextEvent = upcomingEvents[0];

    const whereToWatch = (): string => {
        let linkString = ''
        for (const site of nextEvent.where) {
            linkString += `[${site.name}](${site.url})\n`;
        }
        return linkString;
    }

    if (nextEvent) {
        const embed = new Discord.MessageEmbed()
            .setTitle(nextEvent.title)
            .setDescription(nextEvent.description)
            .setThumbnail(nextEvent.partner.logo)
            .addField("When", 
                Moment(nextEvent.start).utcOffset(-7).format('MMMM Do, h:mm a [PT]') + '\n' +
                Moment(nextEvent.start).utcOffset(-4).format('MMMM Do, h:mm a [ET]') + '\n' +
                Moment(nextEvent.start).utcOffset(+1).format('MMMM Do, h:mm a [BST]'),
                true
            )
            .addField("Where", whereToWatch(), true)
            .setURL(nextEvent.url)
            .setImage(nextEvent.image)
            .setColor('#45b1ce')

        message.channel.send({embed});
    } else {
        message.channel.send("Can't find next event right now. Try again later.")
    }
    
}