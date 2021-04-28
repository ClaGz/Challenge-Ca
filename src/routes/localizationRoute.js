const { Router } = require('express');

const router = Router();
const controller = require('../controllers/localizationController')

router.post('/', controller.post);

module.exports = router;