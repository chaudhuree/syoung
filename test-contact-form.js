const axios = require('axios');

// Test data for contact form submission
const testData = {
  name: "John Doe",
  phone: "123-456-7890",
  address: "123 Main Street, Anytown",
  zip: "12345",
  picture: [
    "https://via.placeholder.com/150x150/BE8A38/FFFFFF?text=Test+Image+1",
    "https://via.placeholder.com/150x150/BE8A38/FFFFFF?text=Test+Image+2"
  ],
  message: "This is a test message from the contact form. Please ignore this submission."
};

// Function to submit test data
async function submitContactForm() {
  try {
    console.log('Submitting test contact form data...');
    const response = await axios.post('http://localhost:5001/api/contact-us', testData);
    console.log('Response:', response.data);
    console.log('Contact form submitted successfully!');
  } catch (error) {
    console.error('Error submitting contact form:', error.response ? error.response.data : error.message);
  }
}

// Execute the test
submitContactForm();
