const express = require("express");
const {
  addHotel,
  createParentHotel,
} = require("../controllers/hotelController");
const { adminLoggedIn } = require("../lib/midlleware/auth-middleware");
const router = express.Router();

router.post("/add", adminLoggedIn, addHotel);
router.post("/create-parent", createParentHotel);

module.exports = router;
