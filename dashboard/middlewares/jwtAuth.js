const { verifyToken } = require('../utils/jwt');

const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = decoded;
  next();
};

module.exports = jwtAuth;