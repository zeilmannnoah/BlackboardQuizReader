const quizService = require('../services/quizService');

class TakeQuiz {
    takeQuiz(req, res) {
        const model = {
            activePage: 'takeQuiz',
            quiz: quizService.getQuiz(req.query.quizName),
            count: req.query.count
        };

        return res.render('../views/takeQuiz.pug', model);
    }
}

module.exports = TakeQuiz;