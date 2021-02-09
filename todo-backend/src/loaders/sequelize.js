import Sequelize from 'sequelize'
import Event from '../models/Event'
import Kategorija from '../models/Kategorija'
import User from '../models/User'
import Share from '../models/Share'
import mysql from 'mysql2/promise'

const createDb = async () =>{
    
    try {
        const database = {}
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root'
        })
        
        await connection.query('CREATE DATABASE IF NOT EXISTS todokalendar')
        console.log("Created the databse.")
        const sequelize = new Sequelize("mysql://root:root@localhost:3306/todokalendar", { logging: false })

        database.Sequelize = Sequelize
        database.sequelize = sequelize

        database.Event = Event(sequelize)
        database.Kategorija = Kategorija(sequelize)
        database.User = User(sequelize)
        database.Share = Share(sequelize)

        await sequelize.authenticate()
        console.log("Connected to the database.")

        await database.sequelize.sync()
        console.log("Tables created.")
        return database
    } catch (error) {
        console.log("Unable to connect to the database.")
        throw error
    }
}

export default createDb