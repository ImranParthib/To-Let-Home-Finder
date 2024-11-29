const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the images directory
app.use('/images', express.static('../frontend/src/images')); // Correct path to serve images

// MongoDB connection
const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Importing schemas
require("./imageDetails"); // Ensure this file exists
const Listing = mongoose.model("Listing");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/images/'); // Correct path to save images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname); // Add a unique suffix to avoid filename conflicts
  },
});

const upload = multer({ storage: storage });

// Upload listing endpoint
app.post("/upload-listing", upload.array("images", 2), async (req, res) => {
  const { title, location, price, description, bedrooms, bathrooms, amenities } = req.body;
  const imageNames = req.files.map((file) => file.filename);

  try {
    const newListing = {
      title,
      location,
      price,
      description,
      bedrooms,
      bathrooms,
      amenities: JSON.parse(amenities), // Parse the amenities back to an array
      images: imageNames,
    };

    await Listing.create(newListing); // Save the new listing to the database
    res.json({ status: "ok", newListing });
  } catch (error) {
    console.error("Error saving listing to database:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
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
    await Listing.findByIdAndDelete(id); // Delete the listing by ID
    res.json({ status: "ok", message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});