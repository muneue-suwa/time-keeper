const START_STOP_BUTTON = document.getElementById('start-stop-btn');
const B4_TIME_BUTTON = document.getElementById('b4-time-btn');
const MX_TIME_BUTTON = document.getElementById('mx-time-btn');
const CUSTOM_TIME_BUTTON = document.getElementById('custom-time-btn');
const LOG_WINDOW = document.getElementById('log-window');
const SELECT_TAGS = [
  [
    document.getElementById('first-min'),
    document.getElementById('first-sec'),
  ],
  [
    document.getElementById('second-min'),
    document.getElementById('second-sec'),
  ],
  [
    document.getElementById('third-min'),
    document.getElementById('third-sec'),
  ],
];

let isCustomTime = 1;

// Minutes
for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 61; i++) {
    const option = document.createElement('option');
    option.text = i;
    option.value = i;
    SELECT_TAGS[j][0].appendChild(option);
  }
  SELECT_TAGS[j][0].selectedIndex = 0;
}

// Seconds
for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 60; i++) {
    const option = document.createElement('option');
    option.text = i;
    option.value = i;
    SELECT_TAGS[j][1].appendChild(option);
  }
}

// B4 time button
B4_TIME_BUTTON.addEventListener('click', () => {
  disabledTimeSelect(true);
  isCustomTime = 0;
  SELECT_TAGS[0][0].selectedIndex = 9;
  SELECT_TAGS[1][0].selectedIndex = 11;
  SELECT_TAGS[2][0].selectedIndex = 13;
  for (let i = 0; i < 3; i++) {
    SELECT_TAGS[i][1].selectedIndex = 1;
  }
  START_STOP_BUTTON.disabled = false;
  LOG_WINDOW.innerText += 'B4が選択されました．\n';
});

// Mx time button
MX_TIME_BUTTON.addEventListener('click', () => {
  disabledTimeSelect(true);
  isCustomTime = 0;
  SELECT_TAGS[0][0].selectedIndex = 10;
  SELECT_TAGS[1][0].selectedIndex = 12;
  SELECT_TAGS[2][0].selectedIndex = 14;
  for (let i = 0; i < 3; i++) {
    SELECT_TAGS[i][1].selectedIndex = 1;
  }
  START_STOP_BUTTON.disabled = false;
  LOG_WINDOW.innerText += 'Mxが選択されました．\n';
});

// Custom time button
CUSTOM_TIME_BUTTON.addEventListener('click', () => {
  disabledTimeSelect(false);
  isCustomTime = 1; // eslint-disable-line no-unused-vars
  LOG_WINDOW.innerText += 'カスタムが選択されました．時間を指定してください．\n';
});

// Detect the timer can be started
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    SELECT_TAGS[i][j].addEventListener('click', () => {
      if (isSelectedTime() === true) {
        START_STOP_BUTTON.disabled = false;
      }
    });
  }
}

/**
 * Check the time is selected
 *
 * @return {boolean} time is selected
 */
function isSelectedTime() {
  let countSelected = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      if (SELECT_TAGS[i][j].value === '0') {
        countSelected += 1;
      }
    }
  }
  if (countSelected === 6) {
    return false;
  }
  return true;
}

/**
 * Make disable or enable time-select
 *
 * @param {boolean} doDisabled
 */
function disabledTimeSelect(doDisabled) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      SELECT_TAGS[i][j].disabled = doDisabled;
    }
  }
}
