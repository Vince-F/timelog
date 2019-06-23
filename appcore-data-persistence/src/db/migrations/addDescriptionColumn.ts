import sequelize = require("sequelize");

module.exports = {
    up: (queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return queryInterface.addColumn("tasks", "description", {
                type: sequelize.TEXT
            }, {transaction: t});
        });
    },
    down: (queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return queryInterface.removeColumn("tasks", "description");
        });
    }
};