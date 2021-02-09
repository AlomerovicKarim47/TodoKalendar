import { json, urlencoded } from "body-parser"
import appRouter from '../routes/routes'
import cors from 'cors'

const loadExpress = async (app)=>{
    app.use(cors())
    app.use(urlencoded({extended:false}))
    app.use(json())
    app.use(appRouter)
    return app
}

export default loadExpress