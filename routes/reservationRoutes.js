const express = require("express");
const {
  makeReservation,
  viewMyReservations,
  viewAllReservations,
} = require("../controllers/reservationController");
const { isLogin, adminLoggedIn } = require("../lib/midlleware/auth-middleware");

const router = express.Router();

router.post("/book", isLogin, makeReservation);
router.get("/", isLogin, viewMyReservations);
router.get("/all", adminLoggedIn, viewAllReservations);

module.exports = router;
