var express = require('express');

var app = express();

var Usuario = require('../models/empleado');
var Alumno = require('../models/beneficiairo');


// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'alumnos':
            promesa = buscarAlumnos(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios y alumnos',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([
            buscarAlumnos(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                alumnos: respuestas[0],
                usuarios: respuestas[1]
            });
        })


});

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }


            })


    });
}

function buscarAlumnos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Alumno.find({})
            .or([{ 'nombre': regex }, { 'grado': regex }])
            .populate('usuario', 'nombre email')
            .exec((err, alumnos) => {

                if (err) {
                    reject('Erro al cargar alumnos', err);
                } else {
                    resolve(alumnos);
                }

            });

    });
}

module.exports = app;