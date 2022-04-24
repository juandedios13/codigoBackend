const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = {};

login.login = (req,res)=>{

    const {body} = req;
    const {correo,password} = body.datos;

    var consulta = 
		`SELECT 
            *
	 	FROM usuario
	 	WHERE CorreoUsuario="${correo}"`;
    req.getConnection((err,conn)=>{
        conn.query(consulta, async (err,respuesta)=>{
            if(err){
                res.status(404).json({
                    validar:'false'
                });
            }else{
                if(respuesta.length == 0){
                    res.status(404).json({
                        validar:'false'
                    });
                }else{
                    await bcrypt.compare(password,respuesta[0].ContrasenaUsuario).then((ress)=>{
                        if(ress){
                            const datos = {
                                id:respuesta[0].Idusuario,
                                nombre:respuesta[0].NombreUsuario,
                            }
                            //console.log("entro")
                            let token = jwt.sign(datos,'MathIs');
                            token = 'Before '+token;
                            res.status(200).json({
                                nombre:respuesta[0].NombreUsario,
                                apellido:respuesta[0].ApellidoUsuario,
                                tipo:respuesta[0].tipoUsuario,
                                correo:respuesta[0].CorreoUsuario,
                                validar : 'true',
                                token
                            });
                        }else{
                            console.log("nel");
                        }
                    })
                }
                
            }
        })

    })
}


module.exports = login;