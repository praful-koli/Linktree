import linkRepository from "../../repository/links.repository.js";
import userRepository from "../../repository/user.repository.js";
import clickRepository from "../../repository/click.repository.js";
import { getLast7DaysDates } from "../../utils/analyticsGraph.js";
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

    await clickRepository.createClick({
      link: link._id,
      user: link.user,
    });

    return {
      url: link.url,
      clicks: link.clicks,
    };
  }

  async getPublicProfile(username) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const links = await linkRepository.getPublicLinksByUserId(user._id);

    return {
      profile: user,
      links,
    };
  }

  async getAnalytics(username, loggedInUserId) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    if (user._id.toString() !== loggedInUserId.toString()) {
      const error = new Error("You are not allowed to access this analytics");
      error.statusCode = 403;
      throw error;
    }

    const links = await linkRepository.getAnalyticsByUserId(user._id);

    const totalLinks = links.length;

    const totalClicks = links.reduce((sum, link) => {
      return sum + link.clicks;
    }, 0);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const clicksByDate = await clickRepository.getLast7DaysClicks(
      user._id,
      startDate,
    );

    const last7DaysActivity = getLast7DaysDates();

    clicksByDate.forEach((item) => {
      const foundDay = last7DaysActivity.find((day) => {
        return day.date === item._id;
      });

      if (foundDay) {
        foundDay.clicks = item.clicks;
      }
    });

    return {
      totalLinks,
      totalClicks,
      linkPerformance: links,
      last7DaysActivity,
    };
  }
}

export default new LinkService();
