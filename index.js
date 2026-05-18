const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let cadastro = [];

let jogadores_vacuo = {}

///////////////////////////////
//// GAME ONLINE
///////////////////////////////

app.post("/pos", (req,res)=>{

const {id,x,y,sprite,dir,msg} = req.body

jogadores_vacuo[id] = {
x,y,sprite,dir,msg,
tempo:Date.now()
}

res.json({ok:true})

})

app.get("/players",(req,res)=>{

res.json(jogadores_vacuo)

})
//////////poos_julio
let pos_julio=[];
app.post("/julio", (req, res) => {

const { nome} = req.body;

if (!nome) {
return res.status(400).json({
erro: "Nome e senha obrigatórios"
});
}

const posJ = {nome};

pos_julio.push(posJ);

res.status(201).json({
mensagem: "Usuário encontrado!",
usuario:posJ
});

});
///////////////////////////////////////




///////////////////////////////
//// CADASTRO
///////////////////////////////

app.get("/", (req, res) => {
res.send("API do Julio _ _ (J) _ _funcionando 🚀");
});

app.get("/cadastro", (req, res) => {
res.json(cadastro);
});

app.post("/cadastro", (req, res) => {

const { nome, senha } = req.body;

if (!nome || !senha) {
return res.status(400).json({
erro: "Nome e senha obrigatórios"
});
}

const existe = cadastro.find(
u => u.nome === nome
);

if (existe) {
return res.status(400).json({
erro: "Usuário já existe"
});
}

const novo = { nome, senha };

cadastro.push(novo);

res.status(201).json({
mensagem: "Usuário cadastrado!",
usuario: novo
});

});

app.listen(PORT, () => {
console.log(
`Servidor rodando em http://localhost:${PORT}`
);
});
