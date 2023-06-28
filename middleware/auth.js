const jwt = require('jsonwebtoken')

const AdminModel = require('../models/Admin')


const checkAdminAuth = async (req, res, next) => {

    // console.log('hello middleware')
    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        req.flash('error', 'Unauthorized Login')
        res.redirect('/login')

    } else {
        const data = jwt.verify(token, 'kajalshivhare123')
        //    console.log(data)
        const admin = await AdminModel.findOne({_id:data.id})
        console.log(admin)
        req.admin = admin
        next()
    }
}



module.exports = checkAdminAuth