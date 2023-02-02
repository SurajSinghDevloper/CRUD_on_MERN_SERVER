const mongoose = require('mongoose')
const validate = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validate.isEmail(value)){
                throw new Error("Email Is Invalid");
            }
        }
    },
    password:{
        type: String,
        required: true
    }
})
const user = new mongoose.model("user",userSchema)
module.exports = user

// const empSchema = new mongoose.Schema({
// })

// const emp = new mongoose.model("Emp",empSchema)
// module.exports = emp