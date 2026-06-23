const express = require('express');
const app = express();
app.use(express.json());
app.get('/livros', (req, res) => {
    res.json([
        {

        }
    ])
});
app.post('/livros', (req, res) => {

});
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});