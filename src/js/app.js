"use strict";

// Handle Modal Entrance Animation on Page Load
const moduleDiv = document.querySelector("#auth-box");
let test = false;
window.addEventListener("DOMContentLoaded", function () {
  if (test) {
    moduleDiv.classList.replace("modal-final-state", "modal-initial-state");
    // moduleDiv.classList.remove("modal-final-state");
    // moduleDiv.classList.add("modal-initial-state");
    test = false;
  } else {
    moduleDiv.classList.replace("modal-initial-state", "modal-final-state");
    // moduleDiv.classList.remove("modal-initial-state");
    // moduleDiv.classList.add("modal-final-state");
    test = true;
  }
});

// Auth View Switcher: Handles UI toggling, sound effects, and state management

const btnAuth = document.querySelectorAll(".view-btn");
const bgActive = document.querySelector("#active-bg");
let authStatus = ["login"];

// 1. Function to sync background position and width
function syncActiveBg(element) {
  if (!element) return;
  bgActive.style.left = `${element.offsetLeft}px`;
  bgActive.style.width = `${element.offsetWidth}px`;
}

// 2. Helper to find the currently active button
function getActiveBtn() {
  return document.querySelector(".view-btn.color-text");
}

// 3. Sync on Page Load (Ensures initial position is perfect)
window.addEventListener("load", () => {
  syncActiveBg(getActiveBtn());
});

// 4. Sync on Window Resize (Responsive fix)
window.addEventListener("resize", () => {
  syncActiveBg(getActiveBtn());
});

// Setup audio effect
const clickSound = new Audio("./src/sounds/computer-mouse-click-351398.mp3");
clickSound.volume = 0.4;

btnAuth.forEach((item) => {
  item.addEventListener("click", function () {
    let temp = Object.values(item.dataset)[0];

    // Play sound on click
    clickSound.currentTime = 0;
    clickSound.play();

    // Sync active background position and width
    bgActive.style.left = `${item.offsetLeft}px`;
    bgActive.style.width = `${item.offsetWidth}px`;

    // Reset styles for all buttons
    btnAuth.forEach((btn) => {
      btn.classList.remove("color-text", "font-bold");
    });

    // Apply active styles to clicked button
    item.classList.add("color-text", "font-bold");

    // Update authStatus array logic
    if (temp !== authStatus[0]) {
      authStatus.pop();
      authStatus.push(temp);
    }

    console.log(authStatus);

    const formWrapper = document.querySelector("#form-wrapper");

    // داخل تابع کلیک دکمه‌ها:
    if (temp === "outlin") {
      // جابه‌جایی به سمت فرم ثبت‌نام
      formWrapper.style.transform = "translateX(-50%)"; // بسته به جهت RTL/LTR تنظیم شود
    } else {
      // برگشت به فرم ورود
      formWrapper.style.transform = "translateX(0)";
    }
  });
});

// Input Validation Logic: Handles username and password constraints
const passwordInput = document.querySelector("#password-input");
const togglePassword = document.querySelector("#toggle-password");
// انتخاب تمام دکمه‌های چشم
const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    // پیدا کردن اینپت رمزی که دقیقاً کنار همین دکمه است
    const input = this.parentElement.querySelector("input");
    const icon = this.querySelector("i");

    // تغییر وضعیت
    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});
