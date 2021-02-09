let database = null
import Op from 'sequelize'

const setDb = (db) => {
    database = db
}

const addEvent = async(event) => {
    try {
        await database.Event.create(event)
    } catch (error) {
        throw error
    }
}

const getEvents = async(datumi, filter, user) => {
    try {
        let data = await database.Event.findAll({where:filter?{datum:datumi, kategorija:filter, user:user}:{datum:datumi, user:user}})
        let events = []
        for (var i = 0; i < data.length; i++)
            events.push(data[i].dataValues)
        return events
        
    } catch (error) {
        throw error
    }
}

const deleteEvent = async(event) => {
    try {
        await database.Event.destroy({where:{id:event}})
    } catch (error) {
        throw error
    }
}

const editEvent = async(event, user) => {
    try {
        let ev = await database.Event.findOne({where:{id:event.id}})
        if (!ev)
            return
        for (var prop in event)
            if (event.hasOwnProperty(prop))
                ev[prop] = event[prop]
        await ev.save()
    } catch (error) {
        throw error
    }
}

const getEvent = async(id) => {
    try {
        let ev = await database.Event.findOne({where:{id:id}})
        return ev
    } catch (error) {
        throw error
    }
}

const addKategorija = async(kat) => {
    try {
        await database.Kategorija.create(kat)
    } catch (error) {
        throw error
    }
}

const getKategorije = async(user) => {
    try {
        let katData = await database.Kategorija.findAll({where:{user:[user, "all"]}})
        let kategorije = []
        for (var i = 0; i < katData.length; i++)
            kategorije.push(katData[i].dataValues)
        return kategorije
    } catch (error) {
        throw error
    }
}

const deleteKategorija = async(id) => {
    try {
        let kat = await database.Kategorija.findOne({where:{id:id}})
        let naziv = kat.dataValues.naziv
        let user = kat.dataValues.user
        await database.Kategorija.destroy({where:{id:id}})
        await database.Event.update({kategorija: "Bez kategorije"}, {where:{kategorija:naziv, user: user}})
    } catch (error) {
        throw error
    }
}

const toggleChecked = async(id) => {
    try {
        let ev = await database.Event.findOne({where:{id:id}})
        if (!ev)
            return
        ev.gotov = ev.gotov=="0"?"1":"0"
        await ev.save()
    } catch (error) {
        throw error
    }
}

const searchEvents = async(term, user) => {
    try {
        let evData = await database.Event.findAll({where:{
            naziv:{[Op.Op.like]:'%'+term+'%'},
            user: user
        }})
        let events = []
        for (var i = 0; i < evData.length; i++)
            events.push(evData[i].dataValues)
        return events
    } catch (error) {
        throw error
    }
}

const addUser = async(user) => {
    try {
        await database.User.create(user)
    } catch (error) {
        throw error
    }
}

const findUser = async(params) => {
    try {
        let user = await database.User.findOne({where:{username:params.username, password:params.password}})
        
        if (user)
            return user.dataValues
        return null
    } catch (error) {
        throw error
    }
}

const addShare = async(share) => {
    try {
        let check = await database.Share.findOne({where:{event:share.event}})
        if (check)
        {
            check.code = share.code
            await check.save()
        }
        else
            await database.Share.create(share)
    
    } catch (error) {
        throw error
    }
}

const getSharedEvent = async(code) => {
    try {
        let eventShare = await database.Share.findOne({where:{code:code}})
        if (!eventShare)
            return null
        let event = await database.Event.findOne({where:{id:eventShare.event}})
        if (!event)
            return null
        return event.dataValues
    } catch (error) {
        throw error
    }
}

const getUsernames = async () => {
    try {
        let data = await database.User.findAll()
        let users = []
        let emails = []
        for (var i = 0; i < data.length; i++)
        {
            users.push(data[i].dataValues.username)
            emails.push(data[i].dataValues.email)
        }
        return {users, emails}
    } catch (error) {
        throw error
    }
}

const dataAccess = {
    setDb,
    addEvent,
    getEvents,
    deleteEvent,
    editEvent,
    getEvent,
    addKategorija,
    getKategorije,
    deleteKategorija,
    toggleChecked,
    searchEvents,
    addUser,
    findUser,
    addShare,
    getSharedEvent,
    getUsernames
}

export default dataAccess