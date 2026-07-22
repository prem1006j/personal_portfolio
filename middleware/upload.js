const multer = require("multer");

// We upload straight to Cloudinary ourselves (see utils/cloudinaryUpload.js)
// instead of using multer-storage-cloudinary: that package is unmaintained
// and pins to the vulnerable cloudinary v1.x line (GHSA-g4mf-96x5-5m2c),
// so it can't be used together with a patched cloudinary v2 install.
// Storing the file in memory here keeps it simple for single-image uploads.

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB — prevents unbounded upload DoS
    },

    fileFilter: (req, file, cb) => {

        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new Error("Only JPG and PNG images are allowed"));
        }

        cb(null, true);

    }

});


module.exports = upload;