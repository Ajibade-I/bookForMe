const { NotFoundError } = require("../lib/error");
const BadRequestError = require("../lib/error/bad-request-error");
const { succesResponse } = require("../lib/helpers/utility-functions");
const { validateReservation } = require("../lib/validation/userValidation");
const Reservation = require("../models/reservation");
const Room = require("../models/room");

const makeReservation = async (req, res) => {
  await Reservation.sync();
  const guestId = req.user.id;

  const error = await validateReservation(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { roomId, checkInDate, checkOutDate, totalPrice } = req.body;

  const room = await Room.findByPk(roomId);
  if (!room) {
    throw new NotFoundError("Room not found!!");
  }

  if (room.status !== "available") {
    throw new BadRequestError("This room is currently not available");
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const duration = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  const reservation = await Reservation.create({
    roomId,
    checkInDate,
    checkOutDate,
    totalPrice,
    guestId,
    duration,
  });

  room.status = "occupied";

  await room.save();

  res.status(201).json(reservation);
};

const viewMyReservations = async (req, res) => {
  const guestId = req.user.id;
  const reservation = await Reservation.findAll({ where: { guestId } });
  if (reservation.length == 0) {
    return succesResponse(res, "You have no reservations");
  }
  return succesResponse(res, "", reservation);
};

const viewAllReservations = async (req, res) => {
  const reservation = await Reservation.findAll();
  if (reservation.length == 0) {
    return succesResponse(res, "There are no reservations");
  }
  return succesResponse(res, "", reservation);
};

module.exports = { makeReservation, viewMyReservations, viewAllReservations };
