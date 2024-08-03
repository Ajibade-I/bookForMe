const express = require("express");
const {
  addAdmin,
  adminLogin,

  getAllGuests,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/registration", addAdmin);
router.post("/login", adminLogin);

router.get("/get/guests", getAllGuests);

module.exports = router;
