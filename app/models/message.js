'use strict';
import Sequelize from 'sequelize';
import db from '../../utils/database.js';


const Message = db.define('message', {
    id:{ type:Sequelize.INTEGER, autoIncrement:true, allowNull:false, primaryKey:true },
    user_id: { type: Sequelize.INTEGER, allowNull:false},
    chat_id: { type: Sequelize.INTEGER, allowNull:false },
    message_id: { type: Sequelize.INTEGER, allowNull:false },
    text: { type: Sequelize.TEXT, allowNull:true },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

export default Message;
