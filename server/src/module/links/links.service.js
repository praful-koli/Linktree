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
    const link = await linkRepository.updateUserLink(linkId, userId , data)

    if(!link) {
        throw new Error("Link not found")
    }

    return link
  }
}

export default new LinkService();
