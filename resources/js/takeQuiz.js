'use strict';

$(document).ready(() => {
    let gradeQuiz = $('#grade-quiz-btn'),
        retakeQuiz = $('#retake-quiz-btn'),
        gradeRow = $('#grade-row'),
        grade = $('#grade'),
        gradeScore = $('#score'),
        clock = $('.clock'),
        achievedScore = 0,
        totalScore = 0,
        score,
        clockTimeout;

    window.scrollTo(0, 0);
    startTimer();

    gradeQuiz.click(async e => {
        let questions = $('.question-div');

        clearInterval(clockTimeout);

        $('input').each((inputIdx, input) => {
            $(input).attr('readonly', true);
            $(input).attr('disabled', true);
        });

        questions.each((idx, questionDiv) => {
            let userAnswer = $(questionDiv).find('input:checked'),
                quizQuestion = quiz.questions[$(questionDiv).data('question')],
                correctAnswer = $(questionDiv).find(`input[value='${quizQuestion.answer}']`);

            if (quizQuestion.options === 'input') {
                userAnswer = $(questionDiv).find('input');
            }

            correctAnswer.attr('disabled', false);
            correctAnswer.next('label').addClass('correct-answer');
            totalScore += +quizQuestion.score; 

            if (userAnswer.length !== 0 && userAnswer.val().toLowerCase() === quizQuestion.answer.toLowerCase()) {
                $(questionDiv).addClass('correct');
                achievedScore += +quizQuestion.score;
            }
            else {
                $(questionDiv).addClass('incorrect');
            }

            if (quizQuestion.options === 'input') {
                userAnswer.val(quizQuestion.answer);
            }
        });

        gradeRow.removeClass('d-none');
        
        score = achievedScore / totalScore;

        if (score >= .9) {
            grade.text('Grade: A');
        }
        else if (score >= .8) {
            grade.text('Grade: B');
        }
        else if (score >= .7) {
            grade.text('Grade: C');
        }
        else if (score >= .6) {
            grade.text('Grade: D');
        }
        else {
            grade.text('Grade: F');
        }

        gradeScore.text(`${achievedScore}/${totalScore} - ${isNaN(score) ? 0 : score * 100}%`);

        window.scrollTo(0, 0);
        gradeQuiz.addClass('d-none');
        retakeQuiz.removeClass('d-none')
    });

    retakeQuiz.click(e => {
        location.reload();
    });

    function startTimer() {
        clockTimeout = setInterval(function() {
            var regEx = /\w+:\s(\d+):(\d\d)/g,
                match = regEx.exec(clock.text()),
                minutes = match[1],
                seconds = match[2];

            seconds++;

            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }

            clock.text("Time: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds));
        }, 1000)
    }
});