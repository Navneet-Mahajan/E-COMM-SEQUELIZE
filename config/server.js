module.exports = {
	database: {
		name: process.env.DATABASE_NAME,
		user: process.env.DATABASE_USER,
		pass: process.env.DATABASE_PASS,
		dialect: process.env.DATABASE_DIALECT,
		host: process.env.DATABASE_HOST
	},
}