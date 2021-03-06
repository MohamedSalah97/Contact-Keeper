const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ;
const config = require("config") ;
const {check , validationResult} = require("express-validator")

//register a user -- public
router.post("/",[
    check("name" , "Name is required ").not().isEmpty(),
    check("email" , "Enter a valid email").isEmail(),
    check("password","Enter a password with 6 or more character").isLength({min : 6})
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    }
    const {name , email , password } = req.body ;
    try {
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({ msg : "user already exists"});
        }

        user = new User({name , email , password }) ; 

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password , salt);
        user.save();
        const payload = {
            user : {
                id : user.id
            }
        }
        jwt.sign(payload,config.get("jwtSecret"),(err,token) =>{
            if(err) throw err ;
            res.json({token});
        })
    } catch (err) {
        console.error(err.message) ;
        res.status(500).send("server error") ;
    }
})

module.exports = router ;