import env from '../config/env.js'
import jwt from "jsonwebtoken";
export const generateToken = (user) =>  {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      env.ACCESS_TOKEN,
      {
        expiresIn: "7d",
      }
    );
  }