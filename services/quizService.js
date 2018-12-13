const fs = require('fs');
const Quiz = require('../models/Quiz');

function maintainQuiz(quizName, files) {
    let dirName = `./resources/quizzes/${quizName}.json`,
            quiz;


        if (fs.existsSync(dirName)) {
            let json = fs.readFileSync(dirName);

            quiz = new Quiz(quizName, JSON.parse(json));
        }
        else {
            quiz = new Quiz(quizName);
        }

        for(let key of Object.keys(files)) {
            quiz.addQuestionsFromHtml(files[key].data);
        }

        fs.writeFileSync(dirName, JSON.stringify(quiz));
        
        return Object.keys(quiz.getQuestions()).length;
}

function getQuiz(quizName) {
    let json = fs.readFileSync(`./resources/quizzes/${quizName}.json`),
        quiz = new Quiz(quizName, JSON.parse(json));
        
    return quiz;
}

function getQuizNames() {
    let dirNames = fs.readdirSync('./resources/quizzes'),
        newNames;

    newNames = dirNames.map((name, idx) => {
        return {id: idx, name: name.replace('.json', '')};
    });

    return newNames;
}

module.exports = {
    maintainQuiz,
    getQuiz,
    getQuizNames
}