import jwt from "jsonwebtoken";
const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 15 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateToken;
