const jwt = require("../utils/jwt");
const { User } = require("../../database/db");

module.exports = async (req, res, next) => {
    const token = req.headers["Authorization"] || req.headers["authorization"];
    if (!token || !token.startsWith("Bearer ")) return res.status(403).json({ error: "missing authorization header" });
    const verified = await jwt.verify(token.replace("Bearer ", ""));
    if (!verified) return res.status(403).json({ error: "invalid token" });
    const findUser = await User.findOne({
        where: {
            email: verified.email
        }
    });
    if (!findUser) return res.status(403).json({ error: "invalid token" });
    req.userData = verified;
    return next();
};
