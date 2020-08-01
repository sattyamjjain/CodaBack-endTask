module.exports = app => {
    const auth = require("../controller/auth.controller.js");

    app.post("/authLogin", auth.create);

    app.post("/authRegister", auth.register);
};