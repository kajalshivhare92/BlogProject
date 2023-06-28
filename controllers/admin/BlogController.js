const BlogModel = require('../../models/Blog')
const CategoryModel =require('../../models/Category')
var cloudinary = require('cloudinary').v2;
const nodemailer =require('nodemailer')
const AdminModel = require('../../models/Admin')


cloudinary.config({
    cloud_name: 'dbteh0acf',
    api_key: '927442271426694',
    api_secret: 'FLaUleLiB6truUcyoF1r5fz7cUo',
    // secure: true
});


class BlogController {

    static displayBlog = async (req, res) => {

        try {
            const {is_Varified,_id} =req.admin
            const data = await BlogModel.find({user_id:_id}).sort({_id:-1})
            const Category =await CategoryModel.find().sort({_id:-1})
            //console.log(data)
            res.render('admin/blog/display', { d: data,c:Category, is_Varified:is_Varified})

        } catch (error) {
            console.log(error)
        }
    }
    static insertblog = async (req, res) => {
        try {
            //console.log(req.files.image)
            const {is_Varified,id} =req.admin
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'blogImage'
            })
            //console.log(myimage)

            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                c_name:req.body.c_name,
                author_name:req.admin.name,
                user_id :id,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })

            await result.save()
            res.redirect('/admin/blogdisplay')

        } catch (error) {
            console.log(error)
        }

    }

    static blogview = async (req, res) => {
        try {
            //console.log(req.params.id)
            const {is_Varified} =req.admin
            const result = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/view', { view: result,is_Varified:is_Varified })
        } catch (error) {
            console.log(error)

        }

    }

    static blogEdit = async (req, res) => {

        try {
            //console.log(req.params.id)
            const {is_Varified} =req.admin
            const result = await BlogModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/blog/edit', { edit: result ,is_Varified:is_Varified})
        }
        catch (error) {
            console.log(error)

        }

    }

    
    static blogUpdate = async (req, res) => {

        try {
            // console.log(req.body)
            // console.log(req.params.id)
            // first delete the image
            if (req.files) {
                const blog = await BlogModel.findById(req.params.id)
                const imageid = blog.image.public_id

                //  console.log(imageid)
                await cloudinary.uploader.destroy(imageid)

                // second update image
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'blogImage'
                })



                var data = {
                    title: req.body.title,
                    description: req.body.description,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                }

            }

            else {
                var data = {
                    title: req.body.title,
                    description: req.body.description
                }
            }
            const update = await BlogModel.findByIdAndUpdate(req.params.id, data)
            await update.save()
            res.redirect('/admin/blogdisplay')
        }
        catch (error) {
            console.log(error)
        }
    }

    static blogDelete = async (req, res) => {

        try {
            // delete image code
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
            //  console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            await BlogModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/blogdisplay')
        }
        catch (error) {
            console.log(error)
        }
    }

    static addcomment = async (req, res) => {

        try {
            //console.log(req.body)
            //res.redirect('/admin/blogdisplay')
            var id =req.body.postid;
            //console.log(id)
            var username = req.body.username;
            var comment = req.body.comment;

            await BlogModel.findByIdAndUpdate({_id:id},{
                $push:{
                    "comments":{
                        username:username, 
                        comment:comment
                    }
                }
            })
            res.redirect(`/details/${id}`)

        }
        catch (error) {
            console.log(error)
        }
    }
    static like = async (req, res) => {

        try {
            //console.log(req.body)
            
            var id =req.body.postid;
            //console.log(id)
            var like = req.body.like;
            // var comment = req.body.comment;

            await BlogModel.findByIdAndUpdate({_id:id},{
                $push:{
                    "likes":{
                        like:like, 
                        
                    }
                }
            })
            res.redirect(`/details/${id}`)

        }
        catch (error) {
            console.log(error)
        }
    }
    static dislikes = async (req, res) => {

        try {
            //console.log(req.body)
            
            var id =req.body.postid;
            //console.log(id)
            var dislike = req.body.dislike;
            // var comment = req.body.comment;

            await BlogModel.findByIdAndUpdate({_id:id},{
                $push:{
                    "dislikes":{
                        dislike:dislike, 
                        
                    }
                }
            })
            res.redirect(`/details/${id}`)

        }
        catch (error) {
            console.log(error)
        }
    }

    static update_approve = async (req, res) => {
        try {
            //console.log(req.body)
            const {is_Varified,email ,name} =req.body
            //console.log(is_Varified,email,name)
            const update = await AdminModel.findByIdAndUpdate(req.params.id,{
                is_Varified:req.body.is_Varified,
                comment:req.body.comment
            })
            this.sendEmail(email,name ,is_Varified)
            
            res.redirect('/userdisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static sendEmail = async (email,name,is_Varified) => {
        // console.log("email sending")
        //console.log("propertyName")
        console.log(email)
    
        //connenct with the smtp server
    
        let transporter = await nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
    
          auth: {
            user: "shivharekajal92@gmail.com",
            pass: "uyonosygultixqvc",
          },
        });
        let info = await transporter.sendMail({
          from: "test@gmail.com", // sender address
          to: email, // list of receivers
          subject: `Create Blog Registration ${is_Varified} Succesfully`, // Subject line
          text: "heelo", // plain text body
          html: `<b>${name}</b> Registration is  <b>${is_Varified}</b> successful! `, // html body
        });
        //console.log("Messge sent: %s", info.messageId);
      };

    

    



}




module.exports = BlogController