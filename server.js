const express = require('express');
const app = express();
const port = 3000;


// Gerador do Site
app.use(express.json());
let romances = [
    {id: 1, nome: "The Fragrant Flower Blooms with Dignity", numDeEps: 13, genero:'Slice of life', tipo:"anime"},
    {id: 2, nome: "Call of The Night", numDeEps: 26, genero:'Sobrenatural', tipo:"anime"},
    {id: 3, nome: "Anne With E", numDeEps: 40, genero:'Ficção Histórica', tipo:"serie"}
];

//Mostrar a primeiro romance da Lista

app.get('/romances/primeiro', (req, res) => {
    if (romances.length > 0) {
        res.json(romances[0]);
    } else {
        res.status(404).json({ error: 'conteudo não encontrado.'});
    }
});

//Mostrar ultimo romance da lista

app.get('/romances/ultimo', (req, res) => {
    if (romances.length > 0) {
        res.json(romances[romances.length -1]);
    } else {
        res.status(404).json({ error: 'Romance não encontrado.'});
    }
});
app.get('/romances', (req, res) =>{
    res.send(romances)
});


// Buscar Específico
app.get('/romances/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const romance = romances.find(p => p.id === id);
    if (romance) {
        res.json(romance)
    }
    else{
        res.status(404).json({erro:'romance não encontrada'})
    }
})


// Postar novo:
app.post('/romances', (req,res) =>{
    const nome = req.body.nome;
    const numDeEps = req.body.numDeEps;
    const genero = req.body.genero;
    const tipo = req.body.tipo
    const novoromance = {
        id: romances.length + 1,
        nome: nome,
        numDeEps: numDeEps,
        genero:genero,
        tipo:tipo
    }

    romances.push(novoromance)
    res.status(201).json(novoromance)
});

// ATUALIZAR:
app.put('/romances/:id', (req,res) => {
        const id = parseInt(req.params.id);
        const nome = req.body.nome;
        const numDeEps = req.body.numDeEps;
        const genero = req.body.genero;
        const tipo = req.body.tipo
        const romance = romances.find(p => p.id === id);
        if (romance) {
            romance.nome = nome;
            romance.numDeEps = numDeEps;
            romance.genero = genero;
            romance.tipo = tipo;
            res.json(romance);
        }
        else{
            res.status(404).json({erro:'romance não encontrada'})
        }
});

// DELETAR
app.delete('/romances/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = romances.findIndex(i => i.id === id)
    if(index !== -1){
        const romancesDeletada = romances.splice(index, 1);
        res.json(romancesDeletada[0]);
    }
})

// FILTROS:
// Por tipo:
app.get('/romances/tipo/:tipo', (req, res) => {
    let pelotipo = [];
    for(let i = 0; i < romances.length; i++){
        const tipo = req.params.tipo;
        const romance = romances[i];
        if((romance.tipo).toUpperCase() === tipo.toUpperCase()){
            pelotipo.push(romance)
        }
    }
    res.send(pelotipo)
})
//  por genero:
app.get('/romances/genero/:genero', (req, res) => {
    let pelogenero = [];
    for(let i = 0; i < romances.length; i++){
        const genero = req.params.genero;
        const romance = romances[i];
        if((romance.genero).toUpperCase() === genero.toUpperCase()){
            pelogenero.push(romance)
        }
    }
    res.send(pelogenero)
})
// POR Minimos de EPs:
app.get('/romances/epsMinimos/:num', (req, res) => {
    let pelonumero = [];
    for(let i = 0; i < romances.length; i++){
        const num = req.params.num;
        const romance = romances[i];
        if((romance.numDeEps) >= num){
            pelonumero.push(romance)
        }
    }
    res.send(pelonumero)
})
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/romances`);
})

// POR Maximos de EPs:
app.get('/romances/epsMaximos/:num', (req, res) => {
    let pelonumero = [];
    for(let i = 0; i < romances.length; i++){
        const num = req.params.num;
        const romance = romances[i];
        if((romance.numDeEps) <= num){
            pelonumero.push(romance)
        }
    }
    res.send(pelonumero)
})
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/romances`);
})

