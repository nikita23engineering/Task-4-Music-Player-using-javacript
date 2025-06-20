const songs = [
  {
    name: "song1.mp3",
    title: "Sunny Day",
    artist: "Free Music"
  },
  {
    name: "song2.mp3",
    title: "Calm Breeze",
    artist: "Free Music"
  },
  {
    name: "song3.mp3",
    title: "Gentle Waves",
    artist: "Free Music"
  }
];

let songIndex = 0;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

loadSong(songs[songIndex]);

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `songs/${song.name}`;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  isPlaying = false;
}

let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
  if (!audio.duration) return;
  const { currentTime, duration } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});
