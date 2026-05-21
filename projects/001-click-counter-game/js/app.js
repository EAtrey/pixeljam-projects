// -----------------------------
// DOM references
// -----------------------------

const elements = {
  button: document.getElementById("click-me"),
  feedbackValue: document.getElementById("feedback-value"),
  levelValue: document.getElementById("level-current"),
  levelProgress: document.getElementById("level-progress"),
};

// -----------------------------
// Game state
// -----------------------------

const gameState = {
  clicks: 0,
  level: 1,
  levelClicks: 0,
  clicksToLevelUp: 10,
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

// -----------------------------
// Input
// -----------------------------

elements.button.addEventListener("click", handlePlayerClick);

// Initial render
render();