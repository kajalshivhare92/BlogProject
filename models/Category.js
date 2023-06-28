const mongoose = require('mongoose')



// define Schema
const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
   
    
},{timestamps:true})
// create collection
// Blog is the name of collection
// blogSchema is the fiels of blog Collection
const CategoryModel = mongoose.model('Category',CategorySchema)


module.exports = CategoryModel