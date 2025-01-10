import express from "express";
import session from "express-session";

const app = express(); 

app.use (
    session({
        secret:'P03-GM_Bots',
        resave: false,
        saveUnintilized:true,
        cookie:{maxage: 24 * 60 * 100},
     })
);
// ? Ruta para iniciar la session 
app.get("/iniciar-sesion", (req, res)=> {
    if(!req.session.inicio){
        req.session.inicio = new Date();
        req.session.inicio = new Date();
        res.send('session Iniciada. ');
    }else{
        res.send('La session esta acticvada.')
    }
})

app.get('/Actualizacion' , (req, res) => {
    if(req.session.inicio){
        req.session.ultimoAcceso = new  Date();
        res.send('fecha de ultima concsulta actualizada')
    }else{
        res.send('no hay ninguna session activa.')
    }
})

app.get('/Estado-session' , (req, res) => {
    if(req.session.inicio){
        const inicio = req.session.inicio;
        const ultimoAcceso = req.session.ultimoAcceso;
        const ahora  = new  Date ();
        
        //calcular la antiguedad de la session
        const antiguedadMs = ahora - inicio
        const horas = Math.floor(antiguedadMs/(1000 * 60  * 60));
        const minutos = Math.floor(antiguedadMs % (1000 * 60  * 60)/ (1000 *60));
        const segundos = Math.floor(antiguedadMs % (1000 * 60)/ 1000)

        res.json({
            mensaje: 'Estado de la session',
            sessionID: req.sessionID,
            inicio: inicio.toISOString(),
            ultimoAcceso: ultimoAcceso.toISOString(),
            antiguedad: `${horas} horas, ${minutos} minutos, ${segundos} segundos`
        })
    }else{
        res.send('no hay ninguna session activa.')
    }
})
//Ruta para cerrar session

app.get('/cerrar-sesion', (req, res) => {
    if(req.session){
        req.session.destroy((err) => {
            if(err){
                return res.status(500).send('Error al cerrar la session ')
            }
            return res.send('session cerrada correctamente')
        })
    }else{
        res.send('no hay ninguna session activa para cerrar.')
    }
} )

// iniciar el servidor
const PORT = 3000
app.listen(PORT, () =>{
    console.log(`Servidor Ejecutandfose en servidor en htttp://localhost:${PORT}`)
})