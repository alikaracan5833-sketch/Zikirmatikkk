let count = 0;
let target = 0;

const tick = document.getElementById("tick");      // tok tespih sesi
const finish = document.getElementById("finish");  // ding-dong bitiş sesi

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

  // Her sayımda ORTA seviye titreşim
  if (navigator.vibrate) navigator.vibrate(50);

  // Her sayımda tok tespih sesi
  tick.currentTime = 0;
  tick.play();

  // Hedef tamamlandıysa
  if (target > 0 && count >= target) {
    // güçlü titreşim
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

    // ding-dong sesi
    finish.currentTime = 0;
    finish.play();

    alert("Hedef tamamlandı!");
  }
}

// Sesli sayma
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
      if (last.includes("allah")) {
        count++;
        update();
      }
    };

    recognition.start();
    alert("Sesli sayma başladı. 'Allah' deyince otomatik sayılacak.");
  } catch (err) {
    alert("Mikrofona izin verin: " + err);
  }
};

document.getElementById("stopVoice").onclick = () => {
  if (recognition) recognition.stop();
  alert("Sesli sayma durduruldu.");
};
