const Sequelize = require("sequelize");
const snowflake = require("../../utils/snowflake");

/**
 * @param {Sequelize.Sequelize} sequelize
 */
module.exports = (sequelize) => {
    const User = sequelize.define(
        "Users",
        {
            id: {
                type: Sequelize.DataTypes.STRING,
                defaultValue: snowflake.createSnowflake,
                primaryKey: true
            },
            username: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true
        }
    );

    return User;
};
