/*
    Rutas de Events
    host + /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Todas las peticiones tienen que pasar por validarJWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalización obligatoria').custom(isDate),

        validarCampos,
    ],
    crearEvento
    );

// Actualizar evento
router.put('/:id', actualizarEvento);

// Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports = router;