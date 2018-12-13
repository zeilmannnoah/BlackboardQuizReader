const quizService = require('../services/quizService');

class Index {
    index(req, res) {
        const model = {
            activePage: 'index',
            quizzes: quizService.getQuizNames()
        };

        return res.render('../views/index.pug', model);
    }

    getQuiz(req, res) {
        let quiz = quizService.getQuiz(req.query.quizName);

        return res.send(quiz);
    }
}

module.exports = Index;