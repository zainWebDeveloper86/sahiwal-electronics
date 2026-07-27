import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    // make stream to upload on Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder, // e.g., "sahiwal-electronics/users"
        resource_type: "auto", // auto-detect image/video
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // convert Buffer into stream and sent it onto Cloudinary
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;