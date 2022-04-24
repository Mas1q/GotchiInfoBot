import { Markup } from "telegraf";

export default async (ctx, next) => {
    if(ctx.user.state < 1) {
        ctx.reply(
            `Здравствуйте, ${ctx.message.from.first_name}.\n` +
            `Для регистрации нажмите на кнопку 'Отправить номер телефона 🔑'`,
            Markup.keyboard([
                [
                    Markup.button.contactRequest('Отправить номер телефона 🔑')
                ]
            ]).oneTime().resize()
        );
    } else await next();
}
