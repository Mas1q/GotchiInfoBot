import polygon from "../../../utils/polygon.js";
import Message from "../../models/message.js";

const reply_message = async ctx => {
    if(ctx.chat.type === 'private') {
        if(typeof ctx.message.text !== "undefined") {
            const balance = ctx.user.address ? await polygon.getPolygonBalance(ctx.user.address) : 0;
            const data = await ctx.telegram.sendMessage(
                process.env.ADMIN_GROUP_ID,
                `Сообщение от ID ${ctx.user.id} <a href="tg://user?id=${ctx.user.user_id}">${ctx.user.first_name}</a> (${Math.floor(balance * 100) / 100}M):\n${ctx.message.text}`,
                {
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                }
            );
            await Message.create({
                user_id: ctx.message.from.id,
                chat_id: ctx.message.chat.id,
                message_id: data.message_id,
                text: ctx.message.text
            });
        } else await ctx.reply(`Я умею работать только с текстом 🤗`);
    } else {
        if(ctx.message.reply_to_message) {
            const msg = await Message.findOne({
                where: {
                    message_id: ctx.message.reply_to_message.message_id
                }
            });
            if(msg) {
                await ctx.telegram.sendMessage(msg.user_id, ctx.message.text);
            }
        }
    }

};

export default reply_message;
