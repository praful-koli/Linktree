import { success } from "zod";
import linksService from "./links.service.js";

class LinkController {
  async createLink(req, res) {
    try {
      const userId = req.user._id;
      const link = await linksService.createLink(userId, req.body);

      res.status(201).json({
        success: true,
        message: "Link created succesfully",
        data: link,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        Meassage: error.meassage,
      });
    }
  }

  async getMyLinks(req, res) {
    try {
      const userId = req.user._id;
      const links = await linksService.getMyLinks(userId);

      res.status(200).json({
        success: true,
        message: "Links fetched successfully",
        data: links,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateLink(req, res) {
    try {
      const userId = req.user._id;
      const linkId = req.params.id;
      const links = await linksService.updateLink(linkId, userId, req.body);

      res.status(200).json({
        success: true,
        message: "Links update successfully",
        data: links,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteLink(req, res) {
    try {
      const userId = req.user._id;
      const linkId = req.params.id;
      await linksService.deleteLink(linkId, userId);

      res.status(200).json({
        success: true,
        message: "Links delete successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async trackLinkClick(req, res) {
    try {
      const { id } = req.params;
      const result = await linksService.trackClick(id);
      res.status(200).json({
        success: true,
        message: "Links click successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getPublicProfile(req, res) {
    try {
      const username = req.params.username;
      const result = await linksService.getPublicProfile(username);
      res.status(200).json({
        success: true,
        message: "Profile click successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new LinkController();
