import { success } from "zod";
import linksService from "./links.service.js";

class LinkController {
   async createLink (req, res) {
    try {
        const userId = req.user._id;
        const link = await linksService.createLink(userId , req.body)

        res.status(201).json({
            success : true,
            message : "Link created succesfully",
            data : link
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            Meassage : error.meassage
        })
    }
   }
}

export default new LinkController