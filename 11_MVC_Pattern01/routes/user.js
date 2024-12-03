const express = require("express");

const{handleGetAllUsers, handleGetUsersById, handleDeleteUsersById, handleCreateNewUsers}= require("../controllers/user")

const router = express.Router();

router.route("/").get(handleGetAllUsers)

router.route("/:id")
.get(handleGetUsersById)
.delete(handleDeleteUsersById)

router.route("/entry")
.post(handleCreateNewUsers)

module.exports = router;