const { BadRequestError } = require("../lib/error");
const { succesResponse } = require("../lib/helpers/utility-functions");
const { validateAdmin } = require("../lib/validation/adminvalidation");
const { validateLogin } = require("../lib/validation/userValidation");
const Admin = require("../models/admin");
const ParentHotel = require("../models/parentHotel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const addAdmin = async (req, res) => {
  await Admin.sync();

  const error = await validateAdmin(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { userName, email, password, parentHotelId } = req.body;

  const parentHotel = await ParentHotel.findByPk(parentHotelId);
  if (!parentHotel) {
    throw new BadRequestError("Parent Hotel Not Found");
  }
  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(password, salt);

  await Admin.create({
    userName,
    email,
    password: hashedpassword,
    parentHotelId,
  });
  return succesResponse(res, "Admin registered succesfully!");
};

const adminLogin = async (req, res) => {
  const error = await validateLogin(req.body);
  if (error) {
    throw new BadRequestError(error);
  }
  const { email, password } = req.body;

  //find user by email or username
  const admin = await Admin.findOne({
    where: { email },
  });

  if (!admin) {
    throw new BadRequestError("Invalid email or password");
  }

  //check if password is correct
  const valid = await bcryptjs.compare(password, admin.password);
  if (!valid) {
    throw new BadRequestError("Invalid email or password");
  }

  const guestEmail = admin.email;

  //create payload
  const payload = {
    id: admin.id,
    email: admin.email,
  };

  //encrypt payload to create token
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
  const oneDay = 24 * 60 * 60 * 1000;

  //send accessToken as a cookie
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  return succesResponse(res, "Login successfull");
};

module.exports = { addAdmin, adminLogin };
