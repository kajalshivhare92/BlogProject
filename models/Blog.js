const mongoose = require('mongoose')



// define Schema
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },
    c_name:{
        type: String,
        required: true
    },
    author_name:{
        type: String
    },
    comments:{
        type:Object,
        default:{}
    },
    likes:{
        type:Object,
        default:{}
    },
    dislikes:{
        type:Object,
        default:{}
    },
    user_id:{
        type:String,
        required: true
    }



}, { timestamps: true })
// create collection
// Blog is the name of collection
// blogSchema is the fiels of blog Collection
const BlogModel = mongoose.model('blog', BlogSchema)


module.exports = BlogModel