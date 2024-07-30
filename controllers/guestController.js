const BadRequestError = require("../lib/error/bad-request-error");
const {
  validateSignUp,
  validateLogin,
} = require("../lib/validation/userValidation");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Guest = require("../models/guest");
const { succesResponse } = require("../lib/helpers/utility-functions");

const signUp = async (req, res) => {
  await Guest.sync();

  console.log("Request body:", req.body);

  const error = await validateSignUp(req.body);
  if (error) {
    return res.status(400).json({ success: false, errors: error });
  }

  const { firstName, lastName, email, contact, password } = req.body;

  // Check if email already exists
  const userExists = await Guest.findOne({ where: { email } });
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, errors: { email: "User already exists" } });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    const user = await Guest.create({
      firstName,
      lastName,
      email,
      contact,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "Account created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  //validate login body
  const error = await validateLogin(req.body);
  if (error) {
    throw new BadRequestError(error);
  }
  const { email, password } = req.body;

  //find user by email or username
  const guest = await Guest.findOne({
    where: { email },
  });

  if (!guest) {
    throw new BadRequestError("Invalid email or password");
  }

  //check if password is correct
  const valid = await bcryptjs.compare(password, guest.password);
  if (!valid) {
    throw new BadRequestError("Invalid email or password");
  }

  const guestEmail = guest.email;

  //create payload
  const payload = {
    id: guest.id,
    email: guest.email,
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

const logOut = async (req, res, next) => {
  //expire cookie
  res.cookie("accessToken", "Logout", {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now()),
  });
  return succesResponse(res, "logged out");
};

module.exports = { signUp, login, logOut };
