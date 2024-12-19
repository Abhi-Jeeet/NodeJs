const express = require("express");
const{handleAddEntry, handleDeleteEntry, handleUpdateEntry} = require("../controllers/todo")

const router = express.Router();

router.post('/', handleAddEntry);
router.get("/delete/:id",handleDeleteEntry)
router.post("/update/:id", handleUpdateEntry)



module.exports = router;