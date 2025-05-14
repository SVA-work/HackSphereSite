document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const galleryPopup = document.getElementById("gallery-popup")
  const galleryPopupOverlay = document.getElementById("gallery-popup__overlay")
  const galleryPopupClose = document.getElementById("gallery-popup__close")
  const galleryPopupImage = document.getElementById("gallery-popup__image")
  const galleryPopupPrev = document.getElementById("gallery-popup__nav--prev")
  const galleryPopupNext = document.getElementById("gallery-popup__nav--next")

  let currentImageIndex = 0
  const totalImages = galleryItems.length

  function openGalleryPopup(index) {
    currentImageIndex = index
    const imgSrc = galleryItems[index].querySelector("img").src
    const imgAlt = galleryItems[index].querySelector("img").alt

    galleryPopupImage.src = imgSrc
    galleryPopupImage.alt = imgAlt

    galleryPopup.classList.add("active")
    document.body.style.overflow = "hidden"

    updateNavigationButtons()
  }

  function closeGalleryPopup() {
    galleryPopup.classList.remove("active")
    document.body.style.overflow = ""
  }

  function updateNavigationButtons() {
    if (currentImageIndex === 0) {
      galleryPopupPrev.classList.add("gallery-popup__nav--hidden")
    } else {
      galleryPopupPrev.classList.remove("gallery-popup__nav--hidden")
    }

    if (currentImageIndex === totalImages - 1) {
      galleryPopupNext.classList.add("gallery-popup__nav--hidden")
    } else {
      galleryPopupNext.classList.remove("gallery-popup__nav--hidden")
    }
  }

  function showPreviousImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--
      const imgSrc = galleryItems[currentImageIndex].querySelector("img").src
      const imgAlt = galleryItems[currentImageIndex].querySelector("img").alt

      galleryPopupImage.src = imgSrc
      galleryPopupImage.alt = imgAlt

      updateNavigationButtons()
    }
  }

  function showNextImage() {
    if (currentImageIndex < totalImages - 1) {
      currentImageIndex++
      const imgSrc = galleryItems[currentImageIndex].querySelector("img").src
      const imgAlt = galleryItems[currentImageIndex].querySelector("img").alt

      galleryPopupImage.src = imgSrc
      galleryPopupImage.alt = imgAlt

      updateNavigationButtons()
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openGalleryPopup(index))
  })

  galleryPopupClose.addEventListener("click", closeGalleryPopup)
  galleryPopupOverlay.addEventListener("click", closeGalleryPopup)
  galleryPopupPrev.addEventListener("click", showPreviousImage)
  galleryPopupNext.addEventListener("click", showNextImage)

  document.addEventListener("keydown", (e) => {
    if (galleryPopup.classList.contains("active")) {
      if (e.key === "Escape") {
        closeGalleryPopup()
      } else if (e.key === "ArrowLeft") {
        showPreviousImage()
      } else if (e.key === "ArrowRight") {
        showNextImage()
      }
    }

    if (contactPopup.classList.contains("active") && e.key === "Escape") {
      closeContactPopup()
    }

    if (messagePopup.classList.contains("active") && e.key === "Escape") {
      closeMessagePopup()
    }
  })
})
