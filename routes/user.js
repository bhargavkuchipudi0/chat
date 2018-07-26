const express = require('express');
const router = express();
const user = require('../models/user');
var bcrypt = require('bcryptjs');

router.post('/registerUser', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) res.json({ success: false, msg: err });
            else {
                user.find({ email: req.body.email }, (err, data) => {
                    if (err) console.log(err);
                    else if (data.length > 0) {
                        res.json({ success: false, msg: 'User already registered' });
                    } else {
                        req.body.password = hash;
                        let newUser = new user(req.body);
                        newUser.save((err, user) => {
                            if (err) res.json({ success: false, msg: err });
                            else res.json({ success: true, msg: user });
                        });
                    }
                });
            }
        });
    });
});

router.post('/loginUser',(req,res) => {
    let d = req.body;
    console.log(d); 
    user.find({email:d.email},(err,data) => {
        console.log(data);
        if(data.length > 0) {
            bcrypt.compare(d.password, data[0].password,(err, isMatch) => {
                if(err) {res.json({success: false, msg: 'Invalid Login credentials!'}); console.log(err);}

                else if(isMatch) {
                    res.json({success: true, msg: 'successfull login'});
                }
            });
        } else if(data.length === 0) {
            res.json({success: false, msg:'User not Registered!'});
        } else {
            res.json({success:false, msg:err});
        }
    });
});

module.exports = router;