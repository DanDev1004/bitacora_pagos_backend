//ECMAScript Modules(ESM) => import/export; especificacion en package.json "type":"module" => desde el 2015
//CommonJS => require(); por defecto 

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');

require('dotenv').config();


//IMPORTANDO RUTAS
const usersRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

const upload = multer({
    storage: multer.memoryStorage()
})



//LLAMADO DE LAS RUTAS
usersRoutes(app, upload);



server.listen(3000, process.env.IP_ADDRESS || 'localhost', function(){
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