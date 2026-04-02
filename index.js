const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary config:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET ? "secret loaded" : "SECRET MISSING");

const app = express();
app.use(express.json());
app.use(cors());

const errorHandler = require("./middlewares/errorHandler");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "Gift Squad API running 🎅" });
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

const eventRoutes = require("./routes/event");
app.use(eventRoutes);

const giftRoutes = require("./routes/gift");
app.use(giftRoutes);

const invitationRoutes = require("./routes/invitation");
app.use(invitationRoutes);

const contributionRoutes = require("./routes/contribution");
app.use(contributionRoutes);

app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + (process.env.PORT || 3000));
});
