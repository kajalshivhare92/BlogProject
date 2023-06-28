const express = require('express')
//console.log(express)
const app = express()
const port = 3000
const web =require('./routes/web')
const connectDB = require('./db/connect_db')
const { urlencoded } = require('express')
const fileUpload = require("express-fileupload");
var cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash');

// cookies
const cookieparser = require('cookie-parser')
app.use(cookieparser())




// connect db
connectDB()



// ejs setup
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extended:false}))

// for file upload
app.use(fileUpload({useTempFiles: true}));


app.use(session({
    secret: 'secret',
    cookie: {maxAge:60000},
    resave: false,
    saveUninitialized: false,

}));

app.use(flash());



//route load
app.use('/',web)


//  server create
app.listen(port, () => {
    console.log('server start localhost:3000')
})