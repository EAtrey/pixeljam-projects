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
  valuePerClick: 1,
  level: 1,
  levelClicks: 0,
  clicksToLevelUp: 10,
  powerups: [
    {
        title: 'Double Clicks',
        isActive: 0,
        cost: 20,
        className: 'power--double-click',
        activate: function () {
            gameState.valuePerClick *= 2; 
        }
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
  state.clicks += gameState.valuePerClick;
  state.levelClicks += gameState.valuePerClick;
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

function addPowerUp($key) {
    if(gameState.clicks >= gameState.powerups[$key].cost) {
        gameState.clicks -= gameState.powerups[$key].cost;
        gameState.levelClicksclicks -= gameState.powerups[$key].cost;
        gameState.powerups[$key].isActive = 1;
        gameState.powerups[$key].activate();
        render();
    }
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
    for (const [key, value] of Object.entries(gameState.powerups)) {
        let ele = `<div class="powerup"> <button id="${value.className}" class="contrast ${value.className}" onClick="addPowerUp(${key})" type="button">${value.title}</button></div>`;
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