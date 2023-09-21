/**
 * Events Routes
 * /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');


// Validacion del JWT
router.use( validarJWT);

//Obtener Eventos
router.get('/', getEventos);

//Crear Evento
router.post(
    '/', 
    [
        check( 'title', 'el titulo es Obligatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es Obligatoria').custom( isDate ),
        check( 'end', 'La fecha de finalización es Obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
    );

// Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;