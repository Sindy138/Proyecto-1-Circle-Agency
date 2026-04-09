/**
 * ContactForm - Manejo validación, estados de error y mensajes personalizados
 */
/*
class ContactForm {
  constructor(formId = "contactForm") {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.fields = this.form.querySelectorAll("[data-field]");
    this.errorMessages = {
      NAME: "Please, complete the field NAME with your name.",
      EMAIL: "Please, complete the field EMAIL with your email.",
      PHONE: "Please, complete the field PHONE with your phone number.",
      MESSAGE: "Please, complete the field MESSAGE with your message.",
    };

    this.init();
  }

  /**
   * Inicializa los event listeners para el formulario
   */
  /*
  init() {
    this.attachEventListeners();
  }

  /**
   * Adjunta los event listeners a los campos del formulario
   */
  /*
  attachEventListeners() {
    this.fields.forEach((field) => {
      // Validar al salir del campo (blur)
      field.addEventListener("blur", (e) => {
        this.validateField(e.target);
      });

      // Limpiar error al escribir si el campo tenía error
      field.addEventListener("input", (e) => {
        if (e.target.closest(".form-group").classList.contains("error")) {
          this.clearError(e.target);
        }
      });
    });

    // Validar todo el formulario al hacer submit
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validateForm();
    });
  }

  /**
   * Valida un campo individual
   * @param {HTMLElement} field - El campo a validar
   * @returns {boolean} - True si es válido, False si tiene error
   */
  /*
  validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest(".form-group");
    const fieldName = field.getAttribute("data-field");

    if (!value) {
      this.showError(field, this.errorMessages[fieldName]);
      return false;
    }

    // Validación adicional para email
    if (field.type === "email" && !this.isValidEmail(value)) {
      this.showError(field, this.errorMessages[fieldName]);
      return false;
    }

    this.clearError(field);
    return true;
  }

  /**
   * Muestra el error en un campo
   * @param {HTMLElement} field - El campo donde mostrar el error
   * @param {string} message - El mensaje de error
   */
  /*
  showError(field, message) {
    const formGroup = field.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");

    formGroup.classList.add("error");
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  /**
   * Limpia el error de un campo
   * @param {HTMLElement} field - El campo a limpiar
   */
  /*
  clearError(field) {
    const formGroup = field.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");

    formGroup.classList.remove("error");
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  /**
   * Valida que un email tenga formato correcto
   * @param {string} email - El email a validar
   * @returns {boolean}
   */
  /*
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida todo el formulario
   * @returns {boolean} - True si el formulario es válido
   */
  /*
  validateForm() {
    let isValid = true;

    this.fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm();
    }

    return isValid;
  }

  /**
   * Envía el formulario (aquí se puede agregar lógica adicional)
   */
  /*
  submitForm() {
    const formData = {
      name: document.getElementById("full-name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };
    console.log(formData);
    this.form.reset();
  }
}
