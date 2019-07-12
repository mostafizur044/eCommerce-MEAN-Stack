const express = require("express");
const router = express.Router();
const dictionaryController = require("../controllers/dictionary");

router.get("/", dictionaryController.findAll);
router.post("/", dictionaryController.create);
router.delete("/:id", dictionaryController.delete);

module.exports = router;
