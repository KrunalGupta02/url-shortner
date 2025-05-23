import { getUser } from "../service/auth.js";


function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;

    // initially
    req.user = null;

    if (!tokenCookie) {
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

// Admin, normal 
function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')

        if (!roles.includes(req.user.role)) return res.end('Unauthorized');

        next();
    }
}

export { checkForAuthentication, restrictTo };