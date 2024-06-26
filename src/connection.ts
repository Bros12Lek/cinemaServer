import knex, { Knex } from "knex";

const dbConnection:Knex = knex({
    client: 'sqlite3',
    connection: {
     filename: "../database.sqlite"
    },
    useNullAsDefault:true
})

export default dbConnection;