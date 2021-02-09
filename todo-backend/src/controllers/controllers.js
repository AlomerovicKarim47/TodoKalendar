import dataAccess from '../data/dataAccess'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import uuid from 'node-uuid'

const addEvent = async (req, res, next) => {
    let event = req.body
    let user = req.userInfo
    try{
        await dataAccess.addEvent({...event, user:user.id})
        res.end()
    }
    catch(error){
        res.statusCode = 500
        res.end()
        throw error
    }
}

const getEvents = async(req, res, next) => {
    let user = req.userInfo
    let filter = req.query.kategorija?req.query.kategorija.split(","):null
    let today = req.params.date
    let date = moment(today)
    let week = []
    let format = 'YYYY-MM-DD'
    week.push(date.format(format))
    for (var i = 0; i < 6; i++)
        week.push(date.add(1, 'days').format(format))
    
    try {
        let events = await dataAccess.getEvents(week, filter, user.id)
        res.end(JSON.stringify(events))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const deleteEvent = async(req, res, next) => {
    let event = req.params.eventId
    try {
        await dataAccess.deleteEvent(event)
        res.end()    
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
    
}

const editEvent = async(req, res, next) => {
    let event = req.body
    try {
        await dataAccess.editEvent(event)
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const getEvent = async (req, res, next) => {
    let id = req.params.eventId
    try {
        let event = await dataAccess.getEvent(id)
        if (!event)
        {
            res.statusCode = 404
            res.end()
            return
        }
        res.end(JSON.stringify(event))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const addKategorija = async (req, res, next) => {
    let kat = req.body
    let user = req.userInfo
    try {
        await dataAccess.addKategorija({...kat, user: user.id})
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const getKategorije = async (req, res, next) => {
    let user = req.userInfo
    try {
        let kategorije = await dataAccess.getKategorije(user.id)
        res.end(JSON.stringify(kategorije))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const deleteKategorija = async (req, res, next) => {
    let kat = req.params.kategorijaId
    try {
        await dataAccess.deleteKategorija(kat)
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const toggleChecked = async (req, res, next) => {
    let id = req.params.eventId
    try {
        await dataAccess.toggleChecked(id)
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const searchEvents = async (req, res, next) => {
    let term = req.params.term
    let user = req.userInfo
    try {
        let events = await dataAccess.searchEvents(term, user.id)
        res.end(JSON.stringify(events))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const register = async (req, res, next) => {
    let user = req.body
    try {
        let data = await dataAccess.getUsernames()
        let usernames = data.users
        let emails = data.emails
        let response = {username:0, email:0}
        let err = false
        if (usernames.indexOf(user.username) >= 0){
            res.statusCode = 409
            response.username = 1
            err = true
        }
        if (emails.indexOf(user.email) >= 0){
            res.statusCode = 409
            response.email = 1
            err = true
        }
        if (err){
            res.end(JSON.stringify(response))
            return
        }
        await dataAccess.addUser(user)
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const login = async (req, res, next) => {
    try {
        let params = {username: req.body.username, password: req.body.password}
        let user = await dataAccess.findUser(params)
        if (!user){
            res.statusCode = 401
            res.end()
            return
        }
        delete user.password
        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({
                token,
                user
            })
        })
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const share = async(req, res, next) => {
    let eventId = req.params.eventId
    try {
        let newShareCode = uuid.v1()
        await dataAccess.addShare({code:newShareCode, event:eventId})
        res.end(newShareCode)
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const getShared = async(req, res, next) => {
    let code = req.params.eventCode
    try {
        let event = await dataAccess.getSharedEvent(code)
        if (!event){
            res.statusCode = 404
            res.end()
            return
        }
        res.end(JSON.stringify(event))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const controllers = {
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
    register,
    login,
    share,
    getShared
}

export default controllers