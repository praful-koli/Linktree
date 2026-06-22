import linkRepository from "../../repository/links.repository.js";

class LinkService {
  async createLink(userId, data) {
    const { title, url } = data;

    const link = await linkRepository.createLink({
      title,
      url,
      user: userId,
    });

    return link;
  }

  async getMyLinks(userId) {
    return await linkRepository.getLinksByUserId(userId);
  }

  async updateLink(linkId, userId, data) {
    const link = await linkRepository.updateUserLink(linkId, userId, data);

    if (!link) {
      throw new Error("Link not found");
    }

    return link;
  }

  async deleteLink(linkId, userId) {
    const link = await linkRepository.deleteUserLink(linkId, userId);

    if (!link) {
      throw new Error("Link not found");
    }

    return link;
  }

  async trackClick(linkId) {
    const link = await linkRepository.increaseClick(linkId);

    if (!link) {
      throw new Error("Link not found");
    }

    if (!link.isActive) {
      throw new Error("Link is not active");
    }

    return {
      url: link.url,
      clicks: link.clicks,
    };
  }
}

export default new LinkService();
