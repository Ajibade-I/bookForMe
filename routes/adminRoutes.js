const express = require("express");
const {
  addAdmin,
  adminLogin,
  hello,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/registration", addAdmin);
router.post("/login", adminLogin);
router.get("/", hello);

module.exports = router;
