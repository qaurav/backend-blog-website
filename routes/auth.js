const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//for Registration Process

router.post("/register", async (req, res) =>{
    try{ 
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
        });
        const user = await newUser.save();
        const {password, ...others} = user._doc;
        res.status(200).json(others); 
    } catch(err){
        res.status(500).json(err.message);
    }
})

     

    

//For Login Process

router.post("/login", async (req, res) =>{
    try{
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Please provide correct username ");

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("Incorect Password ")


        const {password, ...others} = user._doc;
        res.status(200).json(others); 
        
   
    } catch(err){
        res.status(500).json(err);
    }
} )

module.exports = router;