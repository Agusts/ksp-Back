var express = require('express');

var app = express();

var Empleado = require('../models/empleado');

// ==========================================
// Obtener todos los Empleado
// ==========================================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Empleado.find({}, 'nombre puesto salario fechaCont status')
        .skip(desde)
        .limit(5)
        .exec(
            (err, empleados) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando empleados',
                        errors: err
                    });
                }

                Empleado.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        empleados: empleados,
                        total: conteo
                    });
                });
            });
});


app.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Empleado.findById(id)
        .exec(
            (err, empleado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando empleado',
                        errors: err
                    });
                }

                if (!empleado) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El empleado con el id ' + id + ' no existe',
                        errors: { message: 'No existe un empleado con ese ID' }
                    });
                }
                res.status(200).json({
                    ok: true,
                    empleado: empleado
                });

            });
});
// ==========================================
// Actualizar empleado
// ==========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Empleado.findById(id, (err, empleado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empleado',
                errors: err
            });
        }

        if (!empleado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El empleado con el id ' + id + ' no existe',
                errors: { message: 'No existe un empleado con ese ID' }
            });
        }

        empleado.nombre = body.nombre;
        empleado.puesto = body.puesto;
        empleado.salario = body.salario;
        empleado.fechaCont = body.fechaCont;
        empleado.status = body.status;
        empleado.beneficiario = body.beneficiario;

        empleado.save((err, empleadoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar empleado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                empleado: empleadoGuardado
            });

        });

    });

});

// ==========================================
// Crear un nuevo empleado
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;

    var empleado = new Empleado({
        // foto:,
        nombre:body.nombre,
        puesto:body.puesto,
        salario:body.salario,
        fechaCont:body.fechaCont,
        status:body.status,
        beneficiario:body.beneficiario
    });

    empleado.save((err, empleadoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear empleado',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            empleado: empleadoGuardado,
        });


    });
});
// ============================================
//   Borrar un empleado por el id
// ============================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Empleado.findByIdAndRemove(id, (err, empleadoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar empleado',
                errors: err
            });
        }

        if (!empleadoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un empleado con ese id',
                errors: { message: 'No existe un empleado con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            empleado: empleadoBorrado
        });

    });

});

module.exports = app;