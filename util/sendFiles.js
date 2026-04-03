const cloudinary = require("cloudinary").v2;

const sendFiles = async (img) => {
  console.log("Uploading image to Cloudinary:", img.path);
  const result = await cloudinary.uploader.upload(img.path, {
    folder: "gift-squad/gifts",
  });
  console.log("Cloudinary upload done:", result.secure_url);
  image_url = result.secure_url;

  return image_url;
};

module.exports = sendFiles;
