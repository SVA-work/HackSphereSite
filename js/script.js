document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  if (menuToggle && mobileMenu && menuIcon && closeIcon) {
    mobileMenu.style.display = "none"
    closeIcon.style.display = "none"
    menuIcon.style.display = "block"

    menuToggle.addEventListener("click", () => {
      if (mobileMenu.style.display === "none") {
        mobileMenu.style.display = "block"
      } else {
        mobileMenu.style.display = "none"
      }

      if (menuIcon.style.display === "none") {
        menuIcon.style.display = "block"
        closeIcon.style.display = "none"
      } else {
        menuIcon.style.display = "none"
        closeIcon.style.display = "block"
      }
    })
  }

  const animatedLogo = document.getElementById("animated-logo")
  const header = document.querySelector(".header")
  let lastScrollTop = 0
  let headerFixed = false
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight

    if (scrollTop > windowHeight && !headerFixed) {
      header.classList.add("header--fixed")
      headerFixed = true
    } else if (scrollTop <= windowHeight && headerFixed) {
      header.classList.remove("header--fixed")
      headerFixed = false
    }

    if (animatedLogo) {
      const scrollPercentage = scrollTop / (document.body.scrollHeight - window.innerHeight)
      const rotation = scrollPercentage * 360
      animatedLogo.style.transform = `rotate(${rotation}deg)`
    }

    lastScrollTop = scrollTop
  })

  const logoIcon = document.querySelector(".logo-icon")

  if (logoIcon) {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.9
      const mouseY = e.clientY / window.innerHeight - 0.9

      logoIcon.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`
    })
  }

  const popupUtils = {
    openPopup: (popupId) => {
      const popup = document.querySelector(`.${popupId}`)
      if (popup) {
        popup.classList.add("active")
      }
    },

    closePopup: (popupId) => {
      const popup = document.querySelector(`.${popupId}`)
      if (popup) {
        popup.classList.remove("active")
      }
    },
  }
})
