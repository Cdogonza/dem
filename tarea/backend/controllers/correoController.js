const {} = require('express');

const nodemailer = require('nodemailer');

const envioCorreo = (req, res) => {
    let body = req.body;
    let config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'g.paz1235@gmail.com',
            pass: 'hymm szfs myfy ipas'
        }
    
    });


    const opiciones = {
        from: 'Tareas',
        subject: body.asunto,
        to: body.correo,
        text: body.mensaje
    };

    config.sendMail(opiciones, function(error, info){
        if(error){
            res.status(500).json({
                ok: false,
                mensaje: 'Error al enviar el correo',
                error
            });
        }else{
            res.status(200).json({
                ok: true,
                mensaje: 'Correo enviado correctamente',
                info
            });
        }
    });
}


module.exports = {
    envioCorreo
}

