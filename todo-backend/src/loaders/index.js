import loadExpress from './express'
import createDb from './sequelize'
import dataAccess from '../data/dataAccess'

const loadAll = async(app) => {
    await loadExpress(app)
    console.log("Express loaded.")
    let db = await createDb()
    dataAccess.setDb(db)
    let kategorije = await dataAccess.getKategorije("all")
    if (kategorije.length === 0)
        await dataAccess.addKategorija({naziv:"Bez kategorije", user:"all"})
    return app
}

export default loadAll