const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const todoRoutes = require('./routes/todosRouts')
// require('dotenv').config()

const app = express()

// app.use(cors())
// app.use(express.json())
// app.use('/api/todos', todoRoutes)

const PORT = process.env.PORT || 3001

const start = async () => {
    try {
        // await mongoose.connect(process.env.DB_CONNECT)
        // app.listen(PORT, () => console.log('server started on port', PORT));
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

start()