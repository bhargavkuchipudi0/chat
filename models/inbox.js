const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inbox_schema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    messages:{
        type:Array,
    },
    socket_id:{
        type:String,
    }
});

const inbox = module.exports = mongoose.model('inbox',inbox_schema);