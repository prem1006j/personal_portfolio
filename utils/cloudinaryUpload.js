const cloudinary = require("../config/cloudinary");

/**
 * Uploads a Buffer (e.g. req.file.buffer from multer memoryStorage)
 * to Cloudinary and resolves with the upload result.
 */
function uploadBufferToCloudinary(buffer, folder = "portfolio_projects") {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        stream.end(buffer);

    });

}

module.exports = uploadBufferToCloudinary;