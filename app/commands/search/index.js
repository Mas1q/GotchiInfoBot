import dotenv from 'dotenv';
import User from "../../models/user.js";
import {Op} from "sequelize";
import polygon from "../../../utils/polygon.js";

dotenv.config();

const search = async ctx => {
    if(ctx.user.admin) {
        let text = 'Найдено:\n';
        const messageArray = ctx.message.text.split(' ');
        const searchString = messageArray[1];
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    {
                        user_id: searchString,
                    },
                    {
                        username: searchString,
                    },
                    {
                        first_name: searchString
                    },
                    {
                        last_name: searchString
                    },
                    {
                        phone_number: searchString
                    },
                    {
                        address: searchString
                    },
                ]
            }
        })

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

        await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
        });
    }
}

export default search;