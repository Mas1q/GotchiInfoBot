'use strict';

import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import start from "./app/commands/start/index.js";
import get_address from "./app/commands/address/index.js";
import list from './app/commands/list/index.js';
import user_check from "./app/middlewares/user_check.js";
import state_check from "./app/middlewares/state_check.js";
import say_handler from "./app/commands/say/index.js";
import ban_handler from "./app/commands/ban/index.js";
import delete_handler from "./app/commands/delete/index.js";
import request_matic from "./app/commands/matic/index.js";
import show_id from "./app/commands/id/index.js";
import contact from "./app/commands/contact/index.js";
import reply_message from "./app/commands/reply_message/index.js";
import search from "./app/commands/search/index.js";
import help from "./app/commands/help/index.js";
import gotchi from "./app/commands/gotchi/index.js";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

try {
    bot.use(user_check);

    bot.command('id', show_id);
    bot.start(start);
    bot.hears(/0x[a-fA-F\d]{40}/, get_address);

    bot.use(state_check);

    bot.command('search', search);
    bot.command('help', help);
    bot.command('matic', request_matic);
    bot.command('gotchi', gotchi);
    bot.command('ban', ban_handler);
    bot.command('delete', delete_handler);
    bot.command('say', say_handler);
    bot.command('list', list.handler);
    bot.action(new RegExp(/list/i), list.callback);

    bot.use(reply_message);
    bot.launch();
} catch (e) {
    console.error(e);
}

console.log("GotchiInfoBot start.")

