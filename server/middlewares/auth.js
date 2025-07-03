const jwt = require("jsonwebtoken");
const {USER_JWT_SECRET_TOKEN, ADMIN_JWT_SECRET_TOKEN} = require("../config")
async function authenticateUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) res.status(403).json({ message: "Invalid token" });
        const decoded = await jwt.verify(token, USER_JWT_SECRET_TOKEN);
        if (decoded) {
            req.user = { id: decoded.id, firstname: decoded.firstname };
            next()
        } else {
            res.status(403).json({
                message: "Need to signIn"
            });
        }
    } catch (err) {
        next(err)
    }
}
async function authenticateAdmin(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, ADMIN_JWT_SECRET_TOKEN);
        if (decoded) {
            req.user = { id: decoded.id, firstname: decoded.firstname };
            next()
        } else {
            res.status(403).json({
                message: "Need to signIn"
            });
        }
    }catch(err){next(err)}
}

module.exports = { authenticateUser, authenticateAdmin };