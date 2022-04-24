import Message from "../../models/message.js";
import User from "../../models/user.js";

const ban_handler = async ctx => {
    if(ctx.user.admin) {
        let user;
        let message;
        const messageArray = ctx.message.text.split(' ');
        if(!isNaN(messageArray[1])) {
            user = await User.findOne({
                where: {
                    id: messageArray[1]
                }
            });
        } else if(ctx.update.message.reply_to_message) {
            message = await Message.findOne({
                where: {
                    message_id: ctx.update.message.reply_to_message.message_id
                }
            });

            user = await User.findOne({
                where: {
                    user_id: message.user_id
                }
            });
        }

        if(user) {
            user.active = !user.active;
            await user.save();
            if(user.active) await ctx.replyWithHTML(`Пользователь ${user.first_name} с ID ${user.id} активирован.`);
            else await ctx.replyWithHTML(`Пользователь ${user.first_name} с ID ${user.id} деактивирован.`);
        }
    }
}

export default ban_handler;
