const express = require(express);
const cors = require(cors);
const bodyParser = require(body-parser);
const app = express();
app.use(bodyParser.json());
app.use(cors())
app.post(/api/send-email, (req, res) => {
const { email, subject, message } = req.body;
console.log({email});
console.log({subject});
console.log({message});
res.send({ message: sent });
});
app.listen(3000, () => {
console.log("Servidor corriendo")
});