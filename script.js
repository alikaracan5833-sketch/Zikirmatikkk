let count = 0;

const counter = document.getElementById("counter");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  count++;
  counter.textContent = count;

  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
});
