const express = require("express") ;
const router = express.Router() ;
const User = require("../models/User");
const {check , validationResult} = require("express-validator") ;
const auth = require("../middleware/auth") ;
const Contact = require("../models/Contacts");

// get all users contacts  - private
router.get("/",auth,async(req,res) => {
    try {
        const contacts = await Contact.find({ user : req.user.id }).sort({date : -1}) ;
        res.json(contacts) ;
    } catch (err) {
        console.error(err.message) ;
        res.status(500).send("server error") ;   
    }
})

// add new contact - private
router.post("/",[auth , [
    check("name" , "name is empty").not().isEmpty() 
]], async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    }
    const {name , email , phone , type } = req.body ;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user : req.user.id
        })
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//update contact - private
router.put("/:id" , auth , async(req,res) => {
    const {name , email , phone , type } = req.body ;
    //build contact field 
    const contactField = {};
    if(name) contactField.name = name ;
    if(email) contactField.email = email ;
    if(phone) contactField.phone = phone ;
    if(type) contactField.type = type ;
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg : "contact not found"}) ;
        // make sure user owns contact 
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg : "not authorized"});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id , {$set : contactField} , {new : true});
        res.json(contact);
    } catch (err) {
        onsole.error(err.message);
        res.status(500).send("server error");
    }
})

// delete contact - private
router.delete("/:id" , auth ,  async(req,res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg : "contact not found"}) ;
        // make sure user owns contact 
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg : "not authorized"});
        }

        await Contact.findByIdAndRemove(req.params.id) ;
        res.json({msg : "removed"});
    } catch (err) {
        onsole.error(err.message);
        res.status(500).send("server error");
    }
})

module.exports = router ;