import multer from "multer";
const upload = multer({
    storage:multer.memoryStorage(),
});
export default upload;

// import multer from 'multer';

// // Set file size limit (e.g., 10MB)
// const MAX_SIZE = 10 * 1024 * 1024;

// // Define file storage
// const storage = multer.memoryStorage();

// // Filter for allowed file types (images and videos)
// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png|gif|mp4|mkv|mov/;
//   const extname = fileTypes.test(file.originalname.toLowerCase());
//   const mimeType = fileTypes.test(file.mimetype);
  
//   if (extname && mimeType) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only images and videos are allowed.'));
//   }
// };

// // Initialize multer with the above settings
// const upload = multer({
//   storage,
//   limits: { fileSize: MAX_SIZE },
//   fileFilter,
// });

// export default upload;


