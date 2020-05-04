import * as Discord from 'discord.js';
import Moment from 'moment';
import schedule from "../schedule.json";

// Can probably change this to an admin command that turns on notifactions for all channels, need to have some logging so i know if it is on or off.

// ALSO Check guidebot to see how they handle bot settings, might be able to trigger notifications that way.

export const run = (_client: Discord.Client, message: Discord.Message, _args: String[]) => {
    // Filter out events before todays date and then sort them by their start date.
    const upcomingEvents = schedule.events.filter(event => Moment(event.start) > Moment())
        .sort((a, b) => Moment(a.start).valueOf() - Moment(b.start).valueOf())
    // First event in the sorted list is the next event to happen.
    const nextEvent = upcomingEvents[0];

    message.channel.send(`Sure Thing ${message.author.username}. We'll post here before an event starts.`)
    
    // Check if an event is starting every five minutes.
    const fiveMinsInMs = 1000 * 60 * 5;
    setInterval(() => { 
        // if five minutes from now is after the events start time.
        if (Moment().add(5, 'minutes') > Moment(nextEvent.start)) {
            if (nextEvent) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("A Summer Games Fest Event is about to start")
                    .setDescription("Click the title and find out where to watch our upcoming event. The event will starting in less than 5 minutes.")
                    .setThumbnail(nextEvent.partner.logo)
                    .addField(nextEvent.title, nextEvent.description)
                    .setURL(nextEvent.url)
                    .setImage(nextEvent.image)
                    .setFooter("Summer Game Fest 2020", "http://i.imgur.com/w1vhFSR.png")
                    .setColor('#45b1ce')
        
                message.channel.send({embed});
            } else {
                message.channel.send("Can't find next event right now. Try again later.")
            }
        }
    }, fiveMinsInMs);
}