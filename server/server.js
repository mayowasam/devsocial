require('dotenv').config()
require('./db/mongo')()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/userRouter')
const profileRouter = require('./routes/profileRouter')
const postRouter = require('./routes/postRouter')
const path = require('path')
app.use(express.json({ extended: false}))
app.use(cors({
    origin:[ 'http://localhost:3000'],
}))


app.use('/api/user', router)
app.use('/api/profile', profileRouter)
app.use('/api/post', postRouter)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/build'))
    app.get('*', (req,res) => {
       res.sendFile(path.resolve(_dirname, './build/index.html') ) 
    })
}
 

console.log(process.env.PORT);


app.listen(process.env.PORT || 4000, () => console.log(`server listening on ${process.env.PORT}`))