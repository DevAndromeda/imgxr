const router = require("express").Router();
const { User } = require("../database/db");
const checkAuth = require("./middlewares/checkAuth");
const bcrypt = require("bcrypt");
const mime = require("mime-types");
const fs = require("fs");
const jwt = require("./utils/jwt");

router.get("/me", checkAuth, async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.userData.email
        }
    });
    if (user) return res.json(req.userData);
    return res.status(401).json({ error: "unauthorized" });
});

router.post("/login", async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    for (const prop of Object.values(user)) {
        if (!prop) return res.status(400).json({ error: "bad request" });
    }

    const data = await User.findOne({
        where: {
            email: `${user.email}`
        }
    });

    if (!data) return res.status(403).json({ error: "user with that email not found" });

    const passValid = await bcrypt.compare(user.password, data.getDataValue("password"));

    if (!passValid) return res.status(403).json({ error: "invalid password" });

    const finalUser = {
        username: data.getDataValue("username"),
        email: data.getDataValue("email"),
        id: data.getDataValue("id"),
        avatar: data.getDataValue("avatar")
    };

    const token = await jwt.sign(finalUser);

    return res.json({
        user: finalUser,
        jwt: token
    });
});

router.post("/signup", async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.files?.avatar || null
    };

    for (const [key, prop] of Object.entries(user)) {
        if (!prop && key !== "avatar") return res.status(400).json({ error: "bad request" });
    }

    if (user.avatar !== null && !["image/png", "image/jpg", "image/jpeg"].includes(user.avatar.mimetype)) {
        return res.status(400).json({ error: `unsupported avatar format "${user.avatar.mimetype}", only jpeg or png allowed` });
    }

    const data = await User.findOne({
        where: {
            email: `${user.email}`
        }
    });

    if (data) return res.status(403).json({ error: "user already exists with that email address" });

    const hash = await bcrypt.hash(user.password, 10);

    const newUser = await User.create({
        username: user.username,
        email: user.email,
        avatar: user.avatar ? `${user.avatar.md5}.${mime.extension(user.avatar.mimetype) || "png"}` : null,
        password: hash
    });

    const finalUser = {
        username: newUser.getDataValue("username"),
        email: newUser.getDataValue("email"),
        avatar: newUser.getDataValue("avatar"),
        id: newUser.getDataValue("id")
    };

    if (user.avatar)
        fs.mkdir(`${__dirname}/../data/avatars/${finalUser.id}`, (err) => {
            if (err) return;
            fs.writeFile(`${__dirname}/../data/avatars/${finalUser.id}/${finalUser.avatar}`, user.avatar.data, () => {});
        });

    const token = await jwt.sign(finalUser);

    return res.json({
        user: finalUser,
        jwt: token
    });
});

module.exports = router;
