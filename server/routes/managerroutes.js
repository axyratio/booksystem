// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/managerController');
const { authenticate, authorizeRole } = require('../middleware/auth');

router.get('/book/', authenticate, authorizeRole('user'), bookController.getAllBooks);
router.get('/book/:id', authenticate, authorizeRole('user'), bookController.getBookById);
router.post('/book/', authenticate, authorizeRole('user'), bookController.createBook);
router.patch('/book/:id', authenticate, authorizeRole('user'), bookController.updateBook);
router.delete('/book/:id', authenticate, authorizeRole('user'), bookController.deleteBook);
router.delete('/book/', authenticate, authorizeRole('user'), bookController.deleteBookAll);

module.exports = router;
