const express = require("express");
const { adminLoggedIn } = require("../lib/midlleware/auth-middleware");
const { addRooms } = require("../controllers/roomController");

const router = express.Router();

router.post("/add-room", adminLoggedIn, addRooms);

module.exports = router;
