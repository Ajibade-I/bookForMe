const { BadRequestError, NotFoundError } = require("../lib/error");
const { succesResponse } = require("../lib/helpers/utility-functions");
const { validateRoom } = require("../lib/validation/userValidation");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const { Op } = require('sequelize');



const addRooms = async (req, res) => {
  await Room.sync();

  const error = await validateRoom(req.body);
  if (error) {
    throw new BadRequestError(error);
  }
  const { roomNumber, hotelId } = req.body;

  const hotel = await Hotel.findByPk(hotelId);
  if (!hotel) {
    throw new NotFoundError("Invalid hotel Id");
  }

  const roomExists = await Room.findOne({ where: { hotelId, roomNumber } });
  if (roomExists) {
    throw new BadRequestError("Room number is taken");
  }

  await Room.create(req.body);

  return succesResponse(res, "Room added succefully!");
};

const roomSearch = async (req, res) => {
    try {
        // Extract query parameters
        const { price, status, capacity, roomType, hotelId } = req.query;

        // Build the search conditions
        let searchConditions = {};

        if (price) {
            searchConditions.price = {
                [Op.lte]: price
            };
        }

        if (status) {
            searchConditions.status = status;
        }

        if (capacity) {
            searchConditions.capacity = {
                [Op.gte]: capacity
            };
        }

        if (roomType) {
            searchConditions.roomType = roomType;
        }

        if (hotelId) {
            searchConditions.hotelId = hotelId;
        }

        // Find rooms based on search conditions
        const rooms = await Room.findAll({
            where: searchConditions,
            include: [
                {
                    model: Hotel,
                    as: 'hotel'
                }
            ]
        });

        // Return the search results
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error searching for rooms:', error);
        res.status(500).json({ error: 'An error occurred while searching for rooms.' });
    }
};

module.exports = roomSearch;


module.exports = { addRooms };
