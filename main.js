  const emojis = ['☺️', '🔫', '💯', '👤', '🦁', '🌖', '🌎', '☄️'];
  let cards = [...emojis, ...emojis];
  const gameBoard = document.getElementById('gameBoard');
  const winMessage = document.getElementById('winMessage');
  const timerButton = document.getElementById('timer');
  const shochikDisplay = document.getElementById('shochikDisplay');

  let ochilgan = [];
  let topilgan = 0;
  let shochik = 0;
  let timeInSeconds = 60;
  let timerInterval;

  function aralashtir(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function yaratish(emoji, index) {
    const karta = document.createElement('div');
    karta.className = 'card';
    karta.dataset.emoji = emoji;
    karta.dataset.index = index;
    karta.onclick = kartaBosildi;
    gameBoard.appendChild(karta);
  }

  function yangilashShochik() {
    shochikDisplay.textContent = `Shochik: ${shochik}`;
  }

  function oyinBoshlash() {
    gameBoard.innerHTML = '';
    winMessage.style.display = 'none';
    ochilgan = [];
    topilgan = 0;
    shochik = 0;
    yangilashShochik();
    cards = [...emojis, ...emojis];
    aralashtir(cards);
    cards.forEach(yaratish);
  }

  function kartaBosildi() {
    if (
      this.classList.contains('flipped') ||
      this.classList.contains('matched') ||
      ochilgan.length === 2
    ) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.emoji;
    ochilgan.push(this);

    if (ochilgan.length === 2) {
      setTimeout(tekshir, 1000);
    }
  }

  function tekshir() {
    const [birinchi, ikkinchi] = ochilgan;
    const birXil = birinchi.dataset.emoji === ikkinchi.dataset.emoji;

    if (birXil) {
      birinchi.classList.add('matched');
      ikkinchi.classList.add('matched');
      topilgan++;

      shochik++; 
      yangilashShochik();

      if (topilgan === emojis.length) {
        winMessage.style.display = 'block';
        clearInterval(timerInterval);
      }
    } else {
      [birinchi, ikkinchi].forEach(k => {
        k.classList.remove('flipped');
        k.innerText = '';
      });
    }

    ochilgan = [];
  }

  function updateTimer() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerButton.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeInSeconds > 0) {
      timeInSeconds--;
    } else {
      clearInterval(timerInterval);
      alert("⏰ Vaqt tugadi! O‘yin boshidan boshlanadi.");
      restartGame();
    }
  }

  function restartGame() {
    timeInSeconds = 60;
    timerButton.textContent = "01:00";
    gameBoard.classList.add('shock');

    setTimeout(() => {
      gameBoard.classList.remove('shock');
    }, 300);

    oyinBoshlash();
    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  }

  // Boshlanish
  oyinBoshlash();
  startTimer();
