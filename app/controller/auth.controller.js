const Auth = require("../models/auth.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      const auth = new Auth({
        id:req.body.id,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });
    
      Auth.create(auth, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the auth."
          });
        else res.send(true);
      });
};

exports.register = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      const auth = new Auth({
        id:req.body.id,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });
    
      Auth.register(auth, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the auth."
          });
        else res.send(data);
      });
};