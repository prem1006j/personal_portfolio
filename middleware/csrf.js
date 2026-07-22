const crypto = require("crypto");

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];

// Generates (once per session) and exposes a CSRF token to every view
// via res.locals.csrfToken, so forms can include it as a hidden field.
module.exports.attachCsrfToken = (req, res, next) => {

    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString("hex");
    }

    res.locals.csrfToken = req.session.csrfToken;

    next();

};

// Rejects any state-changing request whose _csrf field/header doesn't
// match the token stored in the user's session.
module.exports.verifyCsrfToken = (req, res, next) => {

    if (SAFE_METHODS.includes(req.method)) {
        return next();
    }

    const tokenFromRequest = req.body._csrf || req.headers["x-csrf-token"];
    const tokenFromSession = req.session.csrfToken;

    const isValid =
        tokenFromRequest &&
        tokenFromSession &&
        tokenFromRequest.length === tokenFromSession.length &&
        crypto.timingSafeEqual(
            Buffer.from(tokenFromRequest),
            Buffer.from(tokenFromSession)
        );

    if (!isValid) {
        return res.status(403).send("Invalid or missing CSRF token");
    }

    next();

};