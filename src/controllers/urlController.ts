import { Request, Response } from "express";
import { CounterModel } from "../models/counterModel";
import { generateKey } from "../lib/generateKey";
import { UrlModel } from "../models/urlModel";

export const shortenController = async (req: Request, res: Response) => {
  try {
    // Here you would typically handle the logic for shortening a URL

    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        error: "Original URL is required",
      });
    }
    const count = await CounterModel.countDocuments();
    const counter = new CounterModel({ val: count + 1 });
    await counter.save();

    const shortenUrlKey = generateKey(counter.val);

    const newUrl = await UrlModel.create({
      originalUrl,
      shortUrl: `${process.env.backendURL}/${shortenUrlKey}`,
    });
    await newUrl.save();
    return res.status(201).json({
      success: true,
      message: "URL shortened successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortUrl: newUrl.shortUrl,
      },
    });
  } catch (error) {
    console.error("Error in shortenController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchUrlController = async (req: Request, res: Response) => {
    try{
        const { shortUrlKey } = req.body;

        if (!shortUrlKey) {
            return res.status(400).json({
                success: false,
                error: "Short URL key is required",
            });
        }

        const urlData = await UrlModel.findOne({ shortUrl: shortUrlKey });
        if (!urlData) {
            return res.status(404).json({
                success: false,
                error: "URL not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                originalUrl: urlData.originalUrl,
                shortUrl: urlData.shortUrl,
            }
        });
    }catch(error){
        console.error("Error in fetchUrlController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
