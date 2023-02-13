import Sequelize from 'sequelize'
import Event from '../models/Event'
import Kategorija from '../models/Kategorija'
import User from '../models/User'
import Share from '../models/Share'
import CONFIG from '../config/config'

const createDb = async () =>{
    
    try {
        const database = {}
        
        //const connection = new Sequelize(`postgres://${CONFIG.db.USER}:${CONFIG.db.PASS}@${CONFIG.db.HOST}:${CONFIG.db.PORT}/template1`, {logging:false})
        const sequelize = new Sequelize(CONFIG.connectionString, {logging: false})
           
    /*try{   
        await connection.query(`CREATE DATABASE ${CONFIG.db.NAME} WITH OWNER = ${CONFIG.db.USER} ENCODING = 'UTF8'`)
    }catch{
        //DO NOTHING
    }*/

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