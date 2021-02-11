const TIMER_PARAGRAPH = document.getElementById('timer');
const START_STOP_BUTTON = document.getElementById('start-stop-btn');
const RESET_BUTTON = document.getElementById('reset-btn');

let time = 0;
let runTimer = 0;
let timerId;

START_STOP_BUTTON.addEventListener('click', () => {
  if (runTimer == 0) {
    START_STOP_BUTTON.textContent = 'Stop';
    runTimer = 1;
    RESET_BUTTON.disabled = true;

    timerId = setInterval(() => {
      updateTimerParagraph(time);
      time += 1;
    }, 1000);
  } else {
    START_STOP_BUTTON.textContent = 'Start';
    runTimer = 0;
    RESET_BUTTON.disabled = false;

    clearInterval(timerId);
  }
});

RESET_BUTTON.addEventListener('click', () => {
  RESET_BUTTON.disabled = true;

  time = 0;
  updateTimerParagraph(time);
  clearInterval(timerId);
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
