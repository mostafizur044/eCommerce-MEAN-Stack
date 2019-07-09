const express = require('express');
const router = express.Router();
const dictionaryController = require('../controllers/dictionary');

router.post('/', dictionaryController.create);
router.put('/:id', dictionaryController.update);
router.get('/',  dictionaryController.getAll);
router.delete('/:id', dictionaryController.deleteOne);

module.exports = router;