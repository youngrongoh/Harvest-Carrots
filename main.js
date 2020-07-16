const playBtn = document.querySelector('.dashboard__play');
const time = document.querySelector('.dashboard__timer');
const iconOfplay = playBtn.firstElementChild;
const result = document.querySelector('.result');
const restartBtn = document.querySelector('.result__restart')
const resultMsg = document.querySelector('.result__msg');
const playground = document.querySelector('#playground');
const count = document.querySelector('.dashboard__count');

// Change display status of result.
function toggleResult(state) {
    if (state === 'active') {
        result.classList.remove('inactive');
    } else if (state === 'inactive') {
        result.classList.add('inactive');
    }
}

// Timer
let stopVal = 0;
function timer(sec) {
    let timerId = setInterval(() => {
        time.innerText = `0:${sec}`
        sec--;
        if (sec < 0) {
            clearInterval(timerId);
            gameOver();
        } else if (stopVal === 1) {
            clearInterval(timerId);
        }
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

// create items
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

// Random
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

function removeAll() {
    playground.innerHTML = ''
}

function gameStart() {
    toggleResult('inactive');
    toggleIconOfplay('stop');
    removeAll();
    spreadItems('carrot');
    spreadItems('bug');
    countCarrot();
    timer(10);
    stopVal = 0;
}

function gameStop() {
    toggleResult('active');
    toggleIconOfplay('play');
    changeMsg('stop');
    stopVal = 1;
}

function gameOver() {
    toggleResult('active');
    toggleIconOfplay('play');
    changeMsg('lose');
}

function gameClear() {
    toggleResult('active');
    toggleIconOfplay('play');
    changeMsg('win');
    stopVal = 1;
}

// Game logic
playground.addEventListener('click', e => {
    switch (e.target.parentElement.classList[0]) {
        case 'playground__carrot':
            console.log('carrot!');
            e.target.parentElement.remove();
            countCarrot()
            break;
        case 'playground__bug':
            console.log('bug..');
            e.target.parentElement.remove();
            toggleIconOfplay('play');
            toggleResult('active');
            changeMsg('lose');
            break;
    }
    if (count.innerText == 0) {
        gameClear();
    }
});

// Buttons action
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
