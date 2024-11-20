const User = require('../models/user');


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
}