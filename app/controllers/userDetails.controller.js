const User = require('../models/usersVO.js');

// Create and Save a new User
exports.create = (req, res) => {

    if (!req.body.content) {
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


    User.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });

};

// Find a single user with a userId
exports.findOne = (req, res) => {



    User.findById(req.params.userId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "User Id or password can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Untitled UserNAme",
        content: req.body.content
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Usrer not found with id " + req.params.noteId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.userId
            });
        });

};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {


    User.findByIdAndRemove(req.params.noteId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });

};


