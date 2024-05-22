

//EL controlador realiza las peticiones al modelo
const controller = {};

controller.registroU = async (req, res) => {
    console.log(req.db); // Depuración para verificar req.db
    // Obtener los datos del formulario de registro desde req.body
    const datosUsuarios = {
        email: req.body.email,
        name: req.body.name,
        apellidos: req.body.apellidos,
        password: req.body.password,
        role_id: 2
    };

    try {
        // Hash de la contraseña
        let passwordHash = await req.bcrypt.hash(datosUsuarios.password, 10);
        // Actualizar datosUsuarios con la contraseña hasheada
        datosUsuarios.password = passwordHash;

        // Consulta SQL para verificar si el correo electrónico ya está registrado
        req.db.query('SELECT * FROM users WHERE email = ?', datosUsuarios.email, async (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al verificar el correo electrónico en la base de datos');
                return;
            }

            // Verificar si ya existe un usuario con el correo electrónico proporcionado
            if (result.length > 0) {
                res.status(400).send('El correo electrónico ya está registrado');
                return;
            }

         
            // Si el correo electrónico no está registrado, procedemos a insertar el nuevo usuario en la base de datos
            req.db.query('INSERT INTO users SET ?', datosUsuarios, async (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al registrar el usuario en la base de datos');
                    return;
                }
                console.log('¡Registro exitoso!');
                res.render('login'); // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
            });
        });



    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        res.status(500).send('Error al hashear la contraseña');
    }
};





controller.loginS = async (req, res) => {
    // Obtener los datos del formulario de inicio de sesión

    const datosLogin = {
        email: req.body.email,
        password: req.body.password,
    };

    req.db.query('SELECT * FROM users WHERE email = ?', datosLogin.email, async (err, result) => {

        if (err) {
            res.status(500).send('Error al verificar el correo electrónico en la base de datos');
            return;
        }
        if (result.length === 0) {
            res.status(400).send('El correo electrónico no existe');
            return;
        }
        const passwordHash = result[0].password;
        const passwordMatch = await req.bcrypt.compare(datosLogin.password, passwordHash);

        if(!passwordMatch){
            res.status(400).send('Contraseña incorrecta');
            return;
        }

        // Verificar el tipo de rol del usuario
        const user = result[0];
        // Verificar el tipo de rol del usuario
        if (user.role_id === 2) { // Suponiendo que 2 es el ID para el rol de usuario
        // Redirigir a la pestaña correspondiente para el usuario
            console.log('inicio de sesion exitoso');
            res.render('principal.ejs');

        } else if (user.role_id === 1) { //  1 es el ID para el rol de administrador
    
       /*  console.log('Citas obtenidas:', citas); */
        res.render('vistaAdmin.ejs');

        } else {
        // Si el rol no es ni de usuario ni de administrador, maneja el caso según tu lógica
            res.status(400).send('Rol de usuario no permitido');
            }
    });

};


controller.fisi = (req, res) => {
    req.db.query('SELECT * FROM citas', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo citas');
        } else {
            res.render('fisio.ejs', { data: result });
        }
    }); 
};



controller.formularioF = (req, res) => {
    // Obtener los datos del formulario de registro desde req.body
    const datosCita = {
        nombre: req.body.nombre,
        apellido_paterno: req.body.apellidoP,
        apellido_materno: req.body.apellidoM,
        fecha_nacimiento: req.body.fechaN,
        fecha_cita: req.body.fechaC,
        hora_cita: req.body.horaC,
        motivo: req.body.motivo
    };

    req.db.query('INSERT INTO citas SET ?', datosCita, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al registrar la cita en la base de datos');
            return;
        }
        console.log('¡Cita registrada!');
        res.render('fisioterapeuta');
    });

}



// En tu archivo de controladores
controller.eliminarCita = (req, res) => {
    const citaId = req.params.id;
    req.db.query('DELETE FROM citas WHERE id = ?', citaId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error eliminando cita');
        } else {
            res.redirect('fisio.ejs'); // Redirige a la página donde se muestra la lista de citas
        }
    });
};


module.exports = controller;

