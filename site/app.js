const express = require("express");

const app = express();

app.use(express.static(__dirname))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html")
 });

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/home.html")
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
});

app.get("/producto", (req, res) => {
    res.sendFile(__dirname + "/producto.html")
});

app.get("/sobre_nosotros", (req, res) => {
    res.sendFile(__dirname + "/sobre_nosotros.html")
});

app.get("/faq", (req, res) => {
    res.sendFile(__dirname + "/faq.html")
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/error.html")
});

app.listen(3000, () => console.log("Servidor corriendo"))
