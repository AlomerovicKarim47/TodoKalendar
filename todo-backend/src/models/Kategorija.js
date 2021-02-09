import Sequelize from 'sequelize'

export default function (sequelize){
    return sequelize.define('Kategorija',{
        naziv:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        user:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        }       
    })
}