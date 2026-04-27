import "./style.css";

const btn = document.getElementById("dark-mode-toggle");
const icon = document.getElementById("mode-icon");

btn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    icon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    icon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  icon.textContent = "☀️";
}
