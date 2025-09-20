import jwt from 'jsonwebtoken';
import User from '../Models/Auth.Model.js';

const ProtectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ status: 401, message: "Invalid token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ status: 401, message: "Invalid user" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export default ProtectRoutes;
