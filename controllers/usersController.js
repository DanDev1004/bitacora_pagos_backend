const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const db = require('../config/config');

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

    async crearConImagen(req, res) {
        const user = JSON.parse(req.body.user);
        const files = req.files;

        User.crear(user, async (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al registrar usuario',
                    error: err
                });
            }
            // Si el usuario se crea con éxito en la base de datos, subimos la imagen
            if (files.length > 0) {
                const path = `image_${Date.now()}`;
                const url = await storage(files[0], path);

                if (url != undefined && url != null) {
                    user.IMAGEN = url;
                    // Actualizar el usuario con la URL de la imagen 
                    const updateSql = ` UPDATE USUARIO SET IMAGEN = ? WHERE ID = ? `;

                    db.query(updateSql, [url, data], (updateErr, updateRes) => {

                        if (updateErr) {
                            return res.status(501).json({
                                success: false,
                                message: 'Error al actualizar la imagen del usuario',
                                error: updateErr
                            });
                        }
                        user.ID = `${data}`;
                        const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
                        user.session_token = `JWT ${token}`;

                        //Rol espectador por defecto
                        Rol.crear(user.ID, 3, (err, data)=>{
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Error al aplicar rol de usuario',
                                    error: err
                                });
                            }

                            return res.status(201).json({
                                success: true,
                                message: 'Se ha registrado exitosamente',
                                data: user
                            });
                        }); 
                    });
                }
            } else {
                user.ID = `${data}`;
                const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
                user.session_token = `JWT ${token}`;
                return res.status(201).json({
                    success: true,
                    message: 'Se ha registrado exitosamente',
                    data: user
                });

            }
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
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {});

                const data = {
                    id: `${myUser.ID}`,
                    nombres: myUser.NOMBRES,
                    apellidos: myUser.APELLIDOS,
                    email: myUser.EMAIL,
                    telefono: myUser.TELEFONO,
                    imagen: myUser.IMAGEN,
                    session_token: `JWT ${token}`,
                    roles: myUser.ROLES
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

    }
}

