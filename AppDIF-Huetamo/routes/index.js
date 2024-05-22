var express = require('express');
var router = express.Router();
const controller = require('../controler/indexControlador');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'AppDIF-Huetamo' });
});

/* Ruta del login al registro del usuario */
router.get('/registro.ejs', (req, res) => {
  res.render('registro');
});

/* Ruta del registro de usuario al login */
router.get('/login.ejs', (req, res) => {
  res.render('login');
});

//ruta POST para el registro de usuarios
router.post('/registroU', controller.registroU);

//ruta POST para el inicio de sesion 
router.post('/loginS', controller.loginS);
 

router.get('/asesoramiento_Juridico.ejs', (req, res) => {
  res.render('asesoramiento_Juridico');
});

/* Ruta del registro de usuario al login */
router.get('/dentista.ejs', (req, res) => {
  res.render('dentista');
});

/* Ruta del registro de usuario al login */
router.get('/fisioterapeuta.ejs', (req, res) => {
  res.render('fisioterapeuta');
});

/* Ruta del registro de usuario al login */
router.get('/medico.ejs', (req, res) => {
  res.render('medico');
});

/* Ruta del registro de usuario al login */
router.get('/psicologia.ejs', (req, res) => {
  res.render('psicologia');
});


/* Ruta del registro de usuario al login */
router.get('/dentista.ejs', (req, res) => {
  res.render('dentista');
});

router.get('/principal.ejs', (req, res) => {
  res.render('principal');
});

router.post('/formularioF', controller.formularioF);

router.get('/vistaAdmin.ejs', (req, res) => {
    res.render('vistaAdmin');
});

router.get('/fisio.ejs', controller.fisi);


// En tu archivo de rutas
router.get('/eliminarA/:id', controller.eliminarCita);



module.exports = router;