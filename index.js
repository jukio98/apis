const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 permite CORS (qualquer origem)
app.use(cors());

// 🔥 permite receber JSON no body
app.use(express.json());

// "banco de dados" em memória
let cadastro = [];

// 👉 Rota GET (ver usuários)

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});
// 👉 Rota POST (cadastrar usuário)
app.post("/cadastro", (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).json({ erro: "Nome e senha obrigatórios" });
    }

    // verifica se já existe
    const existe = cadastro.find(u => u.nome === nome);

    if (existe) {
        return res.status(400).json({ erro: "Usuário já existe" });
    }

    const novo = { nome, senha };

    cadastro.push(novo);

    res.status(201).json({
        mensagem: "Usuário cadastrado!",
        usuario: novo
    });
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
