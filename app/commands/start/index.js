export default async (ctx, next) => {
    if(ctx.user.state < 1) {
        ctx.reply(
            `Здравствуйте, ${ctx.message.from.first_name}.\n` +
            `Для регистрации отправьте ваш адрес кошелька в сети Polygon.`
        );
    } else await next();
}
