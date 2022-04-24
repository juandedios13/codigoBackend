
const bcrypt = require('bcrypt');
const registro = {};

registro.docente = (req,res) =>{

    const {body} = req;
    //console.log(body.datos);
    const {contrasena,nombre,apellidos,correo,tipo} = body.datos;
	let contrasenaEncriptada = '';
	bcrypt.hash(contrasena, 10).then(async (hash) => {
		contrasenaEncriptada = hash;
        let consulta ;
        await req.getConnection((err,conn)=>{
            consulta = `SELECT COUNT(Idusuario) AS contador FROM usuario`;
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    const id = Date.now() + respuesta[0].contador+1;
                    consulta = `INSERT INTO usuario (Idusuario, NombreUsario, ApellidoUsuario, ContrasenaUsuario,CorreoUsuario,tipoUsuario) 
                    VALUES ("${id}","${nombre}","${apellidos}","${contrasenaEncriptada}","${correo}","${tipo}")`;
                    conn.query(consulta,(err,respuesta)=>{
                        if(err){
                            res.status(404).send({registro:'error en la petición'})
                        }else{
                            consulta = `INSERT INTO docente (usuario_Idusuario) 
                            VALUES ("${id}")`;
        
                            conn.query(consulta,(err,respuesta)=>{
                                if(err){
                                    res.status(404).send({registro:'error en la petición'})
                                }else{
                                    res.json({
                                        registro:'true'
                                    });
                                }
                            })
                        }
                    });

                }
            });
            

        });
        

	}).catch((err) => {
		res.status(404).send('error al guardar la contraseña')
	})  
}

registro.estudiante = (req,res) =>{

    const {body} = req;
    const {password,nombre,apellido,idDocente,Grado,correo,tipo,edad} = body.datos;
	let contrasenaEncriptada = '';
	bcrypt.hash(password, 10).then(async (hash) => {
		contrasenaEncriptada = hash;
        let consulta;
        await req.getConnection((err,conn)=>{
            consulta = `SELECT COUNT(Idusuario) AS contador FROM usuario`;
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    const id = Date.now() + respuesta[0].contador+1;
                    consulta = `INSERT 
                    INTO usuario (Idusuario, NombreUsario, ApellidoUsuario, ContrasenaUsuario,CorreoUsuario,tipoUsuario) 
                    VALUES ("${id}","${nombre}","${apellido}","${contrasenaEncriptada}","${correo}","${tipo}")`;
                    conn.query(consulta,(err,respuesta)=>{
                        if(err){
                            res.status(404).send({registro:'error en la petición'})
                        }else{
                            consulta = `INSERT 
                            INTO estudiante (usuario_Idusuario,estudianteEdad) 
                            VALUES ("${id}","${edad}")`;
                            conn.query(consulta,(err,respuesta)=>{
                                if(err){
                                    res.status(404).send({registro:'error en la petición'})
                                }else{
                                        consulta = `INSERT INTO grado(docente_usuario_Idusuario, estudiante_usuario_Idusuario, Grado) VALUES ("${idDocente}","${id}","${Grado}")`;
        
                                        conn.query(consulta,(err,respuesta)=>{
                                            if(err){
                                                res.status(404).send({registro:'error en la petición'})
                                            }else{
                                                res.json({
                                                    registro:'true'
                                                });
                                            }
                                        })

                                    }
                            })
                        }
                    });
                }
            })
        });
	}).catch((err) => {
		res.status(404).send('error al guardar la contraseña')
	})  
}


registro.actualizar = (req,res)=>{

    const {body} = req;
    const {passwordNew,passwordOld,nombre,apellido,correo} = body.datos;

    let consulta;
    
    consulta = 
		`SELECT 
            ContrasenaUsuario
	 	FROM usuario
	 	WHERE CorreoUsuario = "${correo}"`;

    req.getConnection((err,conn)=>{
        
        if(err){
            res.status(404).send({registro:'error en la petición'})
        }else{
            conn.query(consulta, async (err,respuesta)=>{
                if(err){
                    res.status(404).json({
                        actualizar:'false'
                    });
                }else{
                    await bcrypt.compare(passwordOld,respuesta[0].ContrasenaUsuario).then((ress)=>{
                        if(ress){
                            if (passwordNew == null || passwordNew == undefined){
                                consulta = `UPDATE usuario SET NombreUsario ='${nombre}',ApellidoUsuario ='${apellido}' WHERE CorreoUsuario = '${correo}'`;
                                conn.query(consulta, async (err,respuesta)=>{
                                    if(err){
                                        res.status(404).json({
                                            actualizar:'false'
                                        });
                                    }else{
                                        res.status(404).json({
                                            actualizar:'true'
                                        });
                                    }
                                })
                            }else {

                                 bcrypt.hash(passwordNew, 10).then(async (hash) => {
                                    contrasenaEncriptada = await hash;

                                    consulta = `UPDATE usuario SET NombreUsario ='${nombre}',ApellidoUsuario ='${apellido}',ContrasenaUsuario ='${contrasenaEncriptada}' WHERE CorreoUsuario = '${correo}'`;

                                    conn.query(consulta, async (err,respuesta)=>{
                                        if(err){
                                            res.status(404).json({
                                                actualizar:'false'
                                            });
                                        }else{
                                            res.status(404).json({
                                                actualizar:'true'
                                            });
                                        }
                                    })
                                });
                            }
                             
                        }else{
                            res.status(404).json({
                                actualizar:'false'
                            });
                        }
                    })
                }
            })

        }
    })

}

registro.eliminar = (req,res)=>{

    const {body} = req;
    const {correo,tipo,passwordOld} = body.datos;

    let consulta;
    
    consulta = 
		`SELECT 
            ContrasenaUsuario,Idusuario
	 	FROM usuario
	 	WHERE CorreoUsuario = "${correo}"`;

        req.getConnection((err,conn)=>{
        
            if(err){
                res.status(404).send({registro:'error en la petición'})
            }else{
                conn.query(consulta, async (err,respuesta)=>{
                    if(err){
                        res.status(404).json({
                            actualizar:'false'
                        });
                    }else{
                        console.log(respuesta[0]);
                        await bcrypt.compare(passwordOld,respuesta[0].ContrasenaUsuario).then((ress)=>{
                            if(ress){
                                if(tipo == "estudiante"){
                                    consulta = `DELETE FROM grado WHERE estudiante_usuario_Idusuario = '${respuesta[0].Idusuario}'`;
                                }else{
                                    consulta = `DELETE FROM grado WHERE docente_usuario_Idusuario = '${respuesta[0].Idusuario}'`;
                                }
                                conn.query(consulta, async (err,respuesta)=>{
                                    if(err){

                                        if(tipo == "estudiante"){
                                            consulta = `DELETE FROM estudiante WHERE usuario_Idusuario = '${respuesta[0].Idusuario}'`;
                                        }else{
                                            consulta = `DELETE FROM docente WHERE usuario_Idusuario = '${respuesta[0].Idusuario}'`;
                                        }
                                        conn.query(consulta, async (err,respuesta)=>{
                                            if(err){
                                                res.status(404).json({
                                                    eliminar:'false'
                                                });
                                            }else{
                                                res.status(404).json({
                                                    eliminar:'true'
                                                });
                                            }
                                        })
                                    }else{
                                        res.status(404).json({
                                            eliminar:'true'
                                        });
                                    }
                                })
                            }else{
                                res.status(404).json({
                                    eliminar:'false'
                                });
                            }
                        })
                    }
                })
            }
        })

}




module.exports = registro;