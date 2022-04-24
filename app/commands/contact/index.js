import {Markup} from "telegraf";

const contact = async (ctx, next) => {
    if(ctx.user.state < 1) {
        ctx.user.state = 1;
        ctx.user.phone_number = ctx.message.contact.phone_number;
        await ctx.user.save();
        ctx.reply(`Спасибо. Номер записан. Пришлите, пожалуйста, адрес кошелька MATIC.`, { reply_keyboard: Markup.removeKeyboard() });
    } else await next();
};

export default contact;
