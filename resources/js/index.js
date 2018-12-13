'use strict';

$(document).ready(() => {
    let quizSelect = $('#quiz-select'),
        questionRange = $('#question-range'),
        rangeRow = $('#range-row'),
        countLabel = $('#count-label'),
        takeQuizBtn = $('#take-quiz-btn'),
        questionAmount, quiz;

    quizSelect.change(async e => {
        let quizName = quizSelect.find(':selected').text();

        if (quizName === 'Choose quiz') {
            alertMgr('danger', 'Error', 'noQuiz');
            rangeRow.addClass('d-none');
            quiz = null;
        }
        else {
            quiz = await fetchQuiz(quizName);

            if(quiz.length >= 20) {
                countLabel.text(`Question Amount: 20`);
                questionRange.val((20 / quiz.length) * 100);
                questionAmount = 20;
            }
            else {
                countLabel.text(`Question Amount: ${quiz.length}`);
                questionRange.val(100);
                questionAmount = quiz.length;
            }
            rangeRow.removeClass('d-none');
        }
    });

    questionRange.change(e => {
        questionAmount = Math.round(quiz.length * (questionRange.val() * 0.01));

        if (questionRange.val() < 1) {
            questionRange.val(1);
            questionAmount = 1;
        }

        countLabel.text(`Question Amount: ${questionAmount}`);
    });

    takeQuizBtn.click(e => {
        let quizName = quizSelect.find(':selected').text();

        if (quizName === 'Choose quiz') {
            alertMgr('danger', 'Error', 'noQuiz');
            rangeRow.addClass('d-none');
        }
        else if (quiz == null) {
            alertMgr('danger', 'Error', 'noQuiz');
        }
        else {
            window.location = `/takeQuiz?quizName=${quizName}&count=${questionAmount}`;
        }
    });

    async function fetchQuiz(quizName, count) {
        let quizRes = await fetch(`/getQuiz?quizName=${quizName}`),
            quiz = await quizRes.json();

        return quiz;
    }
});