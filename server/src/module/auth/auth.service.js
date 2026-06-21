import bcrypt from "bcrypt";

import userRepository from "../../repository/user.repository.js";
import env from "../../config/env.js";
import { generateToken } from "../../utils/jwt.js";
class AuthService {
  

  async register(data) {
    const { name, username, email, password, bio, avatar } = data;

    const existingEmail = await userRepository.findByEmail(email);

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const existingUsername = await userRepository.findByUsername(username);

    if (existingUsername) {
      throw new Error("Username already exists");
    }


    const user = await userRepository.createUser({
      name,
      username,
      email,
      password,
      bio,
      avatar,
    });

    const token = generateToken(user);
    

    return {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
      },
      token,
    };
  }

  async login(data) {
    const { email, password } = data;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
      },
      token,
    };
  }

  async getMe(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default new AuthService();