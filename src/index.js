const expres = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

//initializations
const app = expres();

const connection = {
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'mathis'  
};

//configuracion de cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//settings
app.set('port',3001);

app.use(expres.urlencoded({extended:false}));
app.use(expres.json({extended:true}));




//conexion a la DB
app.use(myConnection(mysql, connection, 'single'));

//global variables



//Routes
app.use('/',require('./routes/index.js'));


//public


//starting the server

app.listen(app.get('port'),()=>{
    console.log("server start");
})