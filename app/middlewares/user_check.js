import User from "../models/user.js";

const user_check = async (ctx, next) => {
    ctx.user = await User.findOne({
        where: {
            user_id: ctx.from.id
        }
    });
    if(ctx.chat.type === 'private' && !ctx.user) {
        ctx.user = await User.create({
            user_id: ctx.from.id,
            username: ctx.from.username,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name
        });
    }
    next();
};

export default user_check;
