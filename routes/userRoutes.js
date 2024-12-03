const usersController = require('../controllers/usersController');
//const passport = require('passport');

module.exports = (app, upload) => {

    //app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', { session: false }), usersController.findDeliveryMen);

    app.post('/api/users/crear', usersController.crear);
    app.post('/api/users/crear-con-imagen', upload.array('image', 1), usersController.crearConImagen);
    app.post('/api/users/login', usersController.login);
    

    //app.put('/api/users/update', passport.authenticate('jwt', {session: false}) , upload.array('image', 1), usersController.updateWithImage);
    //app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session: false}), usersController.updateWithoutImage);
    //app.put('/api/users/updateNotificationToken', passport.authenticate('jwt', {session: false}), usersController.updateNotificationToken);


}