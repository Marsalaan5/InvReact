import multer from 'multer';

// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Specify the upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Set the filename
  }
});

const upload = multer({ storage: storage });

// Now export upload as a middleware to be used in your routes
export { upload };