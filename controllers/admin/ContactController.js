const ContactModel = require("../../models/Contact")


class ContactController{
 
    static contactInsert = async(req,res)=>{
        try{
            console.log(req.body)
            const insert =await new ContactModel({

                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
                
            })
            await insert.save()
            res.redirect('/contact')
        }
       catch(error){
       console.log(error)
    }
}

static contactDisplay = async (req, res)=>{
    try{
        const {is_Varified,_id} =req.admin
        const display = await ContactModel.find()
        // console.log(display)
        res.render('admin/contact/display',{d:display,is_Varified:is_Varified})
    }
    catch(error){
        console.log(error)

        }
    }
}

module.exports =ContactController









