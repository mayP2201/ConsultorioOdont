
export const validateCorrectCode = (code) => {
    let response = {
        result: null,
        message: null,
    };
    var re = /^[0-9]{6}$/;

    if (re.test(code)) {
        response.result = true
        response.message = ""
        return response;
    } else {
        response.result = false
        response.message = "Código inválido"
        return response;
    }
};


const validateEmailDomains = (ValueEmail) => {
    let EmailSplit = ValueEmail.split("@");
    EmailSplit = EmailSplit[1];
    let domainsArray = EmailSplit.split(".");
    const tempArrayDuplicate = [];
    for (let i = 0; i < domainsArray.length; i++) {
        if (domainsArray[i + 1] === domainsArray[i]) {
            tempArrayDuplicate.push(domainsArray[i]);
        }
    }
    if (tempArrayDuplicate.length === 0) {
        return true;
    } else {
        //alert('Ingrese un email correcto')
        return false;
    }
};
export const validateName = (name) => {
    var re =
    /^[a-zA-Z\s]{3,}$/;
    return re.test(name);
};

export const validateLastName = (name) => {
    var re =
    /^[a-zA-Z\s]{3,}$/;
    return re.test(name);
};


export const validatePhone = (phone) => {
    var re =
        /^(09|\+5939)\d{8}$/;

    return re.test(phone);
};


export const validateId = (id) => {
    var re =
        /^[0-9]{10}$/

    return re.test(id);
};

export const validateShirt = (num) => {
    var re =
        /^[0-9][0-9]?$/

    return re.test(num);
};


export const letter = (letter) => {
    var re =
        /^(?=.*[a-z])(?=.*[A-Z]).+$/;

    return re.test(letter);
};


export const number = (number) => {
    var re =
        /^(?=.*\d).+$/;

    return re.test(number);
};


export const specialCaracter = (caracter) => {
    var re =
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

    return re.test(caracter);
};

export const validateEmail1 = (email) => {
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
        return validateEmailDomains(email);
    } else {
        return false;
    }
    
};

export const validatePassword = (password) => {
    var re =
        /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/;

    return re.test(password);
};

