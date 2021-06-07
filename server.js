//importa o express para criação do servidor
const express = require('express');
//inicia express
const app = express();
//nome da pasta onde fará o build
const appName = 'angular-escola';
//local onde o build gerará os arquivos
const outputPath = `${__dirname}/dist/${appName}`;

//seta o diretório d build para servir o conteúdo angular
app.use(express.static(outputPath));

//para qualquer requisição feita depois da /, irá ser enviado o arquivo index como resposta
app.get('/*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`);
});

const PORT = process.env.PORT || 8080;

//teste do servidor, com a porta do heroku disponibilizada
app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
});