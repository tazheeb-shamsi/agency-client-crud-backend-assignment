import jwt from "jsonwebtoken";

const secretKey = ''; // You need to define your secret key

function generateToken(user) {
  const payload = {
    // userId: user._id,
    userName: "tazheeb",
    email:'tazheeb@example.com',
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
