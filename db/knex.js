const knex = require("knex");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "basa.db"
    }
});

module.exports = connectedKnex;