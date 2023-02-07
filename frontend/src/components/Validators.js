const validateForm = ({formErrors, ...rest}) => {
    let valid = true;

    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(value => {
        value === '' && (valid = false);
    });

    return valid;
}

function validateUniqueEmail(listObjects, email) {
    let valid = false;

    Object.values(listObjects).forEach(object => {
        object.email === email && (valid = true);
    });

    return valid;
}

function validateUniqueNameProject(listObjects, name) {
    let valid = false;

    Object.values(listObjects).forEach(object => {
        object.name === name && (valid = true);
    });

    return valid;
}

function validateUsers(formErrors, listObjects, name, value, star_args) {
    const emailRegex = RegExp(/^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/);

    switch (name) {
        case 'username':
            formErrors.username = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'firstName':
            formErrors.firstName = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'lastName':
            formErrors.lastName = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'email':
            if (!emailRegex.test(value)) {
                formErrors.email = 'The email was entered incorrectly';
                return formErrors;
            } else if (validateUniqueEmail(listObjects, value)) {
                formErrors.email = 'This email has already been registered';
                return formErrors;
            } else {
                formErrors.email = '';
                return formErrors;
            }
        case 'password':
            formErrors.password = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'password2':
            if (value.length <= 0) {
                formErrors.password2 = 'The field cannot be empty';
                return formErrors;
            } else if (value !== star_args[0]) {
                formErrors.password2 = 'Passwords don\'t match';
                return formErrors;
            } else {
                formErrors.password2 = '';
                return formErrors;
            }
        default:
            return formErrors;
    }
}

function validateProjects(formErrors, listObjects, name, value, star_args) {

    const repositoryRegex = RegExp(/((http|git|ssh|http(s)|file|\/?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?/)

    switch (name) {
        case 'name':
            if (value.length <= 0) {
                formErrors.name = 'The field cannot be empty';
                return formErrors;
            } else if (validateUniqueNameProject(listObjects, value)
                && star_args === 'new') {
                formErrors.name = 'There is already such a project name';
                return formErrors;
            } else {
                formErrors.name = '';
                return formErrors;
            }
        case 'description':
            formErrors.description = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'repository':
            if (value.length <= 0) {
                formErrors.repository = 'The field cannot be empty';
                return formErrors;
            } else if (!repositoryRegex.test(value)) {
                formErrors.repository = 'The repository was entered incorrectly';
                return formErrors;
            } else {
                formErrors.repository = '';
                return formErrors;
            }
        default:
            return formErrors;
    }
}

function validateToDo(formErrors, name, value) {

    switch (name) {
        case 'text':
            formErrors.text = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        default:
            return formErrors;
    }
}

export {validateForm, validateUsers, validateProjects, validateToDo};
