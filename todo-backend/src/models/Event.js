import Sequelize from 'sequelize'

export default function (sequelize){
    return sequelize.define('Event',{
        naziv:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        opis:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        datum:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        pocetak:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        kraj:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        kategorija:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        gotov:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        boja:{
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