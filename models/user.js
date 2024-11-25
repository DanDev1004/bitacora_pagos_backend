// backticks  => ``  => Alt + 96
const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.crear = async (usuario, result) => {
    
    const hash = await bcrypt.hash(usuario.password, 10);

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
            hash,
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


User.obtenerPorId = (id, result) => {

    const sql = `
    SELECT 
        ID,
        EMAIL,
        NOMBRES,
        APELLIDOS,
        IMAGEN,
        PASSWORD_USER
    FROM
        USUARIO
    WHERE
        ID = ?
    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.obtenerPorEmail = (email, result) => {

    const sql = `
    SELECT 
        ID,
        EMAIL,
        NOMBRES,
        APELLIDOS,
        IMAGEN,
        PASSWORD_USER
    FROM
        USUARIO
    WHERE
        EMAIL = ?
    `;

    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}


module.exports = User;