const express = require('express');
const app = express();


app.listen(9090);

console.log('Listening on port 9090...');
//Code
app.use(express.json());

var lastId = 7;
var juegos = [
    { id: 1, name: "Spiderman", consolas: ["PS2", "PS3", "PS4"], comentario: ["Sin jugarlo."] },
    { id: 2, name: "God of War", consolas: ["PS3", "PS4", "PSVita"], comentario: ["Muy buen juego."] },
    { id: 3, name: "Pokemon", consolas: ["Game Boy Color", "Game Boy Advance", "Nintendo Game Cube", "Nintendo Wii"], comentario: ["Buenos Juegos"] },
    { id: 4, name: "Sonic", consolas: ["Sega", "Nintendo(s)"], comentario: ["Infancia pura"] },
    { id: 5, name: "Mario Sunshine", consolas: ["Nintendo Game Cube"], comentario: ["El mejor de Mario"] },
    { id: 6, name: "Age of Empires 2", consolas: ["PC"], comentario: ["Un clasico"] },
    { id: 7, name: "Mario Kart", consolas: ["Todas las consolas de Nintendo despues del NES"], comentario: ["Pierde Amigos"] }
];

app.get('/api/juegos', (req, res) => {
    res.status(200).send(juegos);
}
);
app.get('/api/juegos/:id', (req, res) => {
    const juego = juegos.find(j => j.id === parseInt(req.params.id));
    if (!juego) {
        req.status(404).send('Juego no encontrado.');
        return;
    }
    res.status(200).send(juego);
}
);

app.post('/api/juegos', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Debe ingresar name');
        return;
    }
    if (!req.body.consolas) {
        res.status(400).send('Debe ingresar consolas');
        return;
    }
    if (!req.body.comentario) {
        res.status(400).send('Debe ingresar comentario');
        return;
    }

    lastId++;
    const juego =
    {
        id: lastId,
        name: req.body.name,
        consolas: req.body.consolas,
        comentario: req.body.comentario
    };
    juegos.push(juego);
    res.status(201).send(juegos);
}
);

app.put('/api/juegos/:id', (req, res) => {
    const juego = juegos.find(j => j.id === parseInt(req.params.id));
    if (!juego) {
        req.status(404).send('Juego no encontrado.');
        return;
    }
    if (!req.body.name) {
        res.status(400).send('Debe ingresar name');
        return;
    }
    if (!req.body.consolas) {
        res.status(400).send('Debe ingresar consolas');
        return;
    }
    if (!req.body.comentario) {
        res.status(400).send('Debe ingresar comentario');
        return;
    }

    juego.name = req.body.name;
    juego.consolas = req.body.consolas;
    juego.comentario = req.body.comentario;
    res.status(204).send(juego);
}
);

app.delete('/api/juegos/:id', (req, res) => {
    const juego = juegos.find(j => j.id === parseInt(req.params.id));
    if (!juego) {
        req.status(404).send('Juego no encontrado.');
        return;
    }
    const index = juegos.indexOf(juego);
    juegos.splice(index, 1);
    res.status(204).send(juegos);
}
);