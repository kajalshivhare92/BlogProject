const mongoose = require('mongoose')


// const url ="mongodb://127.0.0.1:27017/Expressproject"
url = "mongodb+srv://shivharekajal92:kajal92@cluster0.vofjduz.mongodb.net/blog?retryWrites=true&w=majority"

const connectDB =()=>{
    return mongoose.connect(url)


    
    // For cloud DB
    // return mongoose.connect(database)
    
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = connectDB