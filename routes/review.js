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
    const reviewResponse = {
      success: true,
      message: "Review created successfully",
      data: review,
    };
    res.status(201).send(reviewResponse);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

// get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Reviews retrieved successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve reviews",
      error: error.message,
    });
  }
};

// Routes
router.post("/", postReview);
router.get("/", getReviews);

module.exports = router;
