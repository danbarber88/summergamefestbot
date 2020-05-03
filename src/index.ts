import * as Discord from "discord.js";
import * as config from "./config.json";

const client = new Discord.Client();

client.on("ready", () => {
    console.log("bot ready");
});

client.on("message", (message) => {
    if (message.content.startsWith(config.prefix + "test")) {
        message.channel.send("test success");
    }

    // Admin commands
    if (message.author.id !== config.ownerID) {
        // early return if any user but me tries to use command in the else.
        return;
    } else {
        if (message.content.startsWith(config.prefix + "admin test")) {
            message.channel.send("admin test success");
        }
    }
});

client.login(config.token);
