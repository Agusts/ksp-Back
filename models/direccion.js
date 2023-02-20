var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var direccionSchema = new Schema({

    calle: { type: String, required: [true, 'La calle necesario'] },
    numExt: { type: Number, required: [true, 'El numero exterior necesario'] },
    numIn: { type: Number, required: false },
    colonia: { type: String, required: [true, 'La colonia/barrios es necesario'] },
    codigo: { type: Number, required: [true, 'El codigo postal es necesario'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }

});

module.exports = mongoose.model('Direccion', direccionSchema)