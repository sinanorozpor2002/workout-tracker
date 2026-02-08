const themeToggleBtn = document.querySelector("#theme-toggle");
const htmlElement = document.documentElement;

const toggleTheme = () => {
  // موقع تغییر دستی، انیمیشن فعال باشه
  htmlElement.classList.remove("no-transition");

  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
};

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", toggleTheme);
}

// این بخش رو جوری نوشتم که پرش لحظه‌ای نداشته باشی
(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    // اضافه کردن موقتی این کلاس باعث می‌شه سایت بدون انیمیشنِ "پرش رنگ" لود بشه
    htmlElement.classList.add("no-transition");
    htmlElement.classList.add("dark");

    // بعد از لود کامل، کلاس رو برمی‌داریم که انیمیشن دکمه کار کنه
    setTimeout(() => {
      htmlElement.classList.remove("no-transition");
    }, 100);
  }
})();
