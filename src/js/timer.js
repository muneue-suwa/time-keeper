const TIMER_PARAGRAPH = document.getElementById('timer');
// const START_STOP_BUTTON = document.getElementById('start-stop-btn');
const RESET_BUTTON = document.getElementById('reset-btn');
const SOUND_TEST_BUTTON = document.getElementById('sound-test-btn');
// const LOG_WINDOW = document.getElementById('log-window');

let time = 0;
let doRunTimer = 0;
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
  runTimer();
});
TIMER_PARAGRAPH.addEventListener('click', () => {
  if (START_STOP_BUTTON.disabled === false) {
    runTimer();
  }
});

RESET_BUTTON.addEventListener('click', () => {
  RESET_BUTTON.disabled = true;
  SOUND_TEST_BUTTON.disabled = false;
  START_STOP_BUTTON.disabled = false;
  disabledTimeButton(false);
  // disabledTimeSelect(false);

  time = 0;
  updateTimerParagraph(time);
  clearInterval(timerId);
  addLogMessage(time, 'リセットします．');
});

SOUND_TEST_BUTTON.addEventListener('click', () => {
  AUDIO_FILE.play();
});

/**
 * Start timer
 */
function runTimer() {
  if (doRunTimer == 0) {
    START_STOP_BUTTON.textContent = 'Stop';
    doRunTimer = 1;
    RESET_BUTTON.disabled = true;
    SOUND_TEST_BUTTON.disabled = true;
    disabledTimeButton(true);
    disabledTimeSelect(true);
    const [SELECTED_SEC_LIST, MAX_SEC] = getSelectedSec();
    console.log('SELECTED_SEC_LIST', SELECTED_SEC_LIST);
    addLogMessage(time, '開始します．');

    timerId = setInterval(() => {
      time += 1;
      updateTimerParagraph(time);
      if (isSelectedSec(SELECTED_SEC_LIST, time) === true) {
        AUDIO_FILE.play();
      }
      if (MAX_SEC === time) {
        SOUND_TEST_BUTTON.disabled = false;
        stopTimer();
        START_STOP_BUTTON.disabled = true;
      }
    }, 1000);
  } else {
    SOUND_TEST_BUTTON.disabled = true;
    stopTimer();
    addLogMessage(time, '停止します．');
  }
}

/**
 * Update Timer Paragraph
 * @param {Integer} displayTime Current time
 */
function updateTimerParagraph(displayTime) {
  const [min, sec] = sec2minsec(displayTime);
  console.log(`${min}:${sec}, displayTime: ${displayTime}`);
  TIMER_PARAGRAPH.textContent =
    `${min}:${('00' + sec).slice(-2)}`;
}

/**
 * Convert seconds to minutes and seconds
 *
 * @param {Number} currentSec current seconds
 * @return {List} Minutes and Seconds
 */
function sec2minsec(currentSec) {
  const min = Math.floor(currentSec / 60) % 60;
  const sec = currentSec % 60;
  return [min, sec];
}

/**
 * Stop timer
 */
function stopTimer() {
  START_STOP_BUTTON.textContent = 'Start';
  doRunTimer = 0;
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
      addLogMessage(time, `${i + 1}回目の合図です．`);
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

/**
 * Add log message to log window
 *
 * @param {Number} currentTime current time
 * @param {String} message message
 */
function addLogMessage(currentTime, message) {
  const [min, sec] = sec2minsec(currentTime);
  LOG_WINDOW.innerText += `${min}:${('00' + sec).slice(-2)} ${message}\n`;
}
