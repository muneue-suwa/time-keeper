const START_STOP_BUTTON = document.getElementById('start-stop-btn');
const B4_TIME_BUTTON = document.getElementById('b4-time-btn');
const MX_TIME_BUTTON = document.getElementById('mx-time-btn');
const CUSTOM_TIME_BUTTON = document.getElementById('custom-time-btn');
const selectTags = [
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

// Minutes
for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 61; i++) {
    const option = document.createElement('option');
    option.text = i;
    option.value = i;
    selectTags[j][0].appendChild(option);
  }
}

// Seconds
for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 60; i++) {
    const option = document.createElement('option');
    option.text = i;
    option.value = i;
    selectTags[j][1].appendChild(option);
  }
}

B4_TIME_BUTTON.addEventListener('click', () => {
  disabledTimeSelect(true);
  selectTags[0][0].selectedIndex = 9;
  selectTags[1][0].selectedIndex = 11;
  selectTags[2][0].selectedIndex = 13;
  for (let i = 0; i < 3; i++) {
    selectTags[i][1].selectedIndex = 1;
  }
  START_STOP_BUTTON.disabled = false;
});

MX_TIME_BUTTON.addEventListener('click', () => {
  disabledTimeSelect(true);
  selectTags[0][0].selectedIndex = 10;
  selectTags[1][0].selectedIndex = 12;
  selectTags[2][0].selectedIndex = 14;
  for (let i = 0; i < 3; i++) {
    selectTags[i][1].selectedIndex = 1;
  }
  START_STOP_BUTTON.disabled = false;
});

CUSTOM_TIME_BUTTON.addEventListener('click', () => {
  disabledTimeSelect(false);
});

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    selectTags[i][j].addEventListener('click', ()=> {
      if (isSelectedTime() === true) {
        START_STOP_BUTTON.disabled = true;
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
      if (selectTags[i][j].value === '0') {
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
 * Make disable time-select
 *
 * @param {boolean} doDisabled
 */
function disabledTimeSelect(doDisabled) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      selectTags[i][j].disabled = doDisabled;
    }
  }
}
