const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const user = module.exports = mongoose.model('user', userSchema);