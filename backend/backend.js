const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the images directory
app.use('/images', express.static('../frontend/src/images'));

// MongoDB connection
const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Importing schemas
require("./imageDetails");
require("./user");
const Listing = mongoose.model("Listing");
const User = mongoose.model("User");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Update the authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: "error",
        message: "No authorization token provided"
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Invalid authorization token"
      });
    }

    // Find user by token (which is the user ID in this case)
    const user = await User.findById(token);
    
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found"
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      status: "error",
      message: "Authentication failed"
    });
  }
};

// User Registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        status: "error", 
        message: "Username already exists" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ 
      status: "ok", 
      message: "User registered successfully" 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      status: "error", 
      message: "Internal Server Error" 
    });
  }
});

// Update the login endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials"
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials"
      });
    }

    // Send user data and token (using user._id as token)
    res.json({
      status: "ok",
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
      },
      token: user._id.toString() // Convert ObjectId to string
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
});

// Update the upload endpoint
app.post("/upload-listing", authenticateUser, upload.array("images", 2), async (req, res) => {
  try {
    const { title, location, price, description, bedrooms, bathrooms, amenities } = req.body;
    const imageNames = req.files.map((file) => file.filename);

    const newListing = {
      title,
      location,
      price,
      description,
      bedrooms,
      bathrooms,
      amenities: JSON.parse(amenities),
      images: imageNames,
      userId: req.user._id // Add the user ID to the listing
    };

    const listing = await Listing.create(newListing);
    res.json({ status: "ok", newListing: listing });
  } catch (error) {
    console.error("Error saving listing to database:", error);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to upload listing" 
    });
  }
});

// Get listings endpoint
app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json({ status: "ok", data: listings });
  } catch (error) {
    console.error("Error fetching listings from database:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Delete listing endpoint
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Listing.findByIdAndDelete(id);
    res.json({ status: "ok", message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});