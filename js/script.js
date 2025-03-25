document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (menuToggle && mobileMenu && menuIcon && closeIcon) {
    mobileMenu.style.display = "none";
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";

    menuToggle.addEventListener("click", () => {
      if (mobileMenu.style.display === "none") {
        mobileMenu.style.display = "block";
      } else {
        mobileMenu.style.display = "none";
      }

      if (menuIcon.style.display === "none") {
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
      } else {
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
      }
    });
  }
});