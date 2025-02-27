const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// create review
const postReview = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    const review = new Review({
      name,
      email,
      rating,
      message,
    });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get all reviews with pagiantion
const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const totalReviews = await Review.countDocuments();
    const reviews = await Review.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).send({
      reviews,
      page: Number(page),
      limit: Number(limit),
      totalReviews,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Routes
router.post("/", postReview);
router.get("/", getReviews);

module.exports = router;
