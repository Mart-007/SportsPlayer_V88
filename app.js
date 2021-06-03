const express = require('express');
const app = express();
const session = require('express-session');

app.use(
    session({
        secret: "Keimoto",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 600000 },
    })
);

app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set("view engine", "ejs");

require("./routes.js")(app);


app.listen(7000, () => {
    console.log("Server running on port 7000");
})