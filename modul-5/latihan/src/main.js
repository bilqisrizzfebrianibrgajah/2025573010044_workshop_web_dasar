import "./style.css";
const btn = document.getElementById("dark-mode-toggle");
const html = document.documentElement;
const lightIcon = btn.querySelector(".light-icon");
const darkIcon = btn.querySelector(".dark-icon");

// Cek preferensi tersimpan
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
  updateIcon(true);
} else {
  updateIcon(false);
}

function updateIcon(isDark) {
  if (isDark) {
    lightIcon.classList.add("hidden");
    darkIcon.classList.remove("hidden");
  } else {
    lightIcon.classList.remove("hidden");
    darkIcon.classList.add("hidden");
  }
}

btn.addEventListener("click", () => {
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  updateIcon(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
