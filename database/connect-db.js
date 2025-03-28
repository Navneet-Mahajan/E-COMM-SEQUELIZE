const Sequelize = require('sequelize');

const { database } = require('../config/server');

const sequelize = new Sequelize(database.name, database.user, database.pass, {
	host: database.host,
	dialect: database.dialect,
	logging: false
});

const initializeDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connected to MYSQL database');
	} catch (err) {
		console.log('Unable to connect to the database:', err);
		process.exit(-1);
	}
};

module.exports = {
	initializeDatabase,
	sequelize
}