const Candidate = require("../models/candidate.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      const candidate = new Candidate({
        id:req.body.id,
        email: req.body.email,
        name: req.body.name,
        mobile_no: req.body.mobile_no,
        votes: req.body.votes,
        level: req.body.level,
      });
    
      Candidate.create(candidate, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the candidate."
          });
        else res.send(data);
      });
};

exports.findAll = (req, res) => {
    Candidate.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving candidates."
          });
        else res.send(data);
      });
};

exports.findOne = (req, res) => {
    Candidate.findById(req.params.candidateId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Candidate with id ${req.params.candidateId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Candidate with id " + req.params.candidateId
            });
          }
        } else res.send(data);
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Candidate.updateById(
        req.params.candidateId,
        new Candidate(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Candidate with id ${req.params.candidateId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Candidate with id " + req.params.candidateId
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    Candidate.remove(req.params.candidateId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Candidate with id ${req.params.candidateId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Candidate with id " + req.params.candidateId
            });
          }
        } else res.send({ message: `Candidate was deleted successfully!` });
      });
};