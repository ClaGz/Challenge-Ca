const { Router } = require('express');

const { localizationMiddleware } = require('../middlewares');

const controller = require('../controllers/localizationController');
const router = Router();
router
    .use('/', localizationMiddleware.validateRawRequest)
    .use('/', localizationMiddleware.transformToObject)
    .use('/', localizationMiddleware.validateTransformedBody)
    .use('/', localizationMiddleware.errorHandler);

router.post('/', controller.post);

module.exports = router;