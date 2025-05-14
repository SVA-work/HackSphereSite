document.addEventListener("DOMContentLoaded", () => {
  const contactPopupForm = document.getElementById("contactPopupForm")
  const nameInput = document.getElementById("popupName")
  const emailInput = document.getElementById("popupEmail")
  const phoneInput = document.getElementById("popupPhone")
  const messageInput = document.getElementById("popupMessage")

  const nameError = document.getElementById("popupNameError")
  const emailError = document.getElementById("popupEmailError")
  const phoneError = document.getElementById("popupPhoneError")
  const messageError = document.getElementById("popupMessageError")

  const submitButton = document.getElementById("popupSubmitButton")

  if (
    !contactPopupForm ||
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !messageInput ||
    !nameError ||
    !emailError ||
    !phoneError ||
    !messageError ||
    !submitButton
  ) {
    console.error("Не найдены необходимые элементы формы")
    return
  }

  const nameRegex = /^[А-Яа-яЁё\s]{2,50}$/
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  const phoneRegex = /^\+7\s$$\d{3}$$\s\d{3}-\d{2}-\d{2}$/

  function validateName() {
    const name = nameInput.value.trim()

    if (name === "") {
      nameError.textContent = "Пожалуйста, введите ваше имя"
      nameInput.classList.add("error")
      return false
    } else if (!nameRegex.test(name)) {
      nameError.textContent = "Имя должно содержать только русские буквы"
      nameInput.classList.add("error")
      return false
    } else {
      nameError.textContent = ""
      nameInput.classList.remove("error")
      return true
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim()

    if (email === "") {
      emailError.textContent = "Пожалуйста, введите ваш email"
      emailInput.classList.add("error")
      return false
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Пожалуйста, введите корректный email"
      emailInput.classList.add("error")
      return false
    } else {
      emailError.textContent = ""
      emailInput.classList.remove("error")
      return true
    }
  }

  function validatePhone() {
    const phone = phoneInput.value.trim()

    if (phone == "") {
      phoneError.textContent = "Пожалуйста, введите ваш телефон"
      phoneInput.classList.add("error")
      return false
    } else if (!phoneRegex.test(phone)) {
      phoneError.textContent = "Формат: +7 (123) 456-78-90"
      phoneInput.classList.add("error")
      return false
    } else {
      phoneError.textContent = ""
      phoneInput.classList.remove("error")
      return true
    }
  }

  function validateMessage() {
    const message = messageInput.value.trim()

    if (message === "") {
      messageError.textContent = "Пожалуйста, введите ваше сообщение"
      messageInput.classList.add("error")
      return false
    } else if (message.length < 10) {
      messageError.textContent = "Сообщение должно содержать не менее 10 символов"
      messageInput.classList.add("error")
      return false
    } else {
      messageError.textContent = ""
      messageInput.classList.remove("error")
      return true
    }
  }

  function formatPhone(e) {
    const value = e.target.value.replace(/\D/g, "")

    if (value.length <= 1) {
      e.target.value = value === "" ? "" : "+7 "
    } else if (value.length <= 4) {
      e.target.value = `+7 (${value.substring(1, 4)}`
    } else if (value.length <= 7) {
      e.target.value = `+7 (${value.substring(1, 4)}) ${value.substring(4, 7)}`
    } else if (value.length <= 9) {
      e.target.value = `+7 (${value.substring(1, 4)}) ${value.substring(4, 7)}-${value.substring(7, 9)}`
    } else {
      e.target.value = `+7 (${value.substring(1, 4)}) ${value.substring(4, 7)}-${value.substring(7, 9)}-${value.substring(9, 11)}`
    }
  }

  nameInput.addEventListener("blur", validateName)
  emailInput.addEventListener("blur", validateEmail)
  phoneInput.addEventListener("blur", validatePhone)
  messageInput.addEventListener("blur", validateMessage)

  phoneInput.addEventListener("input", formatPhone)

  contactPopupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const isNameValid = validateName()
    const isEmailValid = validateEmail()
    const isPhoneValid = validatePhone()
    const isMessageValid = validateMessage()

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      submitButton.textContent = "Отправляем..."
      submitButton.classList.add("form-submit-button--sending")
      submitButton.disabled = true

      setTimeout(() => {
        submitButton.textContent = "Успешно отправлено"
        submitButton.classList.remove("form-submit-button--sending")
        submitButton.classList.add("form-submit-button--success")

        setTimeout(() => {
          document.getElementById("contact-popup").classList.remove("active")
          contactPopupForm.reset()

          setTimeout(() => {
            submitButton.textContent = "Отправить"
            submitButton.classList.remove("form-submit-button--success")
            submitButton.disabled = false
          }, 500)
        }, 3000)
      }, 2000)
    }
  })

  const contactButton = document.getElementById("contact-button")
  const contactPopup = document.getElementById("contact-popup")
  const contactPopupOverlay = document.getElementById("contact-popup__overlay")
  const contactPopupClose = document.getElementById("contact-popup__close")

  if (contactButton && contactPopup && contactPopupOverlay && contactPopupClose) {
    contactButton.addEventListener("click", () => {
      contactPopup.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    contactPopupClose.addEventListener("click", () => {
      contactPopup.classList.remove("active")
      document.body.style.overflow = ""
    })

    contactPopupOverlay.addEventListener("click", () => {
      contactPopup.classList.remove("active")
      document.body.style.overflow = ""
    })

    document.addEventListener("keydown", (e) => {
      if (contactPopup.classList.contains("active") && e.key === "Escape") {
        contactPopup.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }
})
