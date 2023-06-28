const AboutModel = require("../../models/About")


class AboutController {


    static AboutDisplay = async (req, res) => {
        try {
            const {is_Varified,_id} =req.admin
            const result = await AboutModel.findOne()
            //console.log(result)
            res.render('admin/about/display', { a: result,is_Varified:is_Varified })
        }
        catch (error) {
            console.log(error)
        }
    }

    
    
    static AboutEdit = async (req, res) => {
        try {
            const {is_Varified,_id} =req.admin
            const result = await AboutModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/about/edit', { a: result,is_Varified:is_Varified })
        }
        catch (error) {
            console.log(error)
        }

    }


    static AboutUpdate = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.id)
            const {is_Varified,_id} =req.admin
            const update = await AboutModel.findByIdAndUpdate(req.params.id, {

                about: req.body.about

            })

            await update.save()
            res.redirect('/admin/aboutdisplay')
        }
        catch (error) {
            console.log(error)
        }

    }




}

module.exports = AboutController