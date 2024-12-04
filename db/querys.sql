-- inner join para acceder a usuario y su rol por ID
select * from usuario;
select * from user_has_roles;
select * from roles;

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
    U.ID = 3
GROUP BY
    U.ID;


-- inner join para acceder a usuario y su rol por EMAIL
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
    EMAIL = 'pedro@gmail.com'
GROUP BY
    U.ID;
