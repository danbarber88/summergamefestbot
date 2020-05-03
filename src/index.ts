import * as Discord from "discord.js";
import Enmap from "enmap";
import fs from "fs";
import config from "./config.json";

const client = new Discord.Client();

fs.readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(`../src/events/${file}`);
        let eventName: any = file.split(".")[0];
        client.on(eventName, event.default.bind(null, client));
    });
});

export const commands = new Enmap();

fs.readdir("./src/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        let props = require(`../src/commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command '${commandName}'`);
        commands.set(commandName, props);
    });
});

client.login(config.token);
