'use strict';
import Sequelize from 'sequelize';
import db from '../../utils/database.js';


const Module = db.define('module', {
    id:{ type:Sequelize.INTEGER, autoIncrement:true, allowNull:false, primaryKey:true },
    active: { type: Sequelize.INTEGER, allowNull:false, defaultValue: 0 },
    state: { type: Sequelize.INTEGER, allowNull:false, defaultValue: 0 },
    admin: { type: Sequelize.INTEGER, allowNull:false, defaultValue: 0 },
    user_id: { type: Sequelize.STRING, allowNull:false },
    username: { type: Sequelize.STRING, allowNull:true },
    first_name: { type: Sequelize.STRING, allowNull:true },
    last_name: { type: Sequelize.STRING, allowNull:true },
    phone_number: { type: Sequelize.STRING, allowNull:true },
    address: { type: Sequelize.STRING, allowNull:true },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

export default Module;
