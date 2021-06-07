//pega o framework express para criação do servidor
const express = require('express');

//dependência para juntar o caminho
//const path = require("path");

const app = express();

//pega das variáveis d ambiente, a porta do heroku informada
const PORT = process.env.PORT || 8080;

//é feito uma requisição para a pasta de build
app.use(express.static(__dirname, '/dist/angular-escola'));

//para qualquer requisição feita depois da /, irá ser enviado o arquivo index como resposta
app.get('/*', (req, res) => {
    res.sendFile(__dirname, '/dist/angular-escola/index.html');
});

//teste do servidor
app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
});