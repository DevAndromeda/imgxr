const Sequelize = require("sequelize");
const snowflake = require("../../utils/snowflake");

/**
 * @param {Sequelize.Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const Post = sequelize.define(
        "Posts",
        {
            id: {
                type: Sequelize.DataTypes.STRING,
                defaultValue: snowflake.createSnowflake,
                primaryKey: true
            },
            value: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true
        }
    );

    return Post;
};
