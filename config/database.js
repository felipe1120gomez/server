module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST", "mysql-felipeag.alwaysdata.net"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "felipeag_server"),
      user: env("DATABASE_USERNAME", "felipeag"),
      password: env("DATABASE_PASSWORD", "feGFa9zGgk2KT"),
      ssl: env.bool("DATABASE_SSL", true),
    },
  },
});
