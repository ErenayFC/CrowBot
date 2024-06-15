const jwt = require("jsonwebtoken");
const config = require("../../config");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET, {
    expiresIn: "6h", // Token geçerlilik süresi
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
