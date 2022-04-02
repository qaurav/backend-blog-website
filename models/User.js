const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")


const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique : false,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email id is invalid!");
            }
        }
    },
    password :{
        type : String,
        required : true,
        // validate(value){
        //     console.log(value);
        //     if(!validator.isStrongPassword(value)){
        //         console.log("hello");
        //         throw new Error("Password must have 1 lowercase, 1 uppercase, 1 symbol and must be eight character long");
        //     }  
        
        // }

    },
   },

   {timestamps: true}
); 



UserSchema.pre('save',  async function() {
    let user = this;
    if(!validator.isStrongPassword(user.password)){
        throw new Error("Password must be 8 character long, must contain 1 uppercase, 1 lowercase and 1 special character");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass ;


})




module.exports = mongoose.model("User", UserSchema);


