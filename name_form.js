let names = ['Aleksandr', 'Aleksej', 'Alex', 'Bob', 'Boris', 'Vadim', 'Vasilij', 'Vladimir'];
let nameInput = document.getElementById('name-input');
let inputPass = document.getElementById('password-input');
let square = document.querySelector('.square');
let stars = document.querySelectorAll('.star');
let textLabels = document.getElementsByClassName('label-text');
let mandatoryAreas = document.querySelectorAll('.mandatory-area');
let checkbox = document.getElementById('checkbox_style');

let isNameInputValid = false;
let isPassInputValid = false;
let isCheckboxValid = false;
let incorrectNameText = '';
let incorrectPassText = '';

function showNames(event) {
    if (event.target.value === '') {
        closeAllLists();
    } else {
        closeAllLists();
        let dropdown = document.createElement("div");
        dropdown.classList.add("dropdown");

        let autocomplete = document.querySelector('.autocomplete');
        autocomplete.appendChild(dropdown);

        let value = event.target.value;
        
        for (let j = 0; j < names.length; j++) {
            if (names[j].toLowerCase().startsWith(value.toLowerCase())) {
                let paragraph = document.createElement('p');
                paragraph.style.cursor = 'pointer';
                paragraph.textContent = names[j];
                paragraph.id = `name${j}`;
                paragraph.addEventListener("click", pasteName);
                paragraph.addEventListener('mouseover', highlightNames);
                dropdown.appendChild(paragraph);
            }
        }
    } 
}

function closeAllLists() {
    let x = document.getElementsByClassName("dropdown");
    for (let i = 0; i < x.length; i++) {
        x[i].parentNode.removeChild(x[i]);
    }
}

function pasteName(event) {
    nameInput.value = event.target.textContent;
    let autocomplete = document.querySelector('.autocomplete');
    let dropdown = document.querySelector(".dropdown");
    autocomplete.removeChild(dropdown);
}

function highlightNames(event) {
    event.target.style.backgroundColor = "#DCDCDC";
    setTimeout(() => {
        event.target.style.backgroundColor = "";
    }, 500);
}

nameInput.addEventListener('input', showNames);

document.addEventListener('click', function handleClickOutsideBox(event) {
    if (!nameInput.contains(event.target)) {
        closeAllLists();
    }
});

let clickButton = document.querySelector('.button');
clickButton.addEventListener('click', validateForm);

function validateForm() {
    const letterCheck = /^[a-zA-Z\-]+$/;
    const dashStart = /^\-/;
    const dashFinish = /\-$/;
    const passCheck = /^[a-zA-Z0-9\!@\#\$.,\*\(\)\-_\+=]+$/;
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const symbolPassCheck = /[0-9\!@\#\$.,\*\(\)\-_\+=]/;

    if (nameInput.value === ''
        || nameInput.value.length < 2 
        || nameInput.value.length > 20
        || !letterCheck.test(nameInput.value) 
        || dashStart.test(nameInput.value) 
        || dashFinish.test(nameInput.value)) {
        isNameInputValid = false;

        if (nameInput.value === '') {
            incorrectNameText = 'Поле обязательно для заполнения';
        }

        if (nameInput.value.length === 1) {
            incorrectNameText = 'Имя слишком короткое';
        }

        if (nameInput.value.length > 20) {
            incorrectNameText = 'Имя слишком длинное';
        }

        if (!letterCheck.test(nameInput.value)) {
            incorrectNameText = 'Можно использовать только буквы латинского алфавита и тире';
        } 
        
        if (dashStart.test(nameInput.value)) {
            incorrectNameText = 'Нельзя начинать с тире';
        }

        if (dashFinish.test(nameInput.value)) {
            incorrectNameText = 'Нельзя заканчивать тире';
        }

        mandatoryAreas[0].textContent = incorrectNameText;
    } else {
        isNameInputValid = true;
    }

    if (inputPass.value === '' 
        || inputPass.value.length < 8
        || !passCheck.test(inputPass.value)
        || !lowerCase.test(inputPass.value)
        || !upperCase.test(inputPass.value)
        || !symbolPassCheck.test(inputPass.value)) {
        isPassInputValid = false;

        if (inputPass.value.length < 8) {
            incorrectPassText = 'Пароль слишком короткий';
        }

        if (inputPass.value === '') {
            incorrectPassText = 'Поле обязательно для заполнения';
        }

        if (!passCheck.test(inputPass.value)) {
            incorrectPassText = 'Разрешены буквы латинского алфавита, цифры и символы !@#$.,*()-_=+';
        }

        if (!lowerCase.test(inputPass.value)) {
            incorrectPassText = 'Нужна хотя бы одна строчная буква';
        }

        if (!upperCase.test(inputPass.value)) {
            incorrectPassText = 'Нужна хотя бы одна заглавная буква';
        }

        if (!symbolPassCheck.test(inputPass.value)) {
            incorrectPassText = 'Нужна хотя бы одна цифра или символ !@#$.,*()-_=+';
        }

        mandatoryAreas[1].textContent = incorrectPassText;
    } else {
        isPassInputValid = true;
    }

    if (checkbox.checked === false) {
        isCheckboxValid = false;
    } else {
        isCheckboxValid = true;
    }

    if (isNameInputValid) {
        nameInput.style.borderColor = '#787878';
        textLabels[0].style.color = '#787878';
        stars[0].style.color = '#787878';
        mandatoryAreas[0].style.visibility = 'hidden';
    } else {
        nameInput.style.borderColor = 'red';
        textLabels[0].style.color = 'red';
        stars[0].style.color = 'red';
        mandatoryAreas[0].style.visibility = 'visible';
    }

    if (isPassInputValid) {
        inputPass.style.borderColor = '#787878';
        textLabels[1].style.color = '#787878';
        stars[1].style.color = '#787878';
        mandatoryAreas[1].style.visibility = 'hidden';
    } else {
        inputPass.style.borderColor = 'red';
        textLabels[1].style.color = 'red';
        stars[1].style.color = 'red';
        mandatoryAreas[1].style.visibility = 'visible';
    }

    if (isCheckboxValid) {
        square.style.borderColor = '#787878';
        stars[2].style.color = '#787878';
        mandatoryAreas[2].style.visibility = 'hidden';
    } else {
        square.style.borderColor = 'red';
        stars[2].style.color = 'red';
        mandatoryAreas[2].style.visibility = 'visible';
    }
}
