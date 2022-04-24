import User from "../../models/user.js";

const delete_handler = async ctx => {
    if(ctx.user.admin) {
        const messageArray = ctx.message.text.split(' ');
        if(messageArray[1] && !isNaN(messageArray[1])) {
            const user = await User.findOne({
                where: {
                    id: messageArray[1]
                }
            });
            if(user) {
                await user.destroy();
                await ctx.replyWithHTML(`Пользователь ${user.first_name} с ID ${user.id} удален.`);
            } else await ctx.replyWithHTML(`Пользователь с ID ${messageArray[1]} не найден в базе.`);
        } else await ctx.replyWithHTML(`ID должен быть числом.`);
    }
};

export default delete_handler;
