import Sequelize from 'sequelize'

export default function (sequelize){
    return sequelize.define('User',{
        username:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        email:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        password:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        }       
    })
}