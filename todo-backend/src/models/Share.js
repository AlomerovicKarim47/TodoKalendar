import Sequelize from 'sequelize'

export default function (sequelize){
    return sequelize.define('Share',{
        code:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        event:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        }       
    })
}