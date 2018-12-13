const express = require('express');
const Ctrl = require('../controllers/Upload');
const upload = express.Router();
const ctrl = new Ctrl();

upload.get('/', (...args) => ctrl.upload(...args));
upload.post('/uploadQuiz', (...args) => ctrl.uploadQuiz(...args));

module.exports = upload;