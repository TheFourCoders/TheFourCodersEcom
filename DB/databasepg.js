
const { Client } = require('pg')

const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    port: process.env.POSTGRESQL_PORT,
    password: process.env.POSTGRESQL_PASSWORD,
    database: "ecommerce"
})

const connection = client.connect();
if(connection) {
    console.log('Database is online')
}else { 
    console.log('Could  not connect to DB')
}

module.exports = { client }