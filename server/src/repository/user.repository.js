import User from "../models/user.model.js";

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByUsername(username) {
    return await User.findOne({ username }).select("name  username bio avatar");
  }

  async findById(id) {
    return await User.findById(id).select("-password");
  }
}

export default new UserRepository();