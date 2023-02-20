var express = require('express');



var app = express();

var Beneficiario = require('../models/beneficiairo');

// ==========================================
// Obtener todos los Beneficiairos
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Beneficiario.find({})
        .skip(desde)
        .limit(8)
        .populate('empleado', 'nombre puesto')
        .exec(
            (err, beneficiarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando beneficiarios',
                        errors: err
                    });
                }
                Beneficiario.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        beneficiarios: beneficiarios,
                        total: conteo
                    });
                });
            });
});
// ==========================================
// Obtener Beneficiario
// ==========================================
app.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Beneficiario.findById(id)
        .populate('empleado', 'nombre puesto')
        .exec(
            (err, beneficiario) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando beneficiarios',
                        errors: err
                    });
                }

                if (!beneficiario) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El beneficiario con el id ' + id + ' no existe',
                        errors: { message: 'No existe un beneficiario con ese ID' }
                    });
                }
                res.status(200).json({
                    ok: true,
                    beneficiario: beneficiario
                });

            });
});

// ==========================================
// Actualizar Beneficiario
// ==========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Beneficiario.findById(id, (err, beneficiario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar beneficiario',
                errors: err
            });
        }

        if (!beneficiario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El beneficiario con el id ' + id + ' no existe',
                errors: { message: 'No existe un beneficiario con ese ID' }
            });
        }

        beneficiario.nombre = body.nombre;
        beneficiario.nacimiento = body.nacimiento;
        beneficiario.grado = body.grado;
        beneficiario.sexo = body.sexo;
        beneficiario.tutor = body.tutor;
        beneficiario.telefono = body.telefono;
        beneficiario.telefonoSeg = body.telefonoSeg;
        beneficiario.ciclo = body.ciclo;
        beneficiario.curp = body.curp;
        beneficiario.direccion = body.direccion;
        beneficiario.documentos = body.documentos;

        beneficiario.save((err, beneficiarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar beneficiario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                beneficiario: beneficiarioGuardado
            });

        });

    });

});

// ==========================================
// Crear un nuevo Beneficiario
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;

    var beneficiaro = new Beneficiario({
        nombre: body.nombre,
        parentesco: body.parentesco,
        fechaN: body.fechaN,
        sexo: body.sexo,
        // empleado: req.empleado._id,
        // usuario: req.usuario._id
    });

    beneficiaro.save((err, beneficiaroGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear beneficiaro',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            beneficiaro: beneficiaroGuardado,
        });


    });
});

// ============================================
//   Borrar un beneficiairo por el id
// ============================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Beneficiario.findByIdAndRemove(id, (err, beneficiaroBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar beneficiaro',
                errors: err
            });
        }

        if (!beneficiaroBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un beneficiaro con ese id',
                errors: { message: 'No existe un beneficiaro con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            beneficiaro: beneficiaroBorrado
        });

    });

});


module.exports = app;