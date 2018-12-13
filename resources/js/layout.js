const errors = {
    html: 'Only files ending in .html are allowed',
    htmlTimeout: null,
    zeroFiles: 'Please upload one or more files',
    zeroFilesTimeout: null,
    uploaded: 'Your quiz was successfully uploaded',
    uploadedTimeout: null,
    uploadError: 'An error occured uploading your quizzes',
    uploadErrorTimeout: null,
    noQuiz: 'Please choose a quiz',
    noQuizTimeout: null,
    noName: 'Please type in a quiz name',
    noNameTimeout: null
}

function alertMgr(type, title, code) {
    let alertMgr = $('#alert-mgr'),
        alert, timeout;

        if (errors[`${code}Timeout`]) {
            alert = $(`#${code}Alert`);
            clearTimeout(errors[`${code}Timeout`]);
        }
        else {
            alert = $(`<div class='alert alert-${type}' id='${code}Alert' role="alert"><b>${title}</b> ${errors[code]}</div>`)
            alertMgr.append(alert);
        }

        errors[`${code}Timeout`] = setTimeout(() => {
            alert.remove();
            errors[`${code}Timeout`] = null;
        }, 10000);
}