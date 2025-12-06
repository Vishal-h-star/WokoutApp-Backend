require('dotenv').config()
const express = require("express");
const cors =  require('cors')

const {workoutRoute , userRoute} = require('./routes')
const Dbconnection = require('./DbconnectionFile')


const app = express()
const PORT = process.env.PORT || 4000;

app.use(express.json())

app.use(cors({
   origin:"*"
}));


app.use((req, res, next) => {
    console.log("path : ", req.path, " Method :", req.method)
    next()
})

app.get('/', (req, res) => {
    res.send("Hey my name is vishal")
})

app.use('/api/workouts', workoutRoute)

app.use('/api/user', userRoute)


// connecting  database using mongoose
// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//         mongoose.connection.on('error', (err) => {
//             console.error(err)
//         })


//     })
//     .catch((error) => {
//         console.log(error)
//     })

Dbconnection().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`)
    })

})



