const sql = require("./db.js");

const Candidate = function(candidate) {
  this.id = candidate.id;
  this.email = candidate.email;
  this.name = candidate.name;
  this.mobile_no = candidate.mobile_no;
  this.votes = candidate.votes;
  this.level = candidate.level;
};

Candidate.create = (newCandidate, result) => {
  sql.query("INSERT INTO candidate SET ?", newCandidate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created candidate: ", { ...newCandidate });
    result(null, {...newCandidate });
  });
};

Candidate.findById = (candidateId, result) => {
  sql.query(`SELECT * FROM candidate WHERE id = ${candidateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found candidate: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Candidate.getAll = result => {
  sql.query("SELECT * FROM candidate", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("candidate: ", res);
    result(null, res);
  });
};

Candidate.updateById = (id, candidate, result) => {
  sql.query(
    "UPDATE candidate SET email = ?, name = ?, votes = ?, level = ? WHERE id = ?",
    [candidate.email, candidate.name, candidate.votes, candidate.level, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated candidate: ", { id: id, ...candidate });
      result(null, { id: id, ...candidate });
    }
  );
};

Candidate.remove = (id, result) => {
  sql.query("DELETE FROM candidate WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted candidate with id: ", id);
    result(null, res);
  });
};

module.exports = Candidate;