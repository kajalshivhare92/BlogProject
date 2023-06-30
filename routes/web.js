const express = require('express')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const FrontendController = require('../controllers/FrontendController')
const TeacherController = require('../controllers/TeacherController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const ContactController = require('../controllers/admin/ContactController')
const auth = require('../middleware/auth')
const router = express.Router()





// FrontendController
router.get('/', FrontendController.home)
router.get('/about', FrontendController.about)
router.get('/contact', FrontendController.contact)
router.get('/blog', FrontendController.blog)
router.get('/details/:id', FrontendController.details)
router.get('/login', FrontendController.login)
router.get('/register', FrontendController.register)
router.get('/bloglist/:name', FrontendController.bloglist)




// Admin Controller
router.get('/admin/dashboard',auth, AdminController.dashboard)
router.post('/SIGNIN', AdminController.register)
router.post('/verifylogin', AdminController.verifylogin)
router.get('/logout',AdminController.logout)
router.get('/userdisplay',auth,AdminController.UserDisplay)
router.get('/admin/userdelete/:id',auth,AdminController.userdelete)





// blog controller
router.get('/admin/blogdisplay',auth, BlogController.displayBlog)
router.post('/insertblog', auth,BlogController.insertblog)
router.get('/admin/blogview/:id',auth ,BlogController.blogview)
router.get('/admin/blogedit/:id', auth,BlogController.blogEdit)
router.post('/admin/blogupdate/:id',auth, BlogController.blogUpdate)
router.get('/admin/blogdelete/:id',auth, BlogController.blogDelete)
router.post('/add-comment',BlogController.addcomment)
router.post('/like',BlogController.like)
router.post('/dislikes',BlogController.dislikes)
router.post('/update_approve/:id',auth,BlogController.update_approve)



// category controller
router.get('/admin/categorydisplay',auth, CategoryController.CategoryDisplay)
router.post('/insertcategory', auth,CategoryController.insertcategory)
router.get('/admin/categoryedit/:id', auth,CategoryController.categoryEdit)
router.post('/admin/categoryupdate/:id', auth,CategoryController.categoryUpdate)
router.get('/admin/categorydelete/:id', auth,CategoryController.categoryDelete)


// about controller
router.get('/admin/aboutdisplay',auth, AboutController.AboutDisplay)
router.get('/admin/aboutedit/:id',auth, AboutController.AboutEdit)
router.post('/admin/aboutupdate/:id',auth, AboutController.AboutUpdate)



// contact controller
router.post('/contactinsert', ContactController.contactInsert)
router.get('/admin/contactdisplay',auth, ContactController.contactDisplay)

// teacher
router.get('/teacher/display', TeacherController.display)
router.get('/teacher/create', TeacherController.create)





module.exports = router
