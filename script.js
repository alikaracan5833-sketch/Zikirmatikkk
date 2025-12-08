let count = 0;
let target = 0;

document.getElementById("plus").onclick = () => {
  count++;
  update();
};

document.getElementById("reset").onclick = () => {
  count = 0;
  update();
};

document.getElementById("saveTarget").onclick = () => {
  target = Number(document.getElementById("target").value);
  alert("Hedef kaydedildi: " + target);
};

function update() {
  document.getElementById("count").innerText = count;

  // Daha hızlı titreşim (çok kısa)
  if (navigator.vibrate) navigator.vibrate(40);

  if (target > 0 && count >= target) {
    document.getElementById("ding").play();
    alert("Hedef tamamlandı!");
  }
}

// --- SES TANIMA ---
let recognition;
document.getElementById("startVoice").onclick = async () => {
  try {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      let last = e.results[e.results.length - 1][0].transcript.toLowerCase();
      // Sadece ALLAH dediğinde +1
      if (last.includes("allah")) {
        count++;
        update();
      }
    };
    recognition.start();
    alert("Sesli sayma başlatıldı.");
  } catch (err) {
    alert("Mikrofon izni gerekli: " + err);
  }
};

document.getElementById("stopVoice").onclick = () => {
  if (recognition) recognition.stop();
  alert("Sesli sayma durduruldu.");
};

