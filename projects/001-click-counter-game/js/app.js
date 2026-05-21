let theButton = document.getElementById('click-me');
let feedbackValue = document.getElementById('feedback-value');
let levelValue = document.getElementById('level-current');
let levelProgress = document.getElementById('level-progress');
let clicks = 0;
let levelClicks = 0;
let clicksToLevelUp = 10;
let level = 1;

let handleClick = () => {
    addClick();
    updateFeedback();
    progressLevel();
}

let addClick = () => {
    clicks++;
    levelClicks++;
}

let updateFeedback = () => {
    feedbackValue.innerHTML = `${clicks}`;
}

let progressLevel = () => {
    if(levelClicks < clicksToLevelUp) {
        levelProgress.setAttribute('value', levelClicks);
    } else {
        level+=1;
        levelClicks = 0;
        clicksToLevelUp = 10 * level;
        levelValue.innerHTML = `${level}`;
        levelProgress.setAttribute('value', levelClicks);
        levelProgress.setAttribute('max', clicksToLevelUp);
    }
    
}

theButton.addEventListener('click', handleClick);