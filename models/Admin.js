const mongoose = require('mongoose')


const AdminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
  
    is_Varified:{
        type:String,
        default:"Pending"
    },
    comment:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    }

},{timestamps:true})

const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel
