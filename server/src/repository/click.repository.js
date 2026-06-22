import Click from "../models/click.model.js";

class ClickRepository {
    
  async createClick(data) {
    return await Click.create(data);
  }

  async getLast7DaysClicks(userId, startDate) {
    return await Click.aggregate([
      {
        $match: {
          user: userId,
          clickedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$clickedAt",
            },
          },
          clicks: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
}

export default new ClickRepository();
