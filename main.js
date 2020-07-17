const playBtn = document.querySelector('.dashboard__play');
const time = document.querySelector('.dashboard__timer');
const iconOfplay = playBtn.firstElementChild;
const result = document.querySelector('.result');
const restartBtn = document.querySelector('.result__restart')
const resultMsg = document.querySelector('.result__msg');
const playground = document.querySelector('#playground');
const count = document.querySelector('.dashboard__count');
const cover = document.querySelector('#cover');
const startBtnOnCover = document.querySelector('.cover__start');

// Change display status of result.
function toggleResult(state) {
    if (state === 'active') {
        result.classList.remove('inactive');
    } else if (state === 'inactive') {
        result.classList.add('inactive');
    }
}
// hide game cover
function inactiveCover() {
    cover.classList.add('inactive');
}

//  Audio
bgm = new Audio('./sound/bg.mp3');
bugPull = new Audio('./sound/bug_pull.mp3');
carrotPull = new Audio('./sound/carrot_pull.mp3');
win = new Audio('./sound/game_win.mp3');
alertSound = new Audio('./sound/alert.wav');
function soundPlay(sound) {
    switch (sound) {
        case 'bgm':
            bgm.play();
            break;
        case 'bug':
            bugPull.play();
            break;
        case 'carrot':
            carrotPull.currentTime = 0;
            carrotPull.play();
            break;
        case 'win':
            win.play();
            break;
        case 'alert':
            alertSound.play();
            break;
    }
}

// Timer
let stopVal = 0;
function timer(sec) {
    let timerId = setInterval(() => {
        // Stop condition
        if (sec < 0) {
            clearInterval(timerId);
            gameStop();
            return;
        } else if (stopVal === 1) {
            clearInterval(timerId);
            return;
        }
        time.innerText = `0:${sec}`
        sec--;
    }, 1000);
}

// Display message of result.
function changeMsg(state) {
    switch (state) {
        case 'win':
            resultMsg.innerText = 'you won!🏆';
            break;
        case 'lose':
            resultMsg.innerText = 'you lost..😥';
            break;
        case 'stop':
            resultMsg.innerText = 'don\'t forget!✊';
            break;
    }
}

// Change icon when clicked play button
function toggleIconOfplay(state) {
    if (state === 'stop') {
        playBtn.firstElementChild.className = 'fas fa-stop';
    } else if (state === 'play') {
        playBtn.firstElementChild.className = 'fas fa-play';
    }
}

// Create items
function createItem(item) {
    switch (item) {
        case 'carrot':
            const carrot = document.createElement('button');
            carrot.setAttribute('class', 'playground__carrot reset');
            carrot.innerHTML = `<img src="./img/carrot.png" alt="carrot click!">`;
            return carrot;
        case 'bug':
            const bug = document.createElement('button');
            bug.setAttribute('class', 'playground__bug reset');
            bug.innerHTML = `<img src="./img/bug.png" alt="bug">`;
            return bug;
    }
}

// Count down according to the number for carrots remained on playground.
function countCarrot() {
    const carrots = document.querySelectorAll('.playground__carrot');
    count.innerText = carrots.length;
}

// Return int value randomly in specific range(min & max).
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

// Place items Randomly.
// x(min 0, max 725), y(min 0, max 140)
function spreadItems(item) {
    for (let i = 0; i < 10; i++) {
        const x = getRandomInt(0, 725);
        const y = getRandomInt(0, 140);
        const _item = createItem(item);
        _item.style.transform = `translate(${x}px, ${y}px)`
        playground.appendChild(_item);
    }
}

// Reset playground
function removeAll() {
    playground.innerHTML = ''
}

// Game logic
function gameStart() {
    time.innerText = '0:10';
    toggleResult('inactive');
    toggleIconOfplay('stop');
    removeAll();
    spreadItems('carrot');
    spreadItems('bug');
    countCarrot();
    timer(9);
    stopVal = 0;
    soundPlay('alert');
    if (bgm.paused) {
        soundPlay('bgm')
    };
}

function gameStop() {
    toggleResult('active');
    toggleIconOfplay('play');
    changeMsg('stop');
    soundPlay('bug');
    stopVal = 1;
}

function gameOver() {
    toggleResult('active');
    toggleIconOfplay('play');
    changeMsg('lose');
    stopVal = 1;
}

function gameClear() {
    toggleResult('active');
    toggleIconOfplay('play');
    changeMsg('win');
    soundPlay('win');
    stopVal = 1;
}

// Disable drag selection
window.addEventListener('mousedown', e => {
    e.preventDefault();
});

// Game interaction
playground.addEventListener('mousedown', e => {
    switch (e.target.parentElement.classList[0]) {
        case 'playground__carrot':
            e.target.parentElement.remove();
            countCarrot();
            soundPlay('carrot');
            break;
        case 'playground__bug':
            e.target.parentElement.remove();
            soundPlay('bug');
            gameOver();
            break;
    }
    if (count.innerText == 0) {
        gameClear();
    }
});

// Buttons action for click event.
playBtn.addEventListener('click', () => {
    if (iconOfplay.className === 'fas fa-play') {
        gameStart();
    } else if (iconOfplay.className === 'fas fa-stop') {
        gameStop();
    }
});

restartBtn.addEventListener('click', () => {
    gameStart();
});


startBtnOnCover.addEventListener('click', () => {
    inactiveCover();
    gameStart();
});

// Play this sound, when hovered start button on game cover.
startBtnOnCover.addEventListener('mouseover', () => {
    soundPlay('carrot');
});

// When page load, play bgm.
window.addEventListener('load', () => soundPlay('bgm'));