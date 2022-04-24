
const Listar = {};

Listar.todos = (req,res) =>{


    let consulta = ` SELECT * FROM usuario `;

    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({
                        respuesta
                    })
                }
            })
        }
        
    })
}

Listar.tipo = (req,res)=>{

    const {body} = req;
    const {tipo} = body.datos;
    let consulta;
    if(tipo == "estudiante"){
        consulta = `SELECT * FROM usuario, estudiante where usuario.Idusuario = estudiante.usuario_Idusuario`;
    }else if(tipo == "docente"){
        consulta = ` SELECT * FROM usuario, docente where usuario.Idusuario = docente.usuario_Idusuario;`;
    }

    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({
                        respuesta
                    })
                }
            })
        }
        
    })

}

Listar.nombre = (req,res)=> {
    
    const {body} = req;
    const {nombre} = body.datos;
    let consulta= `SELECT * FROM usuario,  docente where  usuario.NombreUsario = "${nombre}" AND usuario.Idusuario = docente.usuario_Idusuario`;
    let respuesta = {
        docente :{},
        estudiante : {}
    };
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    respuesta.docente = ress
                    consulta= `SELECT * FROM usuario, estudiante  where  usuario.NombreUsario = "${nombre}" AND  usuario.Idusuario = estudiante.usuario_Idusuario `;
                    conn.query(consulta,(err,ress)=>{
                        if(err){
                            res.status(404).send({registro:'error en la petición'})
                        }else{
                            respuesta.estudiante = ress
                            res.status(200).json({respuesta});
                        }
                    })
                }
            })
        }
    })
}

Listar.Correo = (req,res)=>{
    const {body} = req;
    const {tipo,correo} = body.datos;
    let consulta;
    if(tipo == "estudiante" || tipo == "Estudiante"){
        consulta = `SELECT * FROM usuario, estudiante where usuario.Idusuario = estudiante.usuario_Idusuario AND usuario.CorreoUsuario = "${correo}"`;
    }else if(tipo == "docente" || tipo == "Docente"){
        consulta = ` SELECT * FROM usuario, docente where usuario.Idusuario = docente.usuario_Idusuario AND usuario.CorreoUsuario = "${correo}"`;
    }else if(tipo == "admin" || tipo == "Admin"){
        consulta = ` SELECT * FROM usuario, admin where usuario.Idusuario = admin.usuario_Idusuario AND usuario.CorreoUsuario = "${correo}"`;
    }
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    console.log(respuesta);
                    res.status(200).json({
                        respuesta
                    })
                }
            })
        }
        
    })
}


Listar.Avanaces  = (req,res)=>{
    
}


//Logros 

Listar.Logros = (req,res)=>{
    const {body} = req;
    const {nombre} = body.datos;
    let consulta= `SELECT log.NombreLogros, usu.NombreUsario, usu.ApellidoUsuario  FROM detalleslogros AS det, estudiante AS es, logros AS log , usuario AS usu where estudiante_usuario_Idusuario = Idusuario AND Logros_IdLogros = IdLogros `;
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
    
    
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({ress});
                }
            })

        }
        
    })
}

Listar.LogrosXnombre = (req,res)=>{
    const {body} = req;
    const {nombre} = body.datos;

    let consulta= `SELECT log.NombreLogros, usu.NombreUsario, usu.ApellidoUsuario  FROM detalleslogros AS det, estudiante AS es, logros AS log , usuario AS usu where estudiante_usuario_Idusuario = Idusuario AND Logros_IdLogros = IdLogros AND NombreLogros = "${nombre}" `;
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
    
    
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({ress});
                }
            })
        }
        
    })
}

Listar.LogrosXestudiante = (req,res)=>{
    const {body} = req;
    const {nombre} = body.datos;
    let consulta= `SELECT log.NombreLogros, usu.NombreUsario, usu.ApellidoUsuario  FROM detalleslogros AS det, estudiante AS es, logros AS log , usuario AS usu where estudiante_usuario_Idusuario = Idusuario AND Logros_IdLogros = IdLogros AND NombreUsario = "${nombre}"  `;
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
    
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({ress});
                }
            })

        }
        
    })
}


//Examen

Listar.Examenes = (req,res) =>{


    let consulta = ` SELECT  examen.Idexamen, examen.NombreExamen, contenido.NombreContenido,COUNT(preguntasexamen.IdpreguntasExamen) AS Npreguntas FROM examen , preguntasexamen ,contenido WHERE examen.Contenido_IdContenido = contenido.IdContenido AND examen.Idexamen = preguntasexamen.Examen_Idexamen GROUP BY(examen.NombreExamen);`;

    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({respuesta:'error en la petición'})
                }else{
                    res.status(200).json({
                        respuesta
                    })
                }
            })
        }
        
    })
}

Listar.Preguntas = (req,res) =>{

    const {body} = req;
    const {idexamen} = body.datos;

    let consulta = ` SELECT preguntasexamen.IdpreguntasExamen, preguntasexamen.PreguntaExamen, preguntasexamen.tipoPregunta, COUNT(respuestaspreguntasexamen.iIdrespuestasExamen) AS Nrespuesta, examen.NombreExamen FROM preguntasexamen,respuestaspreguntasexamen, examen WHERE examen.Idexamen ="${idexamen}" AND examen.Idexamen = preguntasexamen.Examen_Idexamen AND preguntasexamen.IdpreguntasExamen = respuestaspreguntasexamen.preguntasExamen_IdpreguntasExamen GROUP BY(preguntasexamen.PreguntaExamen);`;

    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({respuesta:'error en la petición'})
                }else{
                    res.status(200).json({
                        respuesta
                    })
                }
            })
        }
        
    })
}

Listar.PreguntaRespuestas = (req,res) =>{

    const {body} = req;
    const {IdpreguntasExamen} = body.datos;
    let consulta = ` SELECT PreguntaExamen, tipoPregunta, IdpreguntasExamen  FROM preguntasexamen WHERE IdpreguntasExamen = "${IdpreguntasExamen}";`;

    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({respuesta:'error en la petición'})
                }else{

                    consulta = ` SELECT * FROM respuestaspreguntasexamen WHERE preguntasExamen_IdpreguntasExamen = "${IdpreguntasExamen}";`;

                    conn.query(consulta,(err,respuesta2)=>{
                        if(err){
                            res.status(404).send({respuesta:'error en la petición'})
                        }else{
                            res.status(200).json({
                                pregunta : respuesta,
                                respuestas: respuesta2
                            })
                        }
                    })

                }
            })
        }
        
    })
}


// Notas Examen

Listar.NotasExamen =(req,res)=>{
    const {body} = req;
    const {nombre} = body.datos;
    let consulta= `SELECT usu.NombreUsario, usu.ApellidoUsuario, ex.NombreExamen, det.NotaDetalleExamen, det.EstadoDetalleExamen FROM detalleexamen AS det, estudiante AS es, examen AS ex, usuario AS usu, docente AS doc, contenido AS con where det.estudiante_usuario_Idusuario = es.usuario_Idusuario`;
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
    
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({ress});
                }
            })
        }
        
    })
}


Listar.NotasExamenNombre =(req,res)=>{
    const {body} = req;
    const {nombre} = body.datos;
    let consulta= `SELECT usu.NombreUsario, usu.ApellidoUsuario, ex.NombreExamen, det.NotaDetalleExamen, det.EstadoDetalleExamen FROM detalleexamen AS det, estudiante AS es, examen AS ex, usuario AS usu, docente AS doc, contenido AS con where det.estudiante_usuario_Idusuario = es.usuario_Idusuario AND ex.NombreExamen = "${nombre}"`;
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
    
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({ress});
                }
            })
        }
        
    })
}

Listar.NotasExamenPermosa =(req,res)=>{
    const {body} = req;
    const {nombre} = body.datos;
    let consulta= `SELECT usu.NombreUsario, usu.ApellidoUsuario, ex.NombreExamen, det.NotaDetalleExamen, det.EstadoDetalleExamen FROM detalleexamen AS det, estudiante AS es, examen AS ex, usuario AS usu, docente AS doc, contenido AS con where det.estudiante_usuario_Idusuario = es.usuario_Idusuario AND usu.NombreUsario = "${nombre}"`;
    
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
    
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({ress});
                }
            })
        }
        
    })
}


Listar.Contenido = (req,res)=>{
    let consulta= `SELECT * FROM contenido `;
    
    req.getConnection((err,conn)=>{
        if(err){
            res.status(404).send({registro:'error en la Conexión'})
        }else{
            conn.query(consulta,(err,ress)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    res.status(200).json({respuesta:ress});
                }
            })
        }
        
    })

}







module.exports = Listar;
