const express  = require('express');
const app = express();
let cors = require('cors');
const bodyparser = require('body-parser');


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));



app.use(require('./routes/correo.Routes'));


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});