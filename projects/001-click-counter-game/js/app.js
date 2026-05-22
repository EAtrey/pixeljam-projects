// -----------------------------
// DOM references
// -----------------------------

const elements = {
  button: document.getElementById("click-me"),
  feedbackValue: document.getElementById("feedback-value"),
  levelValue: document.getElementById("level-current"),
  levelProgress: document.getElementById("level-progress"),
  store: document.getElementById("store"),
};

// -----------------------------
// Game state
// -----------------------------

const gameState = {
  clicks: 0,
  level: 1,
  levelClicks: 0,
  clicksToLevelUp: 10,
  powerups: [
    {
        title: 'Double Clicks',
        isActive: 0,
        cost: 500,
        className: 'power--double-click'
    },
  ]
};

// -----------------------------
// Game config
// -----------------------------

const config = {
  baseClicksToLevelUp: 10,
};

// -----------------------------
// Game logic
// -----------------------------

function addClick(state) {
  state.clicks += 1;
  state.levelClicks += 1;
}

function getClicksRequiredForLevel(level) {
  return config.baseClicksToLevelUp * level;
}

function checkLevelUp(state) {
  if (state.levelClicks < state.clicksToLevelUp) {
    return;
  }

  state.level += 1;
  state.levelClicks = 0;
  state.clicksToLevelUp = getClicksRequiredForLevel(state.level);
}

function handlePlayerClick() {
  addClick(gameState);
  checkLevelUp(gameState);
  render();
}

// -----------------------------
// Rendering
// -----------------------------

function render() {
  elements.feedbackValue.textContent = gameState.clicks;
  elements.levelValue.textContent = gameState.level;

  elements.levelProgress.value = gameState.levelClicks;
  elements.levelProgress.max = gameState.clicksToLevelUp;
}

function renderStore() {
    for (const power of gameState.powerups) {
        let ele = `<div class="${power.className}" id="${power.className}">${power.title}</div>`;
        elements.store.innerHTML += ele;
    }
}

// -----------------------------
// Input
// -----------------------------

elements.button.addEventListener("click", handlePlayerClick);

// Initial render
render();
renderStore();