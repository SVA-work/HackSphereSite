document.addEventListener("DOMContentLoaded", () => {
  function createCountdown() {
    let countdownContainer = document.querySelector(".countdown-container");

    if (!countdownContainer) {
      countdownContainer = document.createElement("div");
      countdownContainer.className = "countdown-container";
      countdownContainer.innerHTML = `
        <div class="countdown-title">До следующего хакатона:</div>
        <div class="countdown-timer">
          <div class="countdown-item">
            <div class="countdown-number" id="countdown-days">00</div>
            <div class="countdown-label">Дней</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number" id="countdown-hours">00</div>
            <div class="countdown-label">Часов</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number" id="countdown-minutes">00</div>
            <div class="countdown-label">Минут</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number" id="countdown-seconds">00</div>
            <div class="countdown-label">Секунд</div>
          </div>
        </div>
      `;

      document.body.appendChild(countdownContainer);

      startCountdown();
    }
  }

  function startCountdown() {
    const daysElement = document.getElementById("countdown-days");
    const hoursElement = document.getElementById("countdown-hours");
    const minutesElement = document.getElementById("countdown-minutes");
    const secondsElement = document.getElementById("countdown-seconds");

    let eventDate;
    const savedEventDate = localStorage.getItem("hackSphereEventDate");

    if (savedEventDate) {
      eventDate = new Date(parseInt(savedEventDate));
    } else {
      const currentDate = new Date();
      eventDate = new Date();
      eventDate.setMonth(currentDate.getMonth() + 3);
      localStorage.setItem("hackSphereEventDate", eventDate.getTime().toString());
    }

    function updateCountdown() {
      const currentTime = new Date();
      const difference = eventDate - currentTime;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, "0");
        hoursElement.textContent = hours.toString().padStart(2, "0");
        minutesElement.textContent = minutes.toString().padStart(2, "0");
        secondsElement.textContent = seconds.toString().padStart(2, "0");
      } else {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  createCountdown();
  initNotificationPopup();

  function initNotificationPopup() {
      const popupShown = localStorage.getItem("hackSpherePopupShown")

      if (popupShown) {
        return
      }

      if (document.querySelector(".notification-popup")) {
        return
      }

      const notificationPopup = document.createElement("div")
      notificationPopup.className = "notification-popup"
      notificationPopup.innerHTML = `
        <div class="notification-popup__overlay"></div>
        <div class="notification-popup__content">
          <button class="notification-popup__close" id="notification-popup-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          <h3 class="notification-popup__title">Готовы к хакатону?</h3>
          <p class="notification-popup__text">Поздравляем! Вы на шаг ближе к хакатону. Готовьте идеи и команду!</p>
          <button class="notification-popup__button" id="notification-popup-button">Понятно</button>
        </div>
      `

      document.body.appendChild(notificationPopup)

      const popupTimerStarted = sessionStorage.getItem("hackSpherePopupTimerStarted")

      if (!popupTimerStarted) {
        sessionStorage.setItem("hackSpherePopupTimerStarted", "true")

        setTimeout(() => {
          notificationPopup.classList.add("active")

          localStorage.setItem("hackSpherePopupShown", "true")
        }, 30000)
      }

      const closeButton = document.getElementById("notification-popup-close")
      const actionButton = document.getElementById("notification-popup-button")
      const overlay = notificationPopup.querySelector(".notification-popup__overlay")

      function closePopup() {
        notificationPopup.classList.remove("active")

        setTimeout(() => {
          notificationPopup.remove()
        }, 500)
      }

      closeButton.addEventListener("click", closePopup)
      actionButton.addEventListener("click", closePopup)
      overlay.addEventListener("click", closePopup)

      document.addEventListener("keydown", (e) => {
        if (notificationPopup.classList.contains("active") && e.key === "Escape") {
          closePopup()
        }
      })
    }
  })