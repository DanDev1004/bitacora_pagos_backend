const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');


//IMPORTANDO RUTAS
const usersRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.disable('x-powered-by');

app.set('port', port);




//LLAMADO DE LAS RUTAS
usersRoutes(app);






server.listen(3000, '192.168.1.3' || 'localhost', function(){
    console.log('Servidor corriendo en el puerto: '+port+' => iniciando...')
})

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/',  (req, res) => {
    res.send('Ruta raiz del backend');
});


// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR