const AboutModel = require('../models/About')
const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/Category')
const AdminModel = require('../models/Admin')

class FrontendController {

    static home = async (req, res) => {

        try {
            const blogs = await BlogModel.find().sort({ _id: -1 }).limit(6)
            //console.log(blogs)
            res.render('home', { b: blogs })
        }
        catch (error) {
            console.log(error)
        }

    }

    static about = async (req, res) => {
        try {
            const about = await AboutModel.findOne()
            console.log(about)
            res.render('about', { a: about })
        }
        catch (error) {
            console.log(error)
        }
    }


    static contact = (req, res) => {
        res.render('contact')
    }


    static blog = async (req, res) => {
        try {
            const blogs = await BlogModel.find().sort({ _id: -1 })
            // console.log(blogs)
            res.render('blog', { b: blogs })
        }
        catch (error) {
            console.log(error)
        }
    }




    static details = async (req, res) => {
        try {
            //console.log(req.params.id)
            const detail = await BlogModel.findById(req.params.id)
            const recentblogs = await BlogModel.find().limit(6)
            const category = await CategoryModel.find()
            res.render('details', { d: detail, r: recentblogs, c: category })

        } catch (err) {
            console.log(err)
        }
    }

    static bloglist = async (req, res) => {
        try {
            //console.log(req.params.id)
            const n = req.params.name
            const bloglist = await BlogModel.find({ c_name: n })
            //console.log(bloglist)

            res.render('bloglist', { d: bloglist })

        } catch (err) {
            console.log(err)
        }
    }


    static login = async (req, res) => {
        try {
            res.render('login',{message: req.flash('error')})
        }
        catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            res.render('register', { message: req.flash('error') })
        }
        catch (error) {
            console.log(error)
        }
    }
    static insert = async(req,res)=>{
        const result = new AdminModel({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password,
            address:req.body.address
        })

        await result.save()
        res.redirect('/login')
    }

    static SIGNIN = async (req, res) => {
        try {
            console.log(req.body)
        }
        catch (error) {
            console.log(error)
        }
    }

 

 



}


module.exports = FrontendController