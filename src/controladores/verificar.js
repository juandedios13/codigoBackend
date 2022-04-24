const jwt = require('jsonwebtoken')
const verificar = {}

verificar.session = (req,res, next) => {
    const {authorization} = req.headers;
    let token = null;
    
    console.log(JSON.parse (  authorization));
    if(authorization){
        token = authorization.substring(7);
    }
    
     jwt.verify(token,'MathIs',(err,data)=>{
        if(err){
             res.status(401).json({
                error:'token inavilido'
            });
        }else{
            //validar si existe en la base de datos ;
            console.log(data);
            req.token = data;
            req.validar = true;
            next();
            
        }
     });

}



module.exports = verificar;