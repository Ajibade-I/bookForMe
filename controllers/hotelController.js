const BadRequestError = require("../lib/error/bad-request-error");
const NotFoundError = require("../lib/error/not-found-error");
const { succesResponse } = require("../lib/helpers/utility-functions");

const {
  validateHotel,
  validateParentHotel,
} = require("../lib/validation/userValidation");
const Admin = require("../models/admin");
const Hotel = require("../models/hotel");
const ParentHotel = require("../models/parentHotel");


const createParentHotel = async (req, res) => {
  await ParentHotel.sync();

  const error = await validateParentHotel(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const name = await ParentHotel.findOne({ where: { name: req.body.name } });
  if (name) {
    throw new BadRequestError("Hotel with this name already exists");
  }

  await ParentHotel.create(req.body);
  return succesResponse(res, "Parent hotel created succesfully");
};

const addHotel = async (req, res) => {
  const error = await validateHotel(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { description, email, name, address, city, country, phone } = req.body;

  const adminId = req.user.id;

  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    throw new BadRequestError("Error accessing admin Id");
  }

  const parentHotel = await ParentHotel.findByPk(admin.parentHotelId);
  if (!parentHotel) {
    throw new NotFoundError("Parent Hotel Not found");
  }

  await Hotel.create({
    description,
    email,
    name,
    address,
    city,
    country,
    phone,
    parentId: parentHotel.id,
  });

  res.status(200).json({ message: "Hotel added succefully" });
};


module.exports = { addHotel, createParentHotel };
