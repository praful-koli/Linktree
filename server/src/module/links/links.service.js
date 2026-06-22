import linkRepository from "../../repository/links.repository.js";

class LinkService {
  async createLink(userId, data) {
    const { title, url } = data;

    const link = await linkRepository.createLink({
      title,
      url,
      user: userId,
    });

    return link
  }
}



export default new LinkService