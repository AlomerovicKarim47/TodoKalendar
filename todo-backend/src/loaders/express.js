import { json, urlencoded } from "body-parser"
import appRouter from '../routes/routes'
import cors from 'cors'
import CONFIG from '../config/config'

const loadExpress = async (app)=>{
    app.use(cors({
        origin: CONFIG.allowedOrigin
    }))
    app.use(urlencoded({extended:false}))
    app.use(json())
    app.use(appRouter)
    return app
}

export default loadExpress