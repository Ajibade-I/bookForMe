const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../error");
const Guest = require("../../models/guest");
const Admin = require("../../models/admin");

const isLogin = async (req, res, next) => {
  const { accessToken } = req.signedCookies;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);

      req.user = await Guest.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!req.user) {
        throw new Error("Invalid user");
      }
      next(); // Continue if a regular user is logged in
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, msg: "Please login to continue" });
      return;
    }
  } else {
    res.status(401).json({ success: false, msg: "Please login to continue" });
  }
};

const adminLoggedIn = async (req, res, next) => {
  const { accessToken } = req.signedCookies;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);

      req.user = await Admin.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!req.user) {
        throw new Error("Invalid user");
      }
      next(); // Continue if a regular user is logged in
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .json({ success: false, msg: "Please login as an admin to continue" });
      return;
    }
  } else {
    res
      .status(401)
      .json({ success: false, msg: "Please login as an admin to continue" });
  }
};

module.exports = { isLogin, adminLoggedIn };
