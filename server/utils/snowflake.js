const Snowflake = require("snowflake-util");
const snowflake = new Snowflake({
    epoch: new Date(2021, 0, 1)
});

module.exports.createSnowflake = () => {
    return snowflake.generate();
};

module.exports.getInfo = (id) => {
    return snowflake.deconstruct(id);
};
