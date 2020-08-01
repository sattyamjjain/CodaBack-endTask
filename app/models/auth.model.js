const sql = require("./db.js");

const Auth = function(auth) {
  this.id = auth.id;
  this.email = auth.email;
  this.name = auth.name;
  this.password = auth.password;
};

Auth.create = (auth, result) => {
  sql.query('SELECT * FROM auth WHERE email = ? and password = ?',[auth.email,auth.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("auth: ", res);
    result(null, res);
  });
};

Auth.register = (newRegister, result) => {
    sql.query("INSERT INTO auth SET ?", newRegister, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created candidate: ", { ...newRegister });
      result(null, {...newRegister });
    });
  };

module.exports = Auth;