'use strict';
import Sequelize from 'sequelize';
import db from '../../utils/database.js';


const Gotchi = db.define('gotchi', {
    id:{ type:Sequelize.INTEGER, autoIncrement:true, allowNull:false, primaryKey:true },
    creator_id: { type: Sequelize.INTEGER, allowNull:false },
    user_id: { type: Sequelize.INTEGER, allowNull:true },
    rent_time: { type: Sequelize.INTEGER, allowNull:false, defaultValue: 0 },
    link: { type: Sequelize.STRING, allowNull:false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

export default Gotchi;
