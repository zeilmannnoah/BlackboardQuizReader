const express = require('express');
const Ctrl = require('../controllers/TakeQuiz');
const takeQuiz = express.Router();
const ctrl = new Ctrl();

takeQuiz.get('/', (...args) => ctrl.takeQuiz(...args));

module.exports = takeQuiz;