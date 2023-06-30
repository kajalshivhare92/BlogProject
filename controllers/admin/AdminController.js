const AdminModel = require('../../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer =require('nodemailer')

class AdminController {


    static dashboard = async (req, res) => {
        try {
            const { name, email,is_Varified } = req.admin
            res.render('admin/dashboard', { n: name, e: email,is_Varified:is_Varified })
        } catch (error) {
            console.log(error)
        }
    }


    static register = async (req, res) => {
        try {
            //console.log(req.body)

            const { name, email, password, confirmpassword, phone, address } = req.body
            const admin = await AdminModel.findOne({ email: email })

            if (admin) {
                req.flash('error', 'Email already exists')
                res.redirect('/register')
            }
            else {

                if (name && email && password && confirmpassword && phone && address) {
                    if (password && confirmpassword) {

                        const hashpassword = await bcrypt.hash(password, 10)

                        const register = await new AdminModel({

                            name: name,
                            email: email,
                            password: hashpassword,
                            phone: phone,
                            address: address

                        })

                        await register.save()
                        this.sendEmail(name,email)
                        res.redirect('/login')

                    } else {

                        req.flash('error', 'password and confirm password does not match')
                        res.redirect('/register')
                    }


                } else {
                    req.flash('error', 'All field are required')
                    res.redirect('/register')
                }
            }


        }
        catch (error) {
            console.log(error)
        }
    }

    static sendEmail = async (name, email) => {
        // console.log("email sending")
        //console.log("propertyName")
        // console.log(email)
    
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
          subject: "Create Blog Registration Succesfully", // Subject line
          text: "heelo", // plain text body
          html: `<b>${name}</b> Registration is successful! plz wait Approved login.. `, // html body
        });
        //console.log("Messge sent: %s", info.messageId);
      };



    static verifylogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {

                const admin = await AdminModel.findOne({ email: email })
                //console.log(admin)

                if (admin != null) {
                    const ismatched = await bcrypt.compare(password, admin.password)

                    if (ismatched) {
                        // generate jwt token
                        const token = jwt.sign({ id: admin._id }, 'kajalshivhare123')
                        //console.log(token)
                        // if(admin.role === "user")
                        // {
                        //     res.redirect('/')
                        // }
                        if (admin.is_Varified === "Admin") {
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        } else if (admin.is_Varified === "Approved") {
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        } else if (admin.is_Varified === "Pending") {
                            req.flash('error', 'YOU ARE NOT APPROVED! Plz Wait..')
                            res.redirect('/login')

                        } else {
                            req.flash('error', 'Email and Password dose not Match')
                            res.redirect('/login')
                        }





                    } else {
                        req.flash('error', 'Email or password is incorrect')
                        res.redirect('/login')
                    }
                } else {
                    req.flash('error', 'you are not register user')
                    res.redirect('/login')
                }
            } else {
                req.flash('error', 'All field are required')
                res.redirect('/login')
            }
        }
        catch (error) {
            console.log(error)

        }
    }





    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/login')

        } catch (error) {
            console.log(error)
        }
    }


    static UserDisplay = async (req, res) => {
        try {
            const{is_Varified}=req.admin
            const data = await AdminModel.find()
            res.render('admin/user/display', { d: data,is_Varified:is_Varified })

        } catch (error) {
            console.log(error)
        }
    }

    static userdelete = async (req, res) => {
        try {

            await AdminModel.findByIdAndDelete(req.params.id)

            res.redirect('/userdisplay')

        } catch (error) {
            console.log(error)
        }
    }
   
   
   


}
module.exports = AdminController