const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./products_controller')

const app = express();

app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then((db) => {
    app.set('db',db)
}).catch((err) => { console.log(err)});

app.post('/api/products',ctrl.create);
app.get('/api/products/:id',ctrl.getOne);
app.get('/api/products',ctrl.getAll);
app.put('/api/products/:id',ctrl.update);
app.delete('/api/products/:id',ctrl.delete);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Vi lyssnar på ${PORT}`)})