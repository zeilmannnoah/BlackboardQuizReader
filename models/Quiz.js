const cheerio = require('cheerio');
const Question = require('../models/Question');

class Quiz {
    constructor(quizName, quizObj) {
        
        this.quizName = quizName;
        this.questions = quizObj ? quizObj.questions : {};
        this.length = quizObj ? Object.keys(quizObj.questions).length : 0;
    }

    addQuestionsFromHtml(htmlObj) {
        let $ = cheerio.load(htmlObj),
            questions = $('#content_listContainer > li');

        questions.each((idx, el) => {
            let questionText = $(el).find('td > .vtbegenerated'),
                optionsEl = $(el).find('.reviewQuestionsAnswerDiv'),
                scoreRegex = /\d+ out of (\d+) points/,
                score = $(el).find('.taskbuttondiv'),
                options = [],
                answer, question;

            if (score.text() === 'Needs Grading') {
                return true;
            }

            if (optionsEl.length === 1) {
                answer = $(el).find('.quesTable > tbody > tr > td + td').text().trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
                options = 'input';
            }
            else {
                optionsEl.each((idx, el) => {
                    let optionKey = $(el).find('.answerNumLabelSpan').text(),
                        optionValue = $(el).find('.vtbegenerated > label').text().replace(/</g, "&lt;").replace(/>/g, "&gt;"),
                        correctAnswer = $(el).find('.correctAnswerFlag').length === 1;

                    if (idx === 0) {
                        return true;
                    }

                    if (correctAnswer) {
                        answer = optionKey;
                    }

                    options.push({
                        key: optionKey, 
                        value: optionValue
                    });
                });
            }
            
            score = scoreRegex.exec(score.text())[1];
            questionText = questionText.text().split('\n')[1].trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
            question = new Question(questionText, answer, score, options);
            this.questions[questionText] = question;
        });

        this.length = Object.keys(this.questions).length;
    }

    getQuestions() {
        return this.questions;
    }
}

module.exports = Quiz;