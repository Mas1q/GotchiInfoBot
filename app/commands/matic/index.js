import dotenv from 'dotenv';
import polygon from "../../../utils/polygon.js";

dotenv.config();

const request_matic = async ctx => {
    if(ctx.chat.type === 'private') {
        let balance = ctx.user.address ? await polygon.getPolygonBalance(ctx.user.address) : -1;
        balance = Math.floor(balance * 100) / 100
        if(balance <= 0.1) {
            const text = `Запрос MATIC от пользователя ID ${ctx.user.id} ${ctx.user.first_name} Кошелек: <span class="tg-spoiler"><code>${ctx.user.address}</code></span> Баланс: ${Math.floor(balance * 100) / 100}M`;
            await ctx.telegram.sendMessage(process.env.ADMIN_GROUP_ID, text, {
                parse_mode: "HTML"
            });
            await ctx.reply(`Ваш запрос принят. Ожидайте.`);
        } else {
            await ctx.reply(`У вас достаточно матика. Запросите гочика командой /gotchi`);
        }

    }
}

export default request_matic;
