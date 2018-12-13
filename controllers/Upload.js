const cheerio = require('cheerio');
const fs = require('fs');
const quizService = require('../services/quizService');

class Upload {
    upload(req, res) {
        const model = {
            activePage: 'upload',
            quizzes: quizService.getQuizNames()
        }

        return res.render('../views/upload.pug', model);
    }
    
    uploadQuiz(req, res) {
        let questionCount = quizService.maintainQuiz(req.query.quizName.replace(' ', '_'), req.files);
        
        return res.send({count: questionCount});
    }
}

module.exports = Upload;