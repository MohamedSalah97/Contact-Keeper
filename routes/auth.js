const express = require("express") ;
const router = express.Router() ;
const User = require("../models/User");
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ;
const config = require("config") ;
const auth = require("../middleware/auth")
const {check , validationResult} = require("express-validator");

//auth user and create a token 
router.post("/" ,[
    check("email" , "please enter a valid email").isEmail(),
    check("password" , "password is required").exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    }
    const {name,password} = req.body ;
    try {
        let user = await User.findOne({email}) ;

        if(!user){
            res.status(400).json({msg : "invalid credintials"}) ;
        }

        const isMatch = await bcrypt.compare(password , user.password) ;
        
        if(!isMatch){
            res.status(400).json({msg : "invalid credintials"})
        }

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

// get user - private 
router.get("/" , auth , async (req,res) => {
    try {
        const user = await (await User.findById(req.user.id)).isSelected("-password") ;
        res.json(user)
    } catch (err) {
        console.error(err.message) ;
        res.status(400).send("server error");
    }
})

module.exports = router ;