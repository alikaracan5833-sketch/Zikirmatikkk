// Yeni güvenilir sesli sayma akışı:
// 1) Önce getUserMedia ile mikrofon izni al (tarayıcı izin penceresini kesin çıkarır).
// 2) Sonra SpeechRecognition başlat.

const statusEl = (() => {
  let e = document.getElementById('status');
  if(!e){
    e = document.createElement('div'); e.id='status';
    e.style.marginTop='12px'; e.style.fontSize='14px';
    document.body.insertBefore(e, document.body.firstChild);
  }
  return e;
})();

let count = 0;
const countEl = document.getElementById('count');
const startBtn = document.getElementById('startVoice');
const stopBtn = document.getElementById('stopVoice');

function update() {
  countEl.innerText = count;
}
update();

let recognition = null;
let micStream = null;

async function ensureMicPermission() {
  try {
    // Bu çağrı tarayıcıya mikrofon izni penceresini kesin tetikler
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // mikrofon açık ama kullanmayacağız -> hemen durdur
    micStream.getTracks().forEach(t => t.stop());
    statusEl.innerText = 'Mikrofon izni verildi.';
    return true;
  } catch (err) {
    statusEl.innerText = 'Mikrofon izni yok veya hata: ' + (err.message || err);
    return false;
  }
}

startBtn.onclick = async () => {
  statusEl.innerText = 'İzin isteniyor...';
  const ok = await ensureMicPermission();
  if(!ok) return alert('Lütfen tarayıcı mikrofon iznini verin.');

  // SpeechRecognition var mı kontrol et
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR) {
    statusEl.innerText = 'Tarayıcı SpeechRecognition desteklemiyor (Chrome önerilir).';
    return alert('Tarayıcınız sesli tanımayı desteklemiyor. Chrome kullanın.');
  }

  recognition = new SR();
  recognition.lang = 'tr-TR';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => statusEl.innerText = 'Sesli sayma başladı — "Allah" deyin.';
  recognition.onend = () => statusEl.innerText = 'Sesli sayma durdu.';
  recognition.onerror = (e) => statusEl.innerText = 'Recognition hata: ' + (e.error || e.message);

  recognition.onresult = (e) => {
    const last = e.results[e.results.length - 1][0].transcript.toLowerCase();
    // kelime eşleşmesini ihtiyaç halinde genişlet
    if(last.includes('allah')) {
      count++; update();
      // hedef kontrol varsa çalıştır
      try { checkTarget && checkTarget(); } catch(_) {}
    }
  };

  try {
    recognition.start();
  } catch(err) {
    statusEl.innerText = 'Başlatma hatası: ' + (err.message || err);
  }
};

stopBtn.onclick = () => {
  if(recognition) recognition.stop();
  statusEl.innerText = 'Sesli sayma durduruldu (kullanıcı durdurdu).';
};
