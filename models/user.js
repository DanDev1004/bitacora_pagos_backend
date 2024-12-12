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
    U.ID,
    U.EMAIL,
    U.NOMBRES,
    U.APELLIDOS,
    U.IMAGEN,
    U.TELEFONO,
    U.PASSWORD_USER,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', CONVERT(R.ID,char),
            'name', R.NOMBRE,
            'image', R.IMAGEN,
            'route', R.ROUTE
        )
    ) AS ROLES
FROM
    USUARIO AS U
INNER JOIN
    USER_HAS_ROLES AS UHR
ON
    UHR.ID_USER = U.ID
INNER JOIN
    ROLES AS R
ON
    UHR.ID_ROL = R.ID
WHERE
    U.ID = ?
GROUP BY
    U.ID;
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
    U.ID,
    U.EMAIL,
    U.NOMBRES,
    U.APELLIDOS,
    U.IMAGEN,
    U.TELEFONO,
    U.PASSWORD_USER,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', CONVERT(R.ID,char),
            'name', R.NOMBRE,
            'image', R.IMAGEN,
            'route', R.ROUTE
        )
    ) AS ROLES
FROM
    USUARIO AS U
INNER JOIN
    USER_HAS_ROLES AS UHR
ON
    UHR.ID_USER = U.ID
INNER JOIN
    ROLES AS R
ON
    UHR.ID_ROL = R.ID
WHERE
    EMAIL = ?
GROUP BY
    U.ID;

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

User.actualizar = (user, result) => {

    const sql = `
    UPDATE
        USUARIO
    SET
        NOMBRES = ?,
        APELLIDOS = ?,
        TELEFONO = ?,
        IMAGEN = ?,
        updated_at = ?
    WHERE
        ID = ?
    `;

    db.query
        (
            sql,
            [
                usuario.nombres,
                usuario.apellidos,
                usuario.telefono,
                usuario.imagen,
                new Date(),
                user.id
            ],
            (err, res) => {
                if (err) {
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    console.log('Usuario actualizado:', user.id);
                    result(null, user.id);
                }
            }
        )
}

User.actualizarSinImagen = (user, result) => {

    const sql = `
    UPDATE
        USUARIO
    SET
        NOMBRES = ?,
        APELLIDOS = ?,
        TELEFONO = ?,
        updated_at = ?
    WHERE
        ID = ?
    `;

    db.query
        (
            sql,
            [
                usuario.nombres,
                usuario.apellidos,
                usuario.telefono,
                new Date(),
                user.id
            ],
            (err, res) => {
                if (err) {
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    console.log('Usuario actualizado:', user.id);
                    result(null, user.id);
                }
            }
        )
}


module.exports = User;