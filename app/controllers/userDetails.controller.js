const User = require('../models/usersVO.js');

// Create and Save a new User
exports.create = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "UserId or password content can not be empty"
        });


        const user = new User({
            title: req.body.title || "Untitled User", 
            content: req.body.content
        });
    
        // Save user in the database
        User.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving the User."
            });
        });
    };
    

};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {

};

// Find a single user with a userId
exports.findOne = (req, res) => {

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {

};
