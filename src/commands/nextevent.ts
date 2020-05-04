import * as Discord from 'discord.js'
import Moment from 'moment'
import schedule from "../schedule.json"

export const run = (_client: Discord.Client, message: Discord.Message, _args: String[]) => {
    // Filter out events before todays date and then sort them by their start date.
    const upcomingEvents = schedule.events.filter(event => Moment(event.start) > Moment())
        .sort((a, b) => Moment(a.start).valueOf() - Moment(b.start).valueOf())
    // First event in the sorted list is the next event to happen.
    const nextEvent = upcomingEvents[0];

    if (nextEvent) {
        const embed = new Discord.MessageEmbed()
            .setTitle(nextEvent.title)
            .setDescription(nextEvent.description)
            .setThumbnail(nextEvent.partner.logo)
            .addField("Event Start Time", 
                Moment(nextEvent.start).utcOffset(-8).format('MMMM Do YYYY, h:mm a [PT]') + '\n' +
                Moment(nextEvent.start).utcOffset(-4).format('MMMM Do YYYY, h:mm a [ET]') + '\n' +
                Moment(nextEvent.start).format('MMMM Do YYYY, h:mm a [GMT]')
            )
            .setURL(nextEvent.url)
            .setImage(nextEvent.image)
            .setFooter("Summer Game Fest 2020", "http://i.imgur.com/w1vhFSR.png")
            .setColor('#45b1ce')

        message.channel.send({embed});
    } else {
        message.channel.send("Can't find next event right now. Try again later.")
    }
    
}