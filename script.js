// --- Zikirmatik Script.js Tüm Esmalar Dahil ---

let count = 0;
let target = 0;

// Esmalar listesi (99 Esma)
const esmalar = [
  "Allah", "Er-Rahman", "Er-Rahim", "El-Melik", "El-Kuddus",
  "Es-Selam", "El-Mümin", "El-Müheymin", "El-Aziz", "El-Cebbar",
  "El-Mütekebbir", "El-Halik", "El-Bari", "El-Musavvir", "El-Gaffar",
  "El-Kahhar", "El-Vehhab", "Er-Rezzak", "El-Fettah", "El-Alim",
  "El-Kabid", "El-Basit", "El-Hafid", "Er-Rafi", "El-Muiz",
  "El-Muzil", "Es-Semi", "El-Basir", "El-Hakem", "El-Adl",
  "El-Latif", "El-Habir", "El-Halim", "El-Azim", "El-Gafur",
  "Eş-Şekur", "El-Ali", "El-Kebir", "El-Hafiz", "El-Mukit",
  "El-Hasib", "El-Celil", "El-Kerim", "Er-Raqib", "El-Mucib",
  "El-Vasi", "El-Hakim", "El-Vedud", "El-Mecid", "El-Bais",
  "Eş-Şehid", "El-Hakk", "El-Vekil", "El-Kavi", "El-Metin",
  "El-Veliy", "El-Hamid", "El-Muhsi", "El-Mubdi", "El-Muid",
  "El-Muhyi", "El-Mumit", "El-Hayy", "El-Kayyum", "El-Vahid",
  "Es-Samed", "El-Kadir", "El-Muktedir", "El-Mukaddim", "El-Muahhir",
  "El-Evvel", "El-Ahir", "Ez-Zahir", "El-Batin", "El-Vali",
  "El-Müteali", "El-Berr", "Et-Tevvab", "El-Müntekim", "El-Afüv",
  "Er-Rauf", "Malikü’l-Mülk", "Zü’l-Celali vel-Ikram", "El-Muksit",
  "El-Cami", "El-Gani", "El-Muğni", "El-Mani", "Ed-Darr",
  "En-Nafi", "En-Nur", "El-Hadi", "El-Bedi", "El-Baki",
  "El-Varıs", "Er-Reşid", "Es-Sabur"
];

// DOM elementleri
const counterEl = document.getElementById("count");
const plusBtn = document.getElementById("plus");
const resetBtn = document.getElementById("reset");
const targetInput = document.getElementById("target");
const saveTargetBtn = document.getElementById("saveTarget");
const ding = document.getElementById("ding");

// Artırma ve sıfırlama
plusBtn.onclick = () => { count++; update(); };
resetBtn.onclick = () => { count = 0; update(); };

// Hedef sayıyı kaydet
saveTargetBtn.onclick = () => {
  target = Number(targetInput.value);
  alert("Hedef kaydedildi: " + target);
};

// Güncelleme fonksiyonu
function update() {
  counterEl.innerText = count;

  if (navigator.vibrate) navigator.vibrate(80);

  if (target > 0 && count >= target) {
    ding.play();
    alert("Hedef tamamlandı!");
  }
}

// --- SESLİ SAYMA ---
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
      for (let esma of esmalar) {
        if (last.includes(esma.toLowerCase())) {
          count++;
          update();
          break;
        }
      }
    };

    recognition.start();
    alert("Sesli sayma başladı. Esmaları söylediğinizde otomatik sayılacak.");
  } catch (err) {
    alert("Mikrofona izin verin: " + err);
  }
};

document.getElementById("stopVoice").onclick = () => {
  if (recognition) recognition.stop();
  alert("Sesli sayma durduruldu.");
};
