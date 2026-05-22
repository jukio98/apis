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

const { nome, localizacao } = req.body;

const posJ = {
nome,
localizacao
};

pos_julio.push(posJ);

res.json({
ok:true,
dados:posJ
})

})

app.get("/julio",(req,res)=>{

res.json(pos_julio)

})
///////////////////////////////////////

//////////mens_sivas
let mens_silvas=[];
let mens={};
app.post("/mens_silvas", (req, res) => {

const {usuario,mensagem } = req.body;

const mens = {
usuario,
mensagem
};

mens_silvas.push(mens);

res.json({
ok:true,
dados:mens
})

})

app.get("/mens_silvas",(req,res)=>{

res.json(mens_silvas)

})



//////////ONLINE_MENS_SILVAS///
let online_mens = {};

///////////////////////////////////////
//// ONLINE_MENS_SILVAS
///////////////////////////////////////

app.post("/online_mens_silvas",(req,res)=>{

const {usuario} = req.body;

online_mens[usuario] = Date.now();

res.json({
ok:true
});

});

//////////////////////////////////////////////////
// GET ONLINE
//////////////////////////////////////////////////

app.get("/online_mens_silvas",(req,res)=>{

let agora = Date.now();

//////////////////////////////////////////////////
// REMOVE INATIVOS
//////////////////////////////////////////////////

for(let nome in online_mens){

if(agora - online_mens[nome] > 10000){

delete online_mens[nome];

}

}

res.json(Object.keys(online_mens));

});
///////////////////////////////////////


///////////test_multiplayer


let jogadores = {};

app.post("/dedos", (req, res) => {

const {id,x,y,cor} = req.body;

jogadores[id] = {
  id,
  x,
  y,
  cor,
  tempo:Date.now()
};

res.json({
ok:true
});

});

app.get("/dedos",(req,res)=>{

let agora = Date.now();

for(let id in jogadores){

    if(agora - jogadores[id].tempo > 5000){

        delete jogadores[id];

    }

}

res.json(Object.values(jogadores));

});




/////////////




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
