import express from 'express'
import loadAll from './loaders/index'

const startServer = async () => {
    const app = express()
    await loadAll(app)
    app.listen(4000)
    console.log("BACKEND RUNNING ON PORT 4000")
}

startServer()