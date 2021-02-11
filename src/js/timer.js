const TIMER_PARAGRAPH = document.getElementById('timer');
// const START_STOP_BUTTON = document.getElementById('start-stop-btn');
const RESET_BUTTON = document.getElementById('reset-btn');
const SOUND_TEST_BUTTON = document.getElementById('sound-test-btn');

let time = 0;
let runTimer = 0;
let timerId;

const AUDIO_FILE = new Audio('sound/Doorbell-Ding_Dong02-1.mp3');
AUDIO_FILE.load();
// When the audio file is loaded, start to play it.
AUDIO_FILE.addEventListener('loadedmetadata', () => {
  START_STOP_BUTTON.textContent = 'Start';
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
    disabledTimeButton(true);
    disabledTimeSelect(true);
    const [SELECTED_SEC_LIST, MAX_SEC] = getSelectedSec();
    console.log('SELECTED_SEC_LIST', SELECTED_SEC_LIST);

    timerId = setInterval(() => {
      time += 1;
      updateTimerParagraph(time);
      if (isSelectedSec(SELECTED_SEC_LIST, time) === true) {
        AUDIO_FILE.play();
      }
      if (MAX_SEC === time) {
        SOUND_TEST_BUTTON.disabled = false;
        stopTimer();
      }
    }, 1000);
  } else {
    SOUND_TEST_BUTTON.disabled = true;
    stopTimer();
  }
});

RESET_BUTTON.addEventListener('click', () => {
  RESET_BUTTON.disabled = true;
  SOUND_TEST_BUTTON.disabled = false;
  disabledTimeButton(false);
  disabledTimeSelect(false);

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

/**
 * Stop timer
 */
function stopTimer() {
  START_STOP_BUTTON.textContent = 'Start';
  runTimer = 0;
  RESET_BUTTON.disabled = false;

  clearInterval(timerId);
}

/**
 * Get selected time seconds
 *
 * @return {List} SEC_LIST, maxSec
 */
function getSelectedSec() {
  const SEC_LIST = [0, 0, 0];
  let maxSec = 0;
  for (let i = 0; i < 3; i++) {
    const MIN = Number(selectTags[i][0].value);
    const SEC = Number(selectTags[i][1].value);
    SEC_LIST[i] = MIN * 60 + SEC;
    if (maxSec < SEC_LIST[i]) {
      maxSec = SEC_LIST[i];
    }
  }
  return [SEC_LIST, maxSec];
}


/**
 * Detect the current time is selected time
 *
 * @param {List} selectedSec
 * @param {Number} currentSec
 * @return {boolean} is selected seconds
 */
function isSelectedSec(selectedSec, currentSec) {
  for (let i = 0; i < 3; i++) {
    if (selectedSec[i] == currentSec) {
      return true;
    }
  }
  return false;
}

/**
 * Make disable time-button
 *
 * @param {boolean} doDisabled
 */
function disabledTimeButton(doDisabled) {
  B4_TIME_BUTTON.disabled = doDisabled;
  MX_TIME_BUTTON.disabled = doDisabled;
  CUSTOM_TIME_BUTTON.disabled = doDisabled;
}
