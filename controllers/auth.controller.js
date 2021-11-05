const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
module.exports =  {
    signUp: function(req, res) {
        const {username, email, password} = req.body;
        const newUser = new User({username, email, password});
        newUser.save(function(err) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send("User created");
        }
        )

    },
    signIn: function(req, res) {
        const {username, password} = req.body;
        User.findOne({username: username, password: password}, function(err, user) {
            if (err) {
                res.status(500).send(err);
            }
            if (!user) {
                res.status(404).send("User not found");
            }
            if(user){
                const token = jwt.sign({id: user._id, username: user.username }, "phuoclong", {expiresIn: "1h"});
                res.status(200).send({
                token
                });
            }
            
        }
        );

    }
}