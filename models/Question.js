class Question {
    constructor(question, answer, score, options) {
        this.question = question;
        this.answer = answer;
        this.score = score;
        this.options = options;
        this.userAnswer;
    }

    answerQuestion(userAnswer) {
        this.userAnswer = userAnswer;
    }

    checkQuestion() {
        return this.answer === this.userAnswer;
    }
}

module.exports = Question;