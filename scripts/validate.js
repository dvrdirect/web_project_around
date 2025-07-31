

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(`.${config.inputSelector}`);
    const submitBtn = form.querySelector(`.${config.submitButtonSelector}`);

    // Función para mostrar error
    function showInputError(input) {
      const errorSpan = input.parentElement.querySelector(
        config.inputErrorClass
      );
      input.classList.add("popup__input-error");
      if (errorSpan) {
        if (input.validity.valueMissing) {
          errorSpan.textContent = "Por favor, rellena este campo";
        } else if (input.validity.tooShort || input.validity.tooLong) {
          errorSpan.textContent = `Debe tener mínimo ${input.minLength} caracteres.`;
        } else if (input.validity.typeMismatch && input.type === "url") {
          errorSpan.textContent = "Por favor, introduce una dirección web";
        } else {
          errorSpan.textContent = input.validationMessage || "Campo inválido";
        }
      }
    }

    // Función para ocultar error
    function hideInputError(input) {
      const errorSpan = input.parentElement.querySelector(
        config.inputErrorClass
      );
      input.classList.remove("popup__input-error");
      if (errorSpan) {
        errorSpan.textContent = "";
      }
    }

    // Validar todo el formulario
    function checkFormValidity() {
      let formIsValid = true;
      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          formIsValid = false;
          hideInputError(input);
        } else if (!input.validity.valid) {
          formIsValid = false;
          showInputError(input);
        } else {
          hideInputError(input);
        }
      });
      if (submitBtn) {
        submitBtn.disabled = !formIsValid;
        if (formIsValid) {
          submitBtn.classList.remove(
            config.inactiveButtonClass.replace(".", "")
          );
        } else {
          submitBtn.classList.add(config.inactiveButtonClass.replace(".", ""));
        }
      }
    }

    // Eventos de input
    inputs.forEach((input) => {
      input.addEventListener("input", checkFormValidity);
    });

    // Validar al cargar
    checkFormValidity();

    // Validar al enviar
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      checkFormValidity();
    });
  });
}

// Ejemplo de uso:
