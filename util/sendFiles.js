const cloudinary = require("cloudinary").v2;

const sendFiles = async (img) => {
  const result = await cloudinary.uploader.upload(img.path, {
    folder: "gift-squad/gifts",
  });
  image_url = result.secure_url;

  return image_url;
};

module.exports = sendFiles;
