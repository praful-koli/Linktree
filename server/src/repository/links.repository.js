import Link from "../models/links.model.js";

class LinkRepository {
  async createLink(data) {
    return await Link.create(data);
  }

  async getLinksByUserId(userId) {
    return await Link.find({ user: userId }).sort({ createdAt: -1 });
  }

  async getLinkById(linkId) {
    return await Link.findById(linkId);
  }

  async getUserLinkById(linkId, userId) {
    return await Link.findOne({
      _id: linkId,
      user: userId,
    });
  }

  async updateUserLink(linkId, userId, updateData) {
    return await Link.findOneAndUpdate(
      {
        _id: linkId,
        user: userId,
      },
      updateData,
      { new: true, runValidators: true },
    );
  }

  async deleteUserLink(linkId, userId) {
    return await Link.findOneAndDelete({
      _id: linkId,
      user: userId,
    });
  }

  async getPublicLinksByUserId(userId) {
    return await Link.find({
      user: userId,
      isActive: true,
    }).sort({ createdAt: -1 });
  }

  async increaseClick(linkId) {
    return await Link.findByIdAndUpdate(
      linkId,
      { $inc: { clicks: 1 } },
      { new: true },
    );
  }


  async getAnalyticsByUserId(userId) {
    return await Link.find({ user: userId })
      .select("title url clicks isActive createdAt")
      .sort({ clicks: -1 });
  }
}

export default new LinkRepository();
