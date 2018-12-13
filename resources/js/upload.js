'use strict';

$(document).ready(() => {
    let quizInput = $('#quiz-input'),
        quizNameInput = $('#quiz-name-input'),
        quizNameSelect = $('#quiz-name-select'),
        uploadBtn = $('#quiz-upload'),
        switchQuiz = $('#switch-quiz'),
        newQuizRow = $('#new-quiz-row'),
        oldQuizRow = $('#old-quiz-row');

    quizInput.change(e => {
        for(let file of e.target.files) {
            if (!file.name.toLowerCase().endsWith(".html")) {
                alertMgr('danger', 'Error', 'html');
                quizInput.val('');
            }
        }
    });

    uploadBtn.click(async (e) => {
        let files = [...quizInput.prop('files')],
            quizName = switchQuiz.is(':checked') ? quizNameInput.val() : quizNameSelect.find(':selected').text(),
            formData = new FormData();
        
        files = files.map(file => {
            return formData.append(file.name, file);
        });

        if (quizName === 'Choose quiz') {
            alertMgr('danger', 'Error', 'noQuiz');
        }
        else if (quizName === '') {
            alertMgr('danger', 'Error', 'noName');
        }
        else if (files.length === 0) {
            alertMgr('danger', 'Error', 'zeroFiles');
        }
        else {
            try {
                let res = await fetch(`/upload/uploadQuiz?quizName=${quizName}`, {method: 'POST',
                        body: formData}),
                    resObj = await res.json();

                if (!isNaN(resObj.count)) {
                    alertMgr('success', 'Uploaded', 'uploaded');
                }
                else {
                    throw resObj;
                }
            }
            catch (err) {
                alertMgr('danger', 'Error', 'uploadError');
            }
        }
    });

    switchQuiz.change(e => {
        newQuizRow.toggleClass('d-none');
        oldQuizRow.toggleClass('d-none');
    });
});