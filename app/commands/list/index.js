'use strict';

import dotenv from 'dotenv';
import { Markup } from "telegraf";
import User from "../../models/user.js";
import polygon from "../../../utils/polygon.js";

dotenv.config();

const getUsers = async (start = 0) => {
    return await User.findAll({
        offset: start, limit: 10
    });
}

const generateUsersList = async start => {
    let text = ``;
    const users = await getUsers(start);
    for (let user of users) {
        const balance = user.address ? await polygon.getPolygonBalance(user.address) : -1;
        let textString = `<b>ID</b>: ${user.id} `;
        textString += `<b>Активен</b>: ${user.active ? 'Да' : 'Нет'} `;
        textString += `<b>ФИО</b>: ${user.first_name} ${user.last_name || ''} `;
        if (user.username) textString += `<b>ТГ</b>: https://t.me/${user.username} `;
        if (user.address) textString += `<b>Кошелёк</b>: <code>${user.address ??'Не заполнен'}</code> `;
        if (user.address) textString += `<b>MATIC</b>: ${balance}`;
        text += textString + `\n`;
    }

    return text;
}

const handler = async ctx => {
    if(ctx.user.admin) {
        let start = 0;
        let text = 'Список пользователей:\n';

        text += await generateUsersList(start);

        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('Предыдущие', JSON.stringify({ command: 'list', type: 'minus', value: start}), false),
                Markup.button.callback('Следующие', JSON.stringify({ command: 'list', type: 'plus', value: start}), false)
            ]
        ]);

        await ctx.replyWithHTML(text, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Предыдущие", callback_data: JSON.stringify({ command: 'list', type: 'minus', value: start}) },
                        { text: "Следующие", callback_data: JSON.stringify({ command: 'list', type: 'plus', value: start}) }
                    ]
                ]
            },
            disable_web_page_preview: true
        });
    }
}

const callback = async ctx => {
    const chatId = ctx.update.callback_query.message.chat.id;
    const messageId = ctx.update.callback_query.message.message_id;
    let text = 'Список пользователей:\n';
    const dataArray = JSON.parse(ctx.update.callback_query.data);
    let start = parseInt(dataArray.value);
    if(dataArray.type === 'plus') {
        start += 10;
        text += await generateUsersList(start);
    } else {
        if(start === 0) return false;
        start -= 10;
        text += await generateUsersList(start);
    }

    try {
        await ctx.telegram.editMessageText(chatId, messageId, undefined, text,{
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Предыдущие", callback_data: JSON.stringify({ command: 'list', type: 'minus', value: start}) },
                        { text: "Следующие", callback_data: JSON.stringify({ command: 'list', type: 'plus', value: start}) }
                    ]
                ]
            },
            parse_mode: 'HTML'
        });
    } catch (e) {
        console.log(e)
    }
}

export default {
    handler,
    callback
}
