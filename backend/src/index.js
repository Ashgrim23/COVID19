const express=require('express')
const app= express();
var cors = require('cors')

//settings
app.set('port',process.env.PORT || 3000)

//Middlewares
app.use(express.json());
app.use(cors())
//rutas
app.use(require('./rutas'))

app.listen(app.get('port'),()=>{
    console.log("server, puerto "+app.get('port'))
})