const express = require('express')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoutes')
const path = require('path')
require('dotenv').config();
const {connectToMongoDB} = require('./connection')


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


connectToMongoDB(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))

app.use('/url', urlRoute);
app.use('/', staticRoute);


app.listen(process.env.PORT, () =>  console.log(`SERVER STARTED AT ${process.env.PORT}`))