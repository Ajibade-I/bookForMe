const express = require("express");
const { addAdmin, adminLogin } = require("../controllers/adminController");
const router = express.Router();

router.post("/registration", addAdmin);
router.post("/login", adminLogin);

module.exports = router;
