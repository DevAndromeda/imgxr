const jwt = require("jsonwebtoken");

module.exports.sign = (payload) => {
    return new Promise((resolve) => {
        jwt.sign(
            payload,
            process.env.SESSION_SECRET,
            {
                expiresIn: "24h"
            },
            (err, enc) => {
                if (err) return resolve(null);
                resolve(enc);
            }
        );
    });
};

module.exports.verify = (token) => {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.SESSION_SECRET, (err, data) => {
            if (err) return resolve(false);
            resolve(data);
        });
    });
};
