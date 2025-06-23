const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/usersRouts')
const postsRoutes = require("./routes/postsRouts");
const friendRequestRoutes = require("./routes/ friendRequestRouts");
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/friendRequest', friendRequestRoutes)

const PORT = process.env.PORT || 3001

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        app.listen(PORT, () => console.log('server started on port', PORT));
    } catch (e) {
        console.error(e)
    }
}

start()