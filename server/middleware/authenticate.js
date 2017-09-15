import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ success: false, Error: 'Failed to authenticate token.', status: 400 });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      success: false,
      Error: 'No token provided.'
    });
  }
};
