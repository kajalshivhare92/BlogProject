const BlogModel = require('../../models/Blog')
const CategoryModel = require('../../models/Category')


class CategoryController {



    static CategoryDisplay = async (req, res) => {

        try {
            const{is_Varified}=req.admin
            const data = await CategoryModel.find()
           // console.log(data)
            res.render('admin/category/display', { d: data,is_Varified:is_Varified })
        } catch (error) {
            console.log(error)
        }

    }



    static insertcategory = async (req, res) => {
        try {
            // console.log(req.body)
            const result = new CategoryModel({
                name: req.body.name
            })
            await result.save()
            // console.log(result)
            // this is used for rout url
            res.redirect('/admin/categorydisplay')

        } catch (error) {
            console.log(error)
        }
    }


    static categoryEdit = async (req, res) => {
        try {
            const{is_Varified}=req.admin
            const result = await CategoryModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/category/edit', { edit: result,is_Varified:is_Varified })
        }
        catch (error) {
            console.log(error)
        }


    }


    static categoryUpdate = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.id)
            const update = await CategoryModel.findByIdAndUpdate(req.params.id, {

                name: req.body.name

            })

            await update.save()
            res.redirect('/admin/categorydisplay')
        }
        catch (error) {
            console.log(error)
        }

    }


    static categoryDelete = async (req, res) => {
        try {

            await CategoryModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/categorydisplay')
        }
        catch (error) {
            console.log(error)
        }
    }


}


module.exports = CategoryController