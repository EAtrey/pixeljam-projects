let theButton = document.getElementById('click-me');
let feedback = document.getElementById('feedback');
let clicks = 0;

let handleClick = () => {
    addClick();
    updateFeedback();
}

let addClick = () => {
    clicks++;
}

let updateFeedback = () => {
feedback.innerHTML = `${clicks} Clicks`
}

theButton.addEventListener('click', handleClick);