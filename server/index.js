require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const db = require("./database/db");
const cors = require("cors");
const helmet = require("helmet");

db.sequelize.sync();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(`${__dirname}/data`));

app.get("/", (_req, res) => {
    res.json({ message: "Hello World" });
});

app.use("/authorize", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.all("*", (_req, res) => res.status(404).json({ error: "path not found" }));

app.use((error, _req, res, _next) => {
    res.status(500).json({ error: "internal server error", message: error.message || `${error}` });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on PORT *${process.env.PORT || 5000}`);
});
