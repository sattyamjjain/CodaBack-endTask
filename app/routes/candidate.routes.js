module.exports = app => {
    const candidate = require("../controller/candidate.controller.js");

    app.post("/candidate", candidate.create);

    app.get("/candidate", candidate.findAll);

    app.get("/candidate/:candidateId", candidate.findOne);

    app.put("/candidate/:candidateId", candidate.update);

    app.delete("/candidate/:candidateId", candidate.delete);
};