
const bcrypt = require('bcrypt');
const Admin = {};

Admin.UpdateDocente = (req,res)=>{
    const {body} = req;
    const {id,contrasena,nombre,apellidos,correo} = body.datos;
	let contrasenaEncriptada = '';
	bcrypt.hash(contrasena, 10).then(async (hash) => {
		contrasenaEncriptada = hash;
        let consulta ;
        await req.getConnection((err,conn)=>{
           
            consulta = `
            UPDATE usuario SET NombreUsario='${nombre}',ApellidoUsuario='${apellidos}',ContrasenaUsuario='${contrasenaEncriptada}',CorreoUsuario='${correo}' where  Idusuario = ${id};
            `
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    
                    res.json({
                        respuesta:'true'
                    });
                }
            });

                
        });
	}).catch((err) => {
		res.status(404).send('error al guardar la contraseña')
	})
}



Admin.UpdateEstudiante = (req,res)=>{
    const {body} = req;
    const {id,contrasena,nombre,apellidos,correo,edad} = body.datos;
    
    console.log(body.datos)
	let contrasenaEncriptada = '';
	bcrypt.hash(contrasena, 10).then(async (hash) => {
		contrasenaEncriptada = hash;
        let consulta ;
        await req.getConnection((err,conn)=>{
            consulta = `
            UPDATE usuario, estudiante SET usuario.NombreUsario="${nombre}",usuario.ApellidoUsuario="${apellidos}",usuario.ContrasenaUsuario="${contrasenaEncriptada}",usuario.CorreoUsuario="${correo}", estudiante.estudianteEdad="${edad}" where  usuario.Idusuario = "${id}" AND usuario.Idusuario = estudiante.usuario_Idusuario;
            `
            console.log(consulta);
            conn.query(consulta,(err,respuesta)=>{
                if(err){
                    res.status(404).send({registro:'error en la petición'})
                }else{
                    
                        
                    res.json({
                        respuesta:'true'
                    });
                   
                }
            }); 
        });
	}).catch((err) => {
		res.status(404).send('error al guardar la contraseña')
	})
}

Admin.DeleteDocente = (req,res)=>{
    const {body} = req;
    const {id,contrasena,nombre,apellidos,correo,edad} = body.datos;
    
    console.log(body.datos)
	
    let consulta ;
    req.getConnection((err,conn)=>{
        consulta = `
        DELETE FROM usuario, trazabilidad, detalleexamen, detalleslogros, estudiante   WHERE usuario.Idusuario = trazabilidad.estudiante_usuario_Idusuario AND usuario.Idusuario = detalleexamen.estudiante_usuario_Idusuario AND usuario.Idusuario = estudiante.usuario_Idusuario AND usuario.Idusuario = detalleslogros.estudiante_usuario_Idusuario AND usuario.CorreoUsuario = "${correo}";
        `
        console.log(consulta);
        conn.query(consulta,(err,respuesta)=>{
            if(err){
                res.status(404).send({registro:'error en la petición'})
            }else{
               
                    
                    res.json({
                        respuesta:'true'
                    });
            }
        }); 
    });
}




module.exports = Admin;