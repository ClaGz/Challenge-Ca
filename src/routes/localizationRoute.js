const { Router } = require('express');

const { localizationMiddleware } = require('../middlewares');

const controller = require('../controllers/localizationController');

const router = Router();
router.use('/', localizationMiddleware.validate);
router.use('/', localizationMiddleware.errorHandler);

router.post('/', controller.post);

module.exports = router;