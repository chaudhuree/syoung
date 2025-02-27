const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const contactUsRouter = require("./routes/contactUs");
const reviewRouter = require("./routes/review");

// env
dotenv.config();

const app = express();
// cors
app.use(cors(
    {
        origin: ["http://localhost:3000","https://syoung.vercel.app"],
    }
));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(morgan("combined"));

const PORT = process.env.PORT || 5001;

// Validate MongoDB URI
if (!process.env.MONGO_URI) {
   console.log('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
}

// Async function to connect to MongoDB with improved error handling
let isConnected = false;
const connectToDatabase = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB');
        isConnected = true;
    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

// routes
app.use("/api/v1/contact", contactUsRouter);
app.use("/api/v1/review", reviewRouter);

// Start server with graceful shutdown
const startServer = async () => {
    try {
        // Connect to database first
        await connectToDatabase();
        
        // Add routes
        app.get('/', (req, res) => {
            res.send('Server is running');
        });

        // Import route files
        const contactUsRoutes = require('./routes/contactUs');

        // Use routes
        app.use('/api/contact-us', contactUsRoutes);

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error('Express error:', err);
            res.status(500).send('Something broke!');
        });

        // Handle uncaught exceptions
        process.on('uncaughtException', (err) => {
            console.error('Uncaught exception:', err);
            process.exit(1);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            process.exit(1);
        });

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Graceful shutdown handlers
        const gracefulShutdown = (signal) => {
            console.log(`Received ${signal}. Shutting down gracefully...`);
            server.close(() => {
                mongoose.connection.close(false, () => {
                    console.log('MongoDB connection closed');
                    process.exit(0);
                });
            });
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();
