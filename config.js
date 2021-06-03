const initOptions = {
    connect(client, dc, useCount){
        const cp = client.connectionParameters;
        console.log("Success! Your are now connected to the dataase!", cp.database);
    },

    query(e){
        console.log("QUERY:", e.query);
    },
};
const pg = require("pg-promise")(initOptions);

const connection = {
    host: "localhost",
    port: 5432, //default port
    database: "sports_player",
    user: "pg-users",
    password: "root",
};
const dbCOnnection = pg(connection);

module.exports = dbConnection;