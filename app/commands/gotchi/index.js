import Gotchi from "../../models/gotchi.js";
import {Op} from "sequelize";
import check_gotchi from "./check_gotchi.js";

const validateUrl = value => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

const gotchi = async (ctx, next) => {
    const date = new Date();
    if (ctx.user.admin) {
        const messageArray = ctx.message.text.split(' ');
        if(messageArray.length > 1) {
            let links = 0;
            for(let item of messageArray) {
                if(validateUrl(item)) {
                    const exist = await Gotchi.findOne({
                        where: {
                            rent_time: 0,
                            link: item
                        }
                    });
                    if(exist == null) {
                        links++;
                        await Gotchi.create({
                            active: 0,
                            creator_id: ctx.user.id,
                            link: item
                        });
                    }
                }
            }
            if(links) return await ctx.reply(`Добавлено ${links} ссылок.`);
            else return await ctx.reply(`Я не обнаружил новых ссылок в вашем сообщении.`);
        } else {
            let text = `Список свободных гочиков:\n`;
            const links = await Gotchi.findAll({ where: { rent_time: 0 } });
            for (let link of links) {
                text += `${link.link}\n`;
            }
            return await ctx.reply(text);
        }
    } else {
        //if(date.getDay() !== 6) return next();
        if(await check_gotchi(ctx.user.address)) return await ctx.reply(`У вас уже есть гочик.`);
        const epoch = Math.floor(new Date().getTime() / 1000);

        const query = { where: { [Op.and]: [ { rent_time: { [Op.gte]: epoch }, }, { user_id: ctx.user.id } ] } };
        const exist = await Gotchi.findOne(query);

        if(exist == null) {
            const first = await Gotchi.findOne({
                where: {
                    rent_time: 0
                }
            });
            if(first != null) {
                first.rent_time = epoch + 14400;
                first.user_id = ctx.user.id;
                await first.save();
                await ctx.telegram.sendMessage(
                    process.env.ADMIN_GROUP_ID,
                    `Пользователю ID ${ctx.user.id} <a href="tg://user?id=${ctx.user.user_id}">${ctx.user.first_name}</a> выдана ссылка ${first.link}.`,
                    {
                        disable_web_page_preview: true,
                        parse_mode: 'HTML'
                    }
                );
                await ctx.reply(`Ссылка на вашего гочика: ${first.link}.\nАрендовать следующего вы сможете через 4 часа.`);
            } else {
                await ctx.telegram.sendMessage(
                    process.env.ADMIN_GROUP_ID,
                    `В базе закончились свободные гочики. Запросил <a href="tg://user?id=${ctx.user.user_id}">${ctx.user.first_name}</a>`,
                    {
                        disable_web_page_preview: true,
                        parse_mode: 'HTML'
                    }
                );
                await ctx.reply(`Нет свободных гочиков для аренды. Попробуйте позже.`);
            }
        } else await ctx.reply(`У вас уже есть арендованный гочик.`);
    }
}

export default gotchi;