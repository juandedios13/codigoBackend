const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verificar = require('../controladores/verificar');
const login = require('../controladores/Login');
const registro = require('../controladores/registro');
const Listar = require('../controladores/visualizar');
const { examen } = require('../controladores/ActividadesExamen');
const { upload,uploadfile } = require('../controladores/upload');
const Admin = require('../controladores/Admin');

const routes = express.Router();



routes.get('/contra',(req,res)=>{
    const contrasena = "123";
	let contrasenaEncriptada = '';
	bcrypt.hash(contrasena, 10).then( async(hash) => {
		contrasenaEncriptada = await hash
        
         res.end(contrasenaEncriptada);
	}).catch((err) => {
        console.log(err)
		res.status(404).send('error al guardar la contraseña')
	})

   
})

routes.post('/login',login.login);



//Admin
routes.post('/registarAdminDocente',registro.docente);
routes.post('/registarAdminEstudiante',verificar.session,registro.estudiante);
routes.delete('/eliminarAdmin',verificar.session,registro.eliminar);


routes.put('/actualizar',registro.actualizar);

//Listar
routes.post('/Listar',Listar.tipo);
routes.post('/ListarUsuario',Listar.Correo);
routes.get('/ListarContenido',Listar.Contenido);
routes.get('/ListarExamenes',Listar.Examenes);
routes.post('/ListarPreguntas',Listar.Preguntas);
routes.post('/ListarPreguntasRespuestas',Listar.PreguntaRespuestas);

//Adtualizar
routes.put('/Update',Admin.UpdateDocente);
routes.put('/Update/Estudiante',Admin.UpdateEstudiante);
routes.put('/Update/Examen',examen.ModificarPeguntaRespuestaExamen)

//prueba 
routes.get('/prueba',verificar.session);
routes.post('/prueba',upload,uploadfile);

module.exports = routes;