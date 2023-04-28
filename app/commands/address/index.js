import {Markup} from "telegraf";

const get_address = async (ctx, next) => {
    const address = ctx.match[0];
    if(ctx.user.active === 1 || ctx.user.address === address) await next()
    else {
        ctx.user.active = 1;
        ctx.user.state = 2;
        ctx.user.address = address;
        await ctx.user.save();
        const keyboard = Markup.keyboard([
            [
                Markup.button.text('/matic - Дайте, пожалуйста, MATIC.'),
                Markup.button.text('/gotchi - Есть свободные гочики?')
            ]
        ]).oneTime().resize()
        let text = `<b>Новый пользователь</b>:\n`;
        text += `<b>ID</b>: ${ctx.user.id}\n`;
        text += `<b>ФИО</b>: ${ctx.user.first_name} ${ctx.user.last_name}\n`;
        text += `<b>ТГ</b>: @${ctx.user.username}\n`;
        text += `<b>Кошелёк</b>: <code>${ctx.user.address}</code>\n`;
        await ctx.reply(
            `🤖✅ Если у тебя нет Matic на транзакции, ` +
            `попроси у меня. Если есть матик и нужен гочик в аренду - попроси у меня. ` +
            `Если я не отвечаю - значит задумался - задай тот же вопрос спустя час.`,
            keyboard
        );
        const extra = {
            disable_web_page_preview: true,
            parse_mode: 'HTML'
        };
        await ctx.telegram.sendMessage(process.env.ADMIN_GROUP_ID, text, extra);
    }
};

export default get_address
