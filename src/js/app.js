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

    item.classList.add("color-text", "font-bold");

    if (temp !== authStatus[0]) {
      authStatus.pop();
      authStatus.push(temp);
    }

    console.log(authStatus);

    const formWrapper = document.querySelector("#form-wrapper");

    if (temp === "outlin") {
      formWrapper.style.transform = "translateX(-50%)"; // بسته به جهت RTL/LTR تنظیم شود
    } else {
      formWrapper.style.transform = "translateX(0)";
    }
  });
});

// Input Validation Logic: Handles username and password constraints

const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const input = this.parentElement.querySelector("input");
    const icon = this.querySelector("i");

    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});
// ۱. تابع مدیریت نمایش خطا (بوردر قرمز و متن خطا)
function setErrorMessage(inputElement, message) {
  const container = inputElement.closest("div");

  const parent = container.classList.contains("relative")
    ? container.parentElement
    : container;
  const errorDiv = parent.querySelector(".error-msg");

  if (message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
    inputElement.classList.add("border-red-500");
  } else {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
    inputElement.classList.remove("border-red-500");
  }
}

// ۲. تابع بررسی قوانین پیچیدگی رمز عبور
function validatePassword(password) {
  const hasPersian = /[\u0600-\u06FF]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 8;

  if (hasPersian) return "رمز عبور نباید شامل حروف فارسی باشد.";
  if (!hasUpper) return "حداقل یک حرف بزرگ انگلیسی لازم است.";
  if (!hasNumber) return "حداقل یک عدد لازم است.";
  if (!isLongEnough) return "رمز باید حداقل ۸ کاراکتر باشد.";
  return true;
}

// ۳. اعتبار‌سنجی نام کاربری (برای هر دو فرم ورود و ثبت‌نام)
document.querySelectorAll("input[type='text']").forEach((input) => {
  input.addEventListener("input", function () {
    const hasNumber = /\d/.test(this.value);

    if (this.value.trim() === "") {
      setErrorMessage(this, "نام کاربری نمی‌تواند خالی باشد.");
    } else if (hasNumber) {
      setErrorMessage(this, "نام کاربری نباید شامل عدد باشد.");
    } else {
      setErrorMessage(this, null);
    }
  });
});

// ۴. اعتبار‌سنجی رمزها (ورود و ثبت‌نام)
const registerUser = document.querySelector("#reg-username");
const registerPass = document.querySelector("#reg-password");
const confirmPass = document.querySelector("#reg-confirm");

document.querySelectorAll(".pass-input").forEach((input) => {
  input.addEventListener("input", function () {
    const result = validatePassword(this.value);

    if (this.value === "") {
      setErrorMessage(this, "فیلد رمز نمی‌تواند خالی باشد.");
    } else if (result !== true) {
      setErrorMessage(this, result);
    } else {
      setErrorMessage(this, null);
    }

    if (this === registerPass && confirmPass && confirmPass.value !== "") {
      confirmPass.dispatchEvent(new Event("input"));
    }
  });
});

// ۵. منطق اختصاصی تکرار رمز (فقط در ثبت‌نام)
if (confirmPass) {
  confirmPass.addEventListener("input", function () {
    const result = validatePassword(this.value);

    if (this.value === "") {
      setErrorMessage(this, "لطفاً تکرار رمز را وارد کنید.");
    } else if (result !== true) {
      setErrorMessage(this, result);
    } else if (this.value !== registerPass.value) {
      setErrorMessage(this, "رمز عبور با تکرار آن مطابقت ندارد.");
    } else {
      setErrorMessage(this, null);
    }
  });
}

// sing up
// ۱. انتخاب فرم (مطمئن شو که در HTML آیدی فرمت دقیقاً همین است)
const registerForm = document.querySelector("#register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    // اول از همه جلوی رفرش را محکم بگیر!
    e.preventDefault();

    console.log("سابمیت شروع شد...");

    try {
      const usernameInput = registerUser;
      const passwordInput = registerPass;

      if (!usernameInput || !passwordInput) {
        console.error("اینپت‌ها پیدا نشدند!");
        return;
      }

      const usernameValue = usernameInput.value;
      const passwordValue = passwordInput.value;

      // ۳. بررسی ارورها (با استفاده از trim برای حذف فضاهای خالی مخفی)
      const errors = document.querySelectorAll("#register-form .error-msg");
      let hasError = false;

      errors.forEach((err) => {
        // اگر متن داشت و کلاس hidden هم نداشت، یعنی واقعاً ارور نمایش داده شده
        if (err.innerText.trim() !== "" && !err.classList.contains("hidden")) {
          hasError = true;
        }
      });

      if (hasError) {
        showToast("لطفاً خطاهای فرم را برطرف کنید", "error");
        return;
      }

      // ۴. ذخیره‌سازی
      const newUser = {
        username: usernameValue,
        password: passwordValue,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      showToast("ثبت‌نام با موفقیت انجام شد! خوش آمدید.", "success");

      // اگر تابعی برای جابجایی فرم داری اینجا صدا بزن
      // showLoginForm();
      // لغزش خودکار به سمت فرم ورود
      const loginTabBtn = document.querySelector('[data-login="login"]');
      if (loginTabBtn) {
        loginTabBtn.click(); // این کار دقیقاً مثل این است که کاربر روی دکمه ورود کلیک کرده باشد
      }
      registerForm.reset(); // فرم را هم خالی کن که برای نفر بعدی آماده باشد
    } catch (error) {
      // اگر هر اروری در مراحل بالا رخ دهد، اینجا چاپ می‌شود و صفحه رفرش نمی‌شود
      console.error("خطای سیستمی:", error);
    }
  });
}

/// pop-up

function showToast(message, type = "success") {
  const container = document.querySelector("#toast-container");

  const toast = document.createElement("div");

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-x-[-150%] flex items-center space-x-3 rtl:space-x-reverse`;

  toast.innerHTML = `
    <i class="fa-solid ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.replace("translate-x-[-150%]", "translate-x-0");
  }, 100);

  setTimeout(() => {
    toast.classList.replace("translate-x-0", "translate-x-[-150%]");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

//// login

const loginForm = document.querySelector("#login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // ۱. گرفتن مقادیر وارد شده (حتماً چک کن آیدی‌ها در HTML درست باشند)
    const userVal = document.querySelector("#login-username").value;
    const passVal = document.querySelector("#login-password").value;

    // ۲. خواندن دیتا از LocalStorage
    const savedData = localStorage.getItem("user");

    if (savedData) {
      const user = JSON.parse(savedData);

      // ۳. چک کردن صحت اطلاعات
      if (user.username === userVal && user.password === passVal) {
        showToast(`خوش آمدی ${user.username}!`, "success");

        // ۴. حذف دایو اصلی پس‌زمینه (Overlay)
        const authOverlay = document.querySelector("#auth-overlay");

        if (authOverlay) {
          // اضافه کردن یک انیمیشن محو شدن نرم (اختیاری اما قشنگ)
          authOverlay.style.transition = "all 0.5s ease";
          authOverlay.style.opacity = "0";
          authOverlay.style.visibility = "hidden";

          // حذف کامل از DOM بعد از اتمام انیمیشن
          setTimeout(() => {
            authOverlay.remove();
          }, 500);

          showToast("ورود موفقیت‌آمیز بود.", "success");
        }
      } else {
        showToast("نام کاربری یا رمز عبور اشتباه است!", "error");
      }
    } else {
      showToast("ابتدا باید ثبت‌نام کنید!", "error");
    }
  });
}
