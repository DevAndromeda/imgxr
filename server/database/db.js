const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize
    .authenticate()
    .then(() => console.log("Connected to the database"))
    .catch((err) => {
        console.log(`Database Connection Error:\n\n${err}`);
        process.exit(1);
    });

module.exports = {
    sequelize,
    User: require("./schema/User")(sequelize),
    Post: require("./schema/Post")(sequelize)
};
