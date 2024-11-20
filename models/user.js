// backticks  => ``  => Alt + 96
const db = require('../config/config');

const User = {};

User.crear = async (usuario, result) => {
    
    //const hash = await bcrypt.hash(usuario.password, 10);

    const sql = `
        INSERT INTO
            USUARIO(
                EMAIL,
                NOMBRES,
                APELLIDOS,
                TELEFONO,
                IMAGEN,
                PASSWORD_USER,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            usuario.email,
            usuario.nombres,
            usuario.apellidos,
            usuario.telefono,
            usuario.imagen,
            usuario.password,
            new Date(),
            new Date()
        ],

        //callback
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}


module.exports = User;