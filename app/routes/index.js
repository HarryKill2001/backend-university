const express = require("express");
const _peopleController = require("../controllers/people/people.controller");
const router = express.Router();

router
	.post("/people", _peopleController.createPerson)
	.get("/people/report", _peopleController.getReport);
module.exports = router;
