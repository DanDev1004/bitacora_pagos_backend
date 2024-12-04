const db = require('../config/config');

const Rol = {};

Rol.crear = (id_user, id_rol, result) => {
    const sql = `
    INSERT INTO
        USER_HAS_ROLES(
            ID_USER,
            ID_ROL,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?)
    `;

    db.query(
        sql,
        [id_user, id_rol, new Date(), new Date()],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

module.exports = Rol;