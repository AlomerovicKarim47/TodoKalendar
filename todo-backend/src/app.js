import express from 'express'
import loadAll from './loaders/index'
import dotenv from 'dotenv'

const startServer = async () => {
    dotenv.config();
    console.log("ENVIRONMENT:" + process.env.NODE_ENV);
    const app = express()
    await loadAll(app)
    app.listen(4000)
    console.log("BACKEND RUNNING ON PORT 4000")
}

startServer()