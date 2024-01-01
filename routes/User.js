const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/User");


const router = express.Router();



router.get("/", fetchUserById);
router.patch('/',updateUser)



module.exports = router;
