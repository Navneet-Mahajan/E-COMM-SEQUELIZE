const { sequelize } = require('./connect-db');
const { initModels } = require('./models/init-models');

module.exports = {
    models: initModels(sequelize)
}