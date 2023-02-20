var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var beneficiarioSchema = new Schema({

    nombre: { type: String, unique: true, required: [true, 'El nombre  del beneficiaior es necesario'] },
    parentesco: { type: String, required: [true, 'El parentesco es necesario'] },
    fechaN: { type: String, required: [true, 'La fecha de nacimiento es necesaria'] },
    sexo: { type: String, required: [true, 'El sexo es necesario'] },
    // empleado: { type: Schema.Types.ObjectId, ref: 'Empleado' }

});

beneficiarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Beneficiario', beneficiarioSchema);