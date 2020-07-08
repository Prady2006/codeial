const express = require('express');

const router = express.Router() ;

const resetController = require('../controllers/reset_controller');

router.get('/',resetController.index);
router.post('/',resetController.reset);
router.get('/:accesstoken',resetController.updateForm);
router.post('/update/:accesstoken',resetController.update);
module.exports = router ;