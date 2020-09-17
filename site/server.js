const express = require("express");

const app = express();

app.use(express.static(__dirname + '/public'))

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html")
//  });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/preindex.html")
});


app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
});

app.get("/registro", (req, res) => {
    res.sendFile(__dirname + "/registro.html")
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
app.get("/carrito", (req, res) => {
    res.sendFile(__dirname + "/carrito.html")
});

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/admin_db.html")
});

app.get("/sumar", (req, res) => {
    res.sendFile(__dirname + "/sumar_producto.html")
});

app.get("/modificar", (req, res) => {
    res.sendFile(__dirname + "/modif_producto.html")
});


app.get("*", (req, res) => {
    res.sendFile(__dirname + "/error.html")
});

// app.listen(3000, () => console.log("Servidor corriendo"))

app.listen(process.env.PORT || 5000)