/**
 * ContactForm - Manejo validación, estados de error y mensajes personalizados
 * Incluye restricciones de integridad de datos
 */

class ContactForm {
  constructor(formId = "contactForm") {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.fields = this.form.querySelectorAll("[data-field]");

    // Mensajes de error - Validación de relleno
    this.errorMessages = {
      NAME: "Please, complete the field NAME with your name.",
      EMAIL: "Please, complete the field EMAIL with your email.",
      PHONE: "Please, complete the field PHONE with your phone number.",
      MESSAGE: "Please, complete the field MESSAGE with your message.",
    };

    // Restricciones de integridad de datos
    this.integrityRules = {
      NAME: {
        minLength: 3,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/, // Solo letras y espacios
        errorMessages: {
          minLength: "Name must be at least 3 characters.",
          maxLength: "Name cannot exceed 50 characters.",
          pattern: "Name can only contain letters and spaces.",
        },
      },
      EMAIL: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
          pattern: "Please enter a valid email address.",
        },
      },
      PHONE: {
        pattern: /^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/, // +34 666 777 888
        errorMessages: {
          pattern:
            "Phone must follow the format +CC XXX XXX XXX (e.g., +34 666 777 888).",
        },
      },
      MESSAGE: {
        minLength: 10,
        maxLength: 500,
        pattern: /^[^<>]*$/, // No permite < y >
        errorMessages: {
          minLength: "Message must be at least 10 characters.",
          maxLength: "Message cannot exceed 500 characters.",
          pattern: "Message contains invalid characters.",
        },
      },
    };

    this.init();
  }

  /**
   * Inicializa los event listeners para el formulario
   */

  init() {
    this.attachEventListeners();
  }

  /**
   * Adjunta los event listeners a los campos del formulario
   */

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

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute("data-field");

    // Validación 1: Campo requerido (relleno)
    if (!value) {
      this.showError(field, this.errorMessages[fieldName]);
      return false;
    }

    // Validación 2: Restricciones de integridad de datos
    const rules = this.integrityRules[fieldName];
    if (rules) {
      const integrityError = this.validateIntegrity(value, fieldName, rules);
      if (integrityError) {
        this.showError(field, integrityError);
        return false;
      }
    }

    this.clearError(field);
    return true;
  }

  /**
   * Valida las restricciones de integridad de datos
   * @param {string} value - Valor a validar
   * @param {string} fieldName - Nombre del campo
   * @param {Object} rules - Reglas de validación
   * @returns {string|null} - Mensaje de error o null si es válido
   */

  validateIntegrity(value, fieldName, rules) {
    // Validar longitud mínima
    if (rules.minLength && value.length < rules.minLength) {
      return rules.errorMessages.minLength;
    }

    // Validar longitud máxima
    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.errorMessages.maxLength;
    }

    // Validar patrón
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.errorMessages.pattern;
    }

    return null;
  }

  /**
   * Muestra el error en un campo
   * @param {HTMLElement} field - El campo donde mostrar el error
   * @param {string} message - El mensaje de error
   */

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

  clearError(field) {
    const formGroup = field.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");

    formGroup.classList.remove("error");
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  /**
   * Sanitiza datos para evitar inyecciones HTML/scripts
   * Método profesional y limpio
   * @param {string} data - Datos a sanitizar
   * @returns {string} - Datos sanitizados
   */

  sanitizeData(data) {
    const div = document.createElement("div");
    div.textContent = data;
    return div.innerHTML;
  }

  /**
   * Valida todo el formulario
   * @returns {boolean} - True si el formulario es válido
   */

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
   * Envía el formulario con datos sanitizados
   */

  submitForm() {
    const formData = {
      name: this.sanitizeData(
        document.getElementById("full-name").value.trim(),
      ),
      email: this.sanitizeData(document.getElementById("email").value.trim()),
      phone: this.sanitizeData(document.getElementById("phone").value.trim()),
      message: this.sanitizeData(
        document.getElementById("message").value.trim(),
      ),
    };
    console.log("Datos enviados (sanitizados):", formData);
    this.form.reset();
  }
}
