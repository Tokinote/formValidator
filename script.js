"use strict";
// doom 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password= document.getElementById('password');
const password2 = document.getElementById('password2');



const valid = (function formValid() {
  
    // Show input error message
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    // Show succes outline
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    // Check email is valid
    function checkEmail(input) {
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexEmail.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email is not valid');
        }
    }

    function checkPassword(input) {
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (regexPassword.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Password should contain at least: \n  One digit \n One lower case \n One upper case \n 8 charracters');
        }
    }

    // Check required field
    function checkRequired(inputArr) {
        inputArr.forEach(input => {
            if (input.value.trim() === "") {
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSuccess(input);
            }

        })
    }

    // Get input length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min}`);
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max}`);
        }
        else {
            showSuccess(input);
        }
    }

    // Check passwords match
    function checkPasswordMatch(input1, input2) {
        if (input1.value !== input2.value) {
            showError(input2, 'Passwords do not match')
        }
    }

    // Get field name
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // Event listeners
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        checkRequired([username, email, password, password2])
        checkLength(username, 3, 15);
        checkLength(password, 8, 25)
        checkEmail(email)
        checkPassword(password)
        checkPasswordMatch(password, password2)
    })
})()


console.log(valid)
