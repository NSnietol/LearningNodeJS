const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Categoria = require('../modelos/categoria');

const auth = require('../middlewares/auth');


app.get('/as', function(req, res) {
    res.json({ "Mensaje": 'Hello World C' });
})

// Todas las categorias
app.get('/categoria', auth.validarToken, (req, res) => {

    let desde = Number(req.query.desde || 0); // Son parametros opcionales

    let limite = Number(req.query.limite || 5);

    let estado = Boolean(req.body.estado || true);

    // La segunda cadena indica que campos extraer
    Categoria.find({ descripcion }, 'nombre email estado')
        .skip(desde)
        .limit(limite)
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            categorias.countDocuments({ descripcion }, (err, cantidad) => {


                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    categorias,
                    number: cantidad
                });

            })

        });

});



app.get('/categoria/:id', (req, res) => {


});


// Nueva categoria
app.post('/categoria', auth.validarToken, (req, res) => {


});

// Todas las categorias de un usuario

app.put('/categoria/:id', auth.validarToken, (req, res) => {


});


// SOlo un admin lo puede hacer, no ocultar 
app.delete('/categoria/:id', auth.validarToken, (req, res) => {


});

module.exports = app;