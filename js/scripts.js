class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ];
    }
  
    // initiates validation for all fields
    validate(form) {
  
      // clear all previous validations
      let currentValidations = form.querySelectorAll('.error-validation');
  
      if (currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // get all inputs
      let inputs = form.getElementsByTagName('input');
      // convert HTMLCollection to array
      let inputsArray = [...inputs];
  
      // loop through inputs and validate according to found attributes
      inputsArray.forEach((input) => {
  
        // perform validation based on input attribute
        for (let i = 0; i < this.validations.length; i++) {
          if (input.getAttribute(this.validations[i]) !== null) {
  
            // clean string to determine method
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            // input value
            let value = input.getAttribute(this.validations[i]);
  
            // invoke method
            this[method](input, value);
  
          }
        }
  
      });
  
    }
  
    // method to validate minimum length
    minlength(input, minValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `Field must have at least ${minValue} characters`;
  
      if (inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // method to validate maximum length
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `Field must have less than ${maxValue} characters`;
  
      if (inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // method to validate strings containing only letters
    onlyletters(input) {
  
      let re = /^[A-Za-z]+$/;
  
      let inputValue = input.value;
  
      let errorMessage = `This field does not accept numbers or special characters`;
  
      if (!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // method to validate email
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insert an email in the format jefersonpriimer@example.com`;
  
      if (!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // check if one field matches another
    equal(input, inputName) {
  
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `This field needs to be equal to ${inputName}`;
  
      if (input.value !== inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
  
    // method to validate required fields
    required(input) {
  
      let inputValue = input.value;
  
      if (inputValue === '') {
        let errorMessage = `This field is required`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // validating the password field
    passwordvalidate(input) {
  
      // split string into array
      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for (let i = 0; i < charArr.length; i++) {
        if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if (!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if (uppercases === 0 || numbers === 0) {
        let errorMessage = `Password must have at least one uppercase letter and one number`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // method to print error messages
    printMessage(input, msg) {
  
      // check for existing errors
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // print error only if there are no errors
      if (errorsQty === null) {
        let template = document.querySelector('.error-validation.template').cloneNode(true);
  
        template.textContent = msg;
  
        let inputParent = input.parentNode;
  
        template.classList.remove('template');
  
        inputParent.appendChild(template);
      }
  
    }
  
    // remove all validations to recheck
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
  
  }
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();
  
  // form submission event, which validates inputs
  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
  });
  