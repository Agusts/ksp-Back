var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var empleadoSchema = new Schema({

    nombre: { type: String, unique: true, required: [true, 'El nombre  del Empleado es necesario'] },
    puesto: { type: String, required: [true, 'El puesto es necesario'] },
    salario: { type: String, required: [true, 'El salario es necesario'] },
    fechaCont: { type: String, required: [true, 'La fecha de contratacion es necesaria'] },
    status: { type: Boolean, required: [true, 'El status es necesario'] },
    foto: { type: String, required: false },
    beneficiario: { type: Schema.Types.ObjectId, required: false },

});

empleadoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Empleado', empleadoSchema);