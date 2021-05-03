const { Router } = require('express');

const { localizationMiddleware } = require('../middlewares');

const { localizationController } = require('../controllers');
const router = Router();
router
  .use('/', localizationMiddleware.validateRawRequest)
  .use('/', localizationMiddleware.transformToObject)
  .use('/', localizationMiddleware.validateTransformedBody)
  .use('/', localizationMiddleware.errorHandler);

router.post('/', localizationController.post);

module.exports = router;
