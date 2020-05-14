import { ShardingManager } from "discord.js";
import config from "./config.json";
import path from 'path'

const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: config.token,
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));