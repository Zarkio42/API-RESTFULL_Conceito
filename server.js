const express = require('express');
const app = express();
const data = require("./data.json");
const { json } = require('express/lib/response');

app.use(express.json());

// Verbos http (GET, POST, PUT, DELETE)

// Lista de usuarios fake para o data https://jsonplaceholder.typicode.com/users

app.get("/clients", function (req, res) {
    res.json(data)
});

app.get("/clients/:id", function (req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(400).json();

    res.json(client);
})

app.post("/clients", function (req, res) {
    const { name, email } = req.body;

    //salvar
    res.json({ name, email })
})

app.put("/clients/:id", function (req, res) { 
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(400).json();

    const { name } = req.body;

    client.name = name;

    res.json(client);

})

app.delete("/clients/:id", function (req, res) { 
    const { id } = req.params;
    const clientFiltered = data.filter(c => c.id != id);

    res.json(clientFiltered);

})

app.listen(3000, function () {
    console.log("Server is running")
});