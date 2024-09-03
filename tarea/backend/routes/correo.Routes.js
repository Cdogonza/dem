const express = require('express');
const app = express();

let envio = require('../controllers/correoController');


app.post('/enviar', envio.envioCorreo);
module.exports = app;