import dotenv from 'dotenv';
import User from "../../models/user.js";
dotenv.config();

const say_handler = async (ctx) => {
    if(ctx.user.admin) {
        const messageArray = ctx.message.text.split(' ');
        const user = await User.findOne({
            where: {
                id: messageArray[1]
            }
        })
        if(user) {
            await ctx.telegram.sendMessage(user.user_id, messageArray.slice(2).join(' '));
        }
    }
}

export default say_handler
