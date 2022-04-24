const actividad ={} , examen = {}

//ACTIVIDADES

actividad.ListarActividades = (req,res)=>{
    let consulta = ` SELECT * FROM Examen `;

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

actividad.ListarPreguntasActividad = (req,res)=>{
    const {body} = req;
    const {examenes} = body.datos;

    let consulta = ` SELECT * FROM preguntasExamen WHERE Examen_Idexamen = ${examenes}   `;

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

actividad.ModificarPeguntaActividad = (req,res)=>{
    const {body} = req;
    const {pregunta} = body.datos;

    let consulta = ` UPDATE preguntasexamen SET PreguntaExamen= '${preguntas}' WHERE IdpreguntasExamen ='${idpregunta}' AND Examen_Idexamen = '${idexamen}'`;

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


actividad.ListarRespuestasActividad = (req,res)=>{
    const {body} = req;
    const {pregunta} = body.datos;

    let consulta = ` SELECT * FROM preguntasExamen WHERE preguntasExamen_IdpreguntasExamen = ${preguntas}   `;

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

function modificarRespuestasActividad (req,consulta){
    return new Promise((res,rej)=>{
        req.getConnection ( async (err,conn)=>{
            if(err){
                console.log("no conecto");
            }else{
                await conn.query(consulta,  (err,respuesta)  =>{
                    console.log("respondio");    
                    console.log(respuesta);
                        if(err){
                            res(false);
                        }else{
                            
                            res(true);
                        }
                })
            }
        })
    })
}

actividad.ModificarRespuestaExamen =  async(req,res)=>{
    const {body} = req;
    const {idexamen,idpregunta,data} = body.datos;
    let c = 1;
    let consulta;
    let ret = data ;
    const n = Object.keys(data).length;
    for await (let items of data){ 
        consulta = ` UPDATE respuestaspreguntasexamen SET EstadoRespuestaPreguntaExamen='${items.estado}',respuestasPrguntasExamen='${items.respuesta}' WHERE  preguntasExamen_IdpreguntasExamen ='${idpregunta}' AND preguntasExamen_Examen_Idexamen = '${idexamen}' AND 	idrespuestasExamen = '${items.idrespuesta}'`;
        modificarRespuestasActividad(req,consulta).then((val)=>{
                console.log(val)
                if(val == false){
                    res.status(400).json({
                        'value': 'false'
                    })
                }else{
                    console.log("pregunta",c," ",n);
                    if(c == n){
                        res.status(200).json({
                            'value': 'true'
                        })
                    }else{
                        c++;
                    }
                }
            }   
        )
    }
}

// EXAMNES
examen.ListarExamenes = (req,res)=>{
    let consulta = ` SELECT * FROM Examen `;

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

examen.ListarPreguntasExamen = (req,res)=>{
    const {body} = req;
    const {examenes} = body.datos;

    let consulta = ` SELECT * FROM preguntasExamen WHERE Examen_Idexamen = ${examenes}   `;

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

examen.ModificarPeguntaRespuestaExamen = (req,res)=>{
    const {body} = req;
    const {pregunta,respuestas,tipo} = body.datos;
    let consulta = ` UPDATE preguntasexamen SET PreguntaExamen='${pregunta.PreguntaExamen}',tipoPregunta='${tipo}' WHERE IdpreguntasExamen == '${pregunta.IdpreguntasExamen}'`;

    console.log(respuestas)
    //let consulta = ` UPDATE preguntasexamen SET PreguntaExamen= '${preguntas}' WHERE IdpreguntasExamen ='${idpregunta}' AND Examen_Idexamen = '${idexamen}'`;

    // req.getConnection((err,conn)=>{
    //     if(err){
    //         res.status(404).send({registro:'error en la Conexión'})
    //     }else{
    //         conn.query(consulta,(err,respuesta)=>{
    //             if(err){
    //                 res.status(404).send({registro:'error en la petición'})
    //             }else{
                     res.status(200).json({
                        true:true
                     });
    //             }
    //         })
    //     }
        
   // })
}


examen.ListarRespuestas = (req,res)=>{
    const {body} = req;
    const {pregunta} = body.datos;

    let consulta = ` SELECT * FROM preguntasExamen WHERE preguntasExamen_IdpreguntasExamen = ${pregunta}`;

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

function modificar (req,consulta){
    return new Promise((res,rej)=>{
        req.getConnection ( async (err,conn)=>{
            if(err){
                console.log("no conecto");
            }else{
                await conn.query(consulta,  (err,respuesta)  =>{
                    console.log("respondio");    
                    console.log(respuesta);
                        if(err){
                            res(false);
                        }else{
                            
                            res(true);
                        }
                })
            }
        })
    })
    
    /*  const element = arrat [i];
    for (let i = 1; i < array.lengtht; i++) {
        consulta = ` UPDATE respuestaspreguntasexamen SET EstadoRespuestaPreguntaExamen='${data[i].estado}',respuestasPrguntasExamen='${data[i].respuesta}' WHERE  preguntasExamen_IdpreguntasExamen ='${idpregunta}' AND preguntasExamen_Examen_Idexamen = '${idexamen}' AND 	idrespuestasExamen = '${data[i].idrespuesta}'`;
        await req.getConnection ( (err,conn)=>{
            if(err){
                console.log("no conecto");
            }else{
                conn.query(consulta,  (err,respuesta)  =>{
                    
                        if(err){
                        }else{
                            console.log("entro");
                            c++;
                        }
                })
            }
        }
    }) */

}

examen.ModificarRespuestaExamen =  async(req,res)=>{
    const {body} = req;
    const {idexamen,idpregunta,data} = body.datos;
    let c = 1;
    let consulta;
    let ret = data ;
    const n = Object.keys(data).length;
    for await (let items of data){ 
        consulta = ` UPDATE respuestaspreguntasexamen SET EstadoRespuestaPreguntaExamen='${items.estado}',respuestasPrguntasExamen='${items.respuesta}' WHERE  preguntasExamen_IdpreguntasExamen ='${idpregunta}' AND idrespuestasExamen = '${items.idrespuesta}'`;
        modificar(req,consulta).then((val)=>{
                console.log(val)
                if(val == false){
                    res.status(400).json({
                        'value': 'false'
                    })
                }else{
                    console.log("pregunta",c," ",n);
                    if(c == n){
                        res.status(200).json({
                            'value': 'true'
                        })
                    }else{
                        c++;
                    }
                }
            }   
        )
    }
}









module.exports = {
    actividad,
    examen
}