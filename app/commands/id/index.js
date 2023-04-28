import User from "../../models/user.js";
import polygon from "../../../utils/polygon.js";

const show_id = async ctx => {
    if(ctx.user.admin) {
        const messageArray = ctx.message.text.split(' ');
        if(messageArray[1]) {
            const user = await User.findOne({
                where: {
                    id: messageArray[1]
                }
            })
            if(user) {
                const balance = user.address ? await polygon.getPolygonBalance(user.address) : 0;
                let textStr = `<b>ID</b>: ${user.id} `;
                textStr += `<b>Активен</b>: ${user.active ? 'Да' : 'Нет'} `;
                textStr += `<b>ФИО</b>: ${user.first_name} ${user.last_name || ''} `;
                if (user.username) textStr += `<b>ТГ</b>: https://t.me/${user.username} `;
                if (user.address) textStr += `<b>Кошелёк</b>: <code>${user.address ??'Не заполнен'}</code> `;
                if (user.address) textStr += `<b>MATIC</b>: ${balance}`;
                return await ctx.replyWithHTML(textStr, {
                    disable_web_page_preview: true
                });
            }
        }
    }
    return await ctx.reply(`ID данного чата: ${ctx.message.chat.id}`);
};

export default show_id;
