const root = document.documentElement;
const themeInputs = document.querySelectorAll('input[name="theme"]');

root.classList.add("js-enabled");

/*Apply localStorage for theme persists across page loads and across pages */
let current;
try {
  current = localStorage.getItem("theme") || "auto";
} catch (e) {
  current = "auto";
}

themeInputs.forEach((input) => {
  input.checked = input.value === current;
  input.addEventListener("change", (event) => {
    const choice = event.target.value;
    if (choice === "auto") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", choice);
    }
    try {
      localStorage.setItem("theme", choice);
    } catch (e) {}
  });
});
