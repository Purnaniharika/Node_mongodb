const express = require('express');
const router = express.Router();
const {handleGetAllusers,
    handleGetuserbyId,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser} = require("../controllers/user")
router
.route("/")
.get(handleGetAllusers)
.post(handleCreateUser);


router
.route("/:id")
.get(handleGetuserbyId)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);


module.exports = router;