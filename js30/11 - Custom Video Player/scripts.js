let video = document.querySelector("video");
let volumeBtn = document.querySelector("input[name='volume']");
let rateBtn = document.querySelector("input[name='playbackRate']");
let playButton = document.querySelector("button.toggle");
let seekButtons = document.querySelectorAll("button[data-skip]");
let progressBar = document.querySelector("div.progress__filled");

function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.textContent = "\u23f8";
  } else {
    video.pause();
    playButton.textContent = "►";
  }
}

function handleSeek(e) {
  video.currentTime += parseFloat(this.getAttribute("data-skip"));
}


function handleVolume() {
  video.volume = this.value;
}

function handlePlaybackRate() {
  video.playbackRate = this.value;
}

function handleProgress() {
  let progress = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${progress}%`;
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    togglePlay();
  }
});
video.addEventListener("click", togglePlay);
playButton.addEventListener("click", togglePlay);
seekButtons.forEach((btn) => {
  btn.addEventListener("click", handleSeek);
});
volumeBtn.addEventListener("change", handleVolume);
rateBtn.addEventListener("change", handlePlaybackRate);
video.addEventListener('timeupdate', handleProgress);
