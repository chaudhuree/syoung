const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactUs");

// create contact us
const postContactUs = async (req, res) => {
  try {
    const { name, phone, address, zip, picture, message } = req.body;
    
    // Create and save contact form data
    const contactUs = new ContactUs({
      name,
      phone,
      address,
      zip,
      picture,
      message,
    });
    await contactUs.save();

    // Send email notification
    // try {
    //   await sendContactFormEmail({
    //     name,
    //     phone,
    //     address,
    //     zip,
    //     picture,
    //     message
    //   });
    //   console.log("Contact form email sent successfully");
    // } catch (emailError) {
    //   console.error("Failed to send contact form email:", emailError);
    //   // Continue with the response even if email fails
    // }

    res.status(201).send({ 
      success: true, 
      message: "Contact form submitted successfully", 
      data: contactUs 
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).send({ 
      success: false, 
      message: "Failed to submit contact form", 
      error: error.message 
    });
  }
};

// Get all contact us submissions
const getContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUs.find().sort({ createdAt: -1 });
    res.status(200).send({ 
      success: true, 
      message: "Contact form submissions retrieved successfully", 
      data: contactUs 
    });
  } catch (error) {
    console.error("Error retrieving contact submissions:", error);
    res.status(500).send({ 
      success: false, 
      message: "Failed to retrieve contact submissions", 
      error: error.message 
    });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const contactUs = await ContactUs.findById(req.params.id);
    if (!contactUs) {
      return res.status(404).send({ 
        success: false, 
        message: "Contact submission not found" 
      });
    }
    res.status(200).send({ 
      success: true, 
      message: "Contact submission retrieved successfully", 
      data: contactUs 
    });
  } catch (error) {
    console.error("Error retrieving contact submission:", error);
    res.status(500).send({ 
      success: false, 
      message: "Failed to retrieve contact submission", 
      error: error.message 
    });
  }
};

// Routes
router.post("/", postContactUs);
router.get("/", getContactUs);
router.get("/:id", getContactById);

module.exports = router;
