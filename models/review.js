const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(v);
            },
            message: "Please enter a valid email address"
        }
        
    },
    rating: {
        type: Number,
        required: true,
        max: 5
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Review", reviewSchema);