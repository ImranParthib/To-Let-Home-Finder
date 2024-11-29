const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
require('dotenv').config(); // Load environment variables

app.use(express.json());
app.use(cors());

// Serve static files from the images directory inside the frontend folder
app.use('/images', express.static('/images')); // Serve images from this directory

// MongoDB connection
const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Importing schema
require("./imageDetails");
const Images = mongoose.model("ImageDetails");

app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Ensure this path is correct
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.array("images", 2), async (req, res) => {
  console.log(req.body);
  const imageNames = req.files.map(file => file.filename);

  try {
    await Images.create({ images: imageNames });
    res.json({ status: "ok", imageNames });
  } catch (error) {
    console.error("Error saving images to database:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.error("Error fetching images from database:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});