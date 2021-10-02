const checkAuth = require("./middlewares/checkAuth");
const router = require("express").Router();
const mime = require("mime-types");
const fs = require("fs/promises");
const { Post, User } = require("../database/db");
const crypto = require("crypto");

router.get("/", async (req, res) => {
    const images = await Post.findAll();
    const data = await Promise.all(
        images.map(async m => {
            const author = await User.findOne({
                where: {
                    id: m.getDataValue("author")
                }
            });

            const data = {
                id: m.getDataValue("id"),
                name: m.getDataValue("value"),
                author: {
                    id: author?.id ?? "0",
                    username: author?.username ?? "Ghost",
                    avatar: author?.avatar ?? null
                }
            };

            return data;
        })
    );

    return res.json(data);
});

router.post("/", checkAuth, async (req, res) => {
    const data = req.files?.image;

    if (!data) return res.status(400).json({ error: "bad request" });

    if (!["image/png", "image/jpeg", "image/jpg"].includes(data.mimetype)) {
        return res.status(400).json({ error: `unsupported mime type "${data.mimetype}"` });
    }

    const fileName = `${crypto.randomBytes(6).toString("hex")}_${data.md5}.${mime.extension(data.mimetype || "png")}`;
    const filePath = `${__dirname}/../data/images/${fileName}`;

    console.log(fileName);

    const newPost = await Post.create({
        value: fileName,
        author: req.userData.id
    });
    
    await fs.writeFile(filePath, data.data);

    return res.json({
        id: newPost.getDataValue("id"),
        name: newPost.getDataValue("value"),
        author: {
            id: req.userData.id,
            username: req.userData.username,
            avatar: req.userData.avatar
        }
    });
});

module.exports = router;