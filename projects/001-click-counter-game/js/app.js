let theButton = document.getElementById('click-me');
let feedbackValue = document.getElementById('feedback-value');
let levelValue = document.getElementById('level-current');
let levelProgress = document.getElementById('level-progress');
let clicks = 0;
let clicksToLevelUp = 10;
let level = 0;

let handleClick = () => {
    addClick();
    updateFeedback();
    progressLevel();
}

let addClick = () => {
    clicks++;
}

let updateFeedback = () => {
    feedbackValue.innerHTML = `${clicks}`;
}

let progressLevel = () => {
    if(levelProgress.getAttribute('value') < clicksToLevelUp) {
        levelProgress.setAttribute('value', clicks);
    } else {
        level+=1;
        clicksToLevelUp = clicksToLevelUp * level;
        levelValue.innerHTML = `${level}`;
        levelProgress.setAttribute('value', 0);
        levelProgress.setAttribute('max', clicksToLevelUp);
    }
    
}

theButton.addEventListener('click', handleClick);