
script.js

let c = 0;

document.getElementById("plus").onclick = () => {
  c++;
  document.getElementById("count").innerText = c;
};

document.getElementById("reset").onclick = () => {
  c = 0;
  document.getElementById("count").innerText = c;
};
