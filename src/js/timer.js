const TIMER_PARAGRAPH = document.getElementById('timer');
const START_STOP_BUTTON = document.getElementById('start-stop-btn');
const RESET_BUTTON = document.getElementById('reset-btn');
const SOUND_TEST_BUTTON = document.getElementById('sound-test-btn');

let time = 0;
let runTimer = 0;
let timerId;

const AUDIO_FILE = new Audio('sound/Doorbell-Ding_Dong02-1.mp3');
AUDIO_FILE.load();
// When the audio file is loaded, start to play it.
AUDIO_FILE.addEventListener('loadedmetadata', () => {
  START_STOP_BUTTON.disabled = false;
});
// When the audio file could not be loaded, appear error message.
AUDIO_FILE.addEventListener('error', () => {
  START_STOP_BUTTON.textContent = 'Error: Loading failed';
});

START_STOP_BUTTON.addEventListener('click', () => {
  if (runTimer == 0) {
    START_STOP_BUTTON.textContent = 'Stop';
    runTimer = 1;
    RESET_BUTTON.disabled = true;
    SOUND_TEST_BUTTON.disabled = true;

    timerId = setInterval(() => {
      updateTimerParagraph(time);
      time += 1;
    }, 1000);
  } else {
    START_STOP_BUTTON.textContent = 'Start';
    runTimer = 0;
    RESET_BUTTON.disabled = false;
    SOUND_TEST_BUTTON.disabled = false;

    clearInterval(timerId);
  }
});

RESET_BUTTON.addEventListener('click', () => {
  RESET_BUTTON.disabled = true;
  SOUND_TEST_BUTTON.disabled = true;

  time = 0;
  updateTimerParagraph(time);
  clearInterval(timerId);
});

SOUND_TEST_BUTTON.addEventListener('click', () => {
  AUDIO_FILE.play();
});

/**
 * Update Timer Paragraph
 * @param {Integer} displayTime Current time
 */
function updateTimerParagraph(displayTime) {
  const min = Math.floor(displayTime / 60) % 60;
  const sec = displayTime % 60;
  console.log(`${min}:${sec}, displayTime: ${displayTime}`);
  TIMER_PARAGRAPH.textContent =
    `${min}:${('00' + sec).slice(-2)}`;
}
