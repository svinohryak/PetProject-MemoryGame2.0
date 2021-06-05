const btnGame6 = document.querySelector('#chooseGameBtn-6');
const btnGame12 = document.querySelector('#chooseGameBtn-12');
const btnGame16 = document.querySelector('#chooseGameBtn-16');
const cardBox = document.querySelector('.card-box');
const cardsArr = [];
const openCards = [];
let gameLevel = 6;
let matchedCardsNumber = 0;
let movesCount = document.querySelector('#moves-box__output');

const newGameBtn = document.querySelector('#new-game-btn');
const giveUpBtn = document.querySelector('#give-up-btn');
const hintBtn = document.getElementById('hint-btn');

let timerOutput = document.getElementById('timer__output');
let min = 0;
let sec = 0;
// let mm;
// let ss;
let timerInt;

//table td variables
let first6 = document.getElementById('first6');
let first12 = document.getElementById('first12');
let first16 = document.getElementById('first16');

let second6 = document.getElementById('second6');
let second12 = document.getElementById('second12');
let second16 = document.getElementById('second16');

let third6 = document.getElementById('third6');
let third12 = document.getElementById('third12');
let third16 = document.getElementById('third16');

const timeArray6 = JSON.parse(localStorage.getItem('timesFor6')) || [];
const timeArray12 = JSON.parse(localStorage.getItem('timesFor12')) || [];
const timeArray16 = JSON.parse(localStorage.getItem('timesFor16')) || [];

function shuffleCards(array) {
    const randomNumArr = [...Array(array.length).keys()];
    for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (array.length - 1));
        [randomNumArr[j], randomNumArr[j + 1]] = [randomNumArr[j + 1], randomNumArr[j]];
    }
    for(let i = 0; i < array.length; i++) {
        array[i].style.order = randomNumArr[i];
    }
}

function createNewPack(cardsNum) {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add(`pack${cardsNum}`);
    
    for(let i = 0; i < 2; i++) {
        let imgNum = cardsNum / 2;
        for(let j = 1; j <= imgNum; j++) {
            const card = document.createElement('div');
            card.style.backgroundImage = `url('images/${j}.jpg')`;
            card.setAttribute('data-pic-name', `${j}`);
            card.classList.add('card');
            cardsContainer.appendChild(card);
            cardsArr.push(card);
        }
    }
    while(cardBox.firstChild) {
        cardBox.removeChild(cardBox.firstChild)
    }
    //Shuffle cards and adding EventListener here
    movesCount.textContent = 0;
    shuffleCards(cardsArr);
    cardsArr.forEach(card => card.addEventListener('click', openCard));
    cardBox.appendChild(cardsContainer);
}

function choosGameLevel(cardsNum) {
    gameLevel = cardsNum;
    startNewGame(cardsNum);
}

function startNewGame(cardsNum) {
    createNewPack(cardsNum);
    stopTimer();
    resetTimer();
    startTimer();

    hintBtn.addEventListener('click', givingAHint);
}

function giveUpFn() {
    cardsArr.forEach(card => card.classList.add('open'));
    cardsArr.forEach(card => disableOpeningCards(card));
    hintBtn.removeEventListener('click', givingAHint);
    stopTimer();
}

function givingAHint() {
    cardsArr.forEach(card => card.classList.add('open'));
    cardsArr.forEach(card => disableOpeningCards(card));
    setTimeout(() => {
        closeCards(document.querySelectorAll('.open'));
        // endTurn();
        enableOpeningCards();
        resetOpenCardsArr();

        hintBtn.removeEventListener('click', givingAHint);
    } , 1000);
}

//timer here

function timer() {
    let mm;
    let ss;

    sec++;
      if(sec === 60) {
        sec = 0; min++;
    };
      sec < 10 ? ss = `0${sec}` : ss = `${sec}`;
      min < 10 ? mm = `0${min}` : mm = `${min}`;
      
      timerOutput.textContent = `${mm}:${ss}`;
  }

  function startTimer() {
    stopTimer();
    timerInt = setInterval(timer, 1000);
  }

  function stopTimer() {
    clearInterval(timerInt);
  }

  function resetTimer() {
    min = 0;
    sec = 0;
    timerOutput.textContent = '00:00';
  }


//best time table


// function getingTime(arr) {
//     arr.push(timerOutput.innerHTML);
//     managingTimesArray(arr);
// }

// function managingTimesArray(arr) {
    
//     if(arr.length > 1) {
//       arr.sort();
//     }
//     if(arr[0]) {
//         first6.innerHTML = arr[0];
//     }
//     if(arr[1]) {
//         second6.innerHTML = arr[1];
//     }
//     if(arr[2]) {
//         third6.innerHTML = arr[2];
//     }
//     if(arr.length > 3) {
//       arr.pop()
//     }
// }

// function addingToLocalStorage(arr, keyName) {
//     getingTime(arr);
//     localStorage.setItem(keyName, JSON.stringify(arr));
// }

function getingTime(arr, nameOfColumn1, nameOfColumn2, nameOfColumn3) {
    arr.push(timerOutput.innerHTML);
    managingTimesArray(arr, nameOfColumn1, nameOfColumn2, nameOfColumn3);
}

function managingTimesArray(arr, nameOfColumn1, nameOfColumn2, nameOfColumn3) {
    
    if(arr.length > 1) {
      arr.sort();
    }
    if(arr[0]) {
        nameOfColumn1.innerHTML = arr[0];
    }
    if(arr[1]) {
        nameOfColumn2.innerHTML = arr[1];
    }
    if(arr[2]) {
        nameOfColumn3.innerHTML = arr[2];
    }
    if(arr.length > 3) {
      arr.pop()
    }
}


function addingToLocalStorage(arr, keyName, nameOfColumn1, nameOfColumn2, nameOfColumn3) {
    getingTime(arr, nameOfColumn1, nameOfColumn2, nameOfColumn3);
    localStorage.setItem(keyName, JSON.stringify(arr));
}


function addToBestTimeTable() {
    if(gameLevel === 6) {
        addingToLocalStorage(timeArray6, 'timesFor6', first6, second6, third6);
    }
    if(gameLevel === 12) {
        addingToLocalStorage(timeArray12, 'timesFor12', first12, second12, third12);
    }
    if(gameLevel === 16) {
        addingToLocalStorage(timeArray16, 'timesFor16', first16, second16, third16);
    }
}

function displayTableData(arr, nameOfColumn1, nameOfColumn2, nameOfColumn3) {
    if(arr[0]) {
        nameOfColumn1.innerHTML = arr[0];
    }
    if(arr[1]) {
        nameOfColumn2.innerHTML = arr[1];
    }
    if(arr[2]) {
        nameOfColumn3.innerHTML = arr[2];
    }
}

displayTableData(timeArray6, first6, second6, third6);
displayTableData(timeArray12, first12, second12, third12);
displayTableData(timeArray16, first16, second16, third16);


//rewriting old code here

function doesCardsMatch() {
    return openCards[0] === openCards[1];
}

function closeCards(openCards) {
    setTimeout(function(){
        openCards.forEach(card => card.classList.remove('open'));
    }, 1000);
    
}

function markCardsMatched(matchedCards) {
    setTimeout(function () {
        matchedCards.forEach(card => card.classList.add('matched'));
    }, 1000);
}

function disableOpeningCards(card) {
    card.removeEventListener('click', openCard);
}

function enableOpeningCards() {
    setTimeout(function () {
        cardsArr.forEach(card => card.addEventListener('click', openCard));
    }, 700);
}

function resetOpenCardsArr() {
    openCards.splice(0);
}

function endTurn() {
    enableOpeningCards();
    resetOpenCardsArr();

    movesCount.textContent++;

}

function markCardsMatched(matchedCards) {
    setTimeout(function () {
        matchedCards.forEach(card => card.classList.add('matched'));
    }, 1000);
}

function winingGame() {
    console.log('you win');
    stopTimer();
    
    //best time table
    addToBestTimeTable()
}

function openCard(e) {
    e.target.classList.add('open');
    openCards.push(e.target.dataset.picName);
    disableOpeningCards(e.target);

    if (openCards.length > 1) {
        cardsArr.forEach(card => disableOpeningCards(card));
    }
    if(openCards.length === 2) {
        if(doesCardsMatch()) {
            markCardsMatched(document.querySelectorAll(`[data-pic-name='${openCards[1]}']`));
            endTurn();
            matchedCardsNumber++;
            if(matchedCardsNumber === (gameLevel / 2)) {

                winingGame();
                matchedCardsNumber = 0;

            }
        } else {
            closeCards(document.querySelectorAll('.open'));
            endTurn();
        }
    }
}


//finish rewriting


btnGame6.addEventListener('click', () => choosGameLevel(6));
btnGame12.addEventListener('click', () => choosGameLevel(12));
btnGame16.addEventListener('click', () => choosGameLevel(16));
newGameBtn.addEventListener('click', () => startNewGame(gameLevel));
giveUpBtn.addEventListener('click', giveUpFn);

window.onload = startNewGame(gameLevel);