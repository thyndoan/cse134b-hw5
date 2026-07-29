const root = document.documentElement;
const themeInputs = document.querySelectorAll('input[name="theme"]');

root.classList.add("js-enabled");

themeInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    const choice = event.target.value;
    if (choice === "auto") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", choice);
    }
  });
});
