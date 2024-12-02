const express = require("express");
const User = require("../models/user");
const{handleGetAllUsers, handleGetUsersById,handleUpdateUsersById, handleDeleteUsersById, handleCreateNewUser}= require("../controllers/user")

const router = express.Router();

router.route('/').get(handleGetAllUsers).post(handleCreateNewUser);
    


router.route("/:id")
.get(handleGetUsersById)
.patch(handleUpdateUsersById)
.delete(handleDeleteUsersById)

// router.get("/", async(req,res)=>{
//     const allDBUsers = await User.find({});
//     const html = `
//     <ul>
//     ${allDBUsers.map((user)=> `<li> ${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;

//     res.send(html);

// })

module.exports = router;