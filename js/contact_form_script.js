document.getElementById('contactForm').setAttribute('novalidate', '');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        if (validateForm()) {
            alert('Форма успешно отправлена!');
            form.reset();
        }
    });

    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });

    function validateForm() {
        let isValid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function validateField(field) {
        const errorElement = field.nextElementSibling;

        if (field.validity.valid && (!field.pattern || new RegExp(field.pattern).test(field.value))) {
            errorElement.classList.add('hidden');
            field.classList.remove('error');
            return true;
        } else {
            showError(field, errorElement);
            return false;
        }
    }

    function showError(field, errorElement) {
        field.classList.add('error');

        if (field.validity.valueMissing) {
            errorElement.textContent = 'Это поле обязательно для заполнения';
        } else if (field.validity.tooShort) {
            errorElement.textContent = `Минимальная длина: ${field.minLength} символов`;
        } else if (field.validity.tooLong) {
            errorElement.textContent = `Максимальная длина: ${field.maxLength} символов`;
        } else if (field.validity.typeMismatch) {
            errorElement.textContent = 'Неверный формат данных';
        } else if (field.pattern && !new RegExp(field.pattern).test(field.value)) {
            errorElement.textContent = field.title || 'Неверный формат';
        }

        errorElement.classList.remove('hidden');
    }

    function clearErrors() {
        form.querySelectorAll('.form-error-message').forEach(el => {
            el.classList.add('hidden');
        });
        form.querySelectorAll('input, textarea').forEach(field => {
            field.classList.remove('error');
        });
    }
});