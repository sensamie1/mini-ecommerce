module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
                dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Needed for NeonDB SSL
            },
        },
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Needed for NeonDB SSL
            },
        },
    },
    production: {
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        dialect: "postgres",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Needed for NeonDB SSL
            },
        },
    }
}