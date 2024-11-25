const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


module.exports = {
    crear(req, res) {

        const user = req.body; 
        User.crear(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al registrar usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Se ha registrado exitosamente',
                data: data //id de usuario registrado
            });

        });

    },


    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.obtenerPorEmail(email, async (err, myUser) => {
            
            console.log('ERROR: ', err);
            console.log('USUARIO: ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al iniciar sesión',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.PASSWORD_USER);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: `${myUser.ID}`,
                    nombres: myUser.NOMBRES,
                    apellidos: myUser.APELLIDOS,
                    email: myUser.EMAIL,
                    telefono: myUser.TELEFONO,
                    imagen: myUser.IMAGEN,
                    session_token: `JWT ${token}`
                    //roles: JSON.parse(myUser.roles)
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data 
                });

            }
            else {
                return res.status(401).json({ 
                    success: false,
                    message: 'El password es incorrecto'
                });
            }

        });

    },
}

