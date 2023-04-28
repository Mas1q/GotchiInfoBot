import {Markup} from "telegraf";

const state_check = async (ctx, next) => {
    if(ctx.chat.type === 'private' && !ctx.user.active) {
        switch (ctx.user.state) {
            case 0:
                console.log(`Пользователь ${ctx.user.first_name} не заполнил адрес кошелька matic.`);
                return await ctx.reply(`Пришлите, пожалуйста, адрес кошелька MATIC.`, { reply_keyboard: Markup.removeKeyboard() });
            case 2:
                return await ctx.reply(`Ваша регистрация на рассмотрении у администраторов.`)
            default:
                await next();
        }
    } else await next();
}

export default state_check
