import {Router} from 'express'
import controllers from '../controllers/controllers'
import middleware from '../middleware/index'

const appRouter = Router()

appRouter.post('/event', 
    middleware.verifyToken,
    middleware.decodeUserInfo, //
    controllers.addEvent)

appRouter.get('/events/:date',
    middleware.verifyToken, 
    middleware.decodeUserInfo, //
    controllers.getEvents)

appRouter.delete('/event/:eventId',
    middleware.verifyToken,
    controllers.deleteEvent)

appRouter.put('/event',
    middleware.verifyToken,
    controllers.editEvent)

appRouter.get('/event/:eventId', 
    middleware.verifyToken,
    controllers.getEvent)

appRouter.post('/kategorija',
    middleware.verifyToken,
    middleware.decodeUserInfo, //
    controllers.addKategorija)

appRouter.get('/kategorije',
    middleware.verifyToken,
    middleware.decodeUserInfo, //
    controllers.getKategorije)

appRouter.delete('/kategorija/:kategorijaId', 
    middleware.verifyToken,
    controllers.deleteKategorija)

appRouter.put('/event/:eventId',
    middleware.verifyToken, 
    controllers.toggleChecked)

appRouter.get('/searchEvents/:term', 
    middleware.verifyToken,
    middleware.decodeUserInfo, //
    controllers.searchEvents)

appRouter.post('/register', 
    controllers.register)

appRouter.post('/login', 
    controllers.login)

appRouter.get('/share/:eventId', middleware.verifyToken, controllers.share)

appRouter.get('/sharedEvent/:eventCode', middleware.verifyToken, controllers.getShared)

export default appRouter