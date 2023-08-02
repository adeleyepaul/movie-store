const jwt = require("jsonwebtoken")
SECRET_KEY = 'H82H08O01IQsdbiweu298h9Hv98rh9H9HWV93039H92';

// Authentication middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token is missing.' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

module.exports = {
    authMiddleware,
    SECRET_KEY
}