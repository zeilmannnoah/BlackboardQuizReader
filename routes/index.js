const express = require('express');
const Ctrl = require('../controllers/Index');
const index = express.Router();
const ctrl = new Ctrl();

index.get('/', (...args) => ctrl.index(...args));
index.get('/getQuiz', (...args) => ctrl.getQuiz(...args));

module.exports = index;