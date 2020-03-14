let gameboard = document.querySelector(".gameboard");
let cards = document.querySelectorAll(".card");
const start = document.querySelector(".start");
const restart = document.querySelector('.restart');
let endGameBox = document.querySelector('.endGame');
let flipCount = 0;
let flippedCard1 = null;
let flippedCard2 = null;
let runningScore = 0;
let totalpoints = 0;
let bestscore = document.querySelector('.bestscore');
const score = document.querySelectorAll('.clicks');
const gameBoard = document.querySelector('.gameboard');
localStorage.key('lowscore');

let newLowScore = document.querySelector('.newLow');

if ( localStorage.getItem('lowscore') !== null){
    bestscore.innerText = `${localStorage.getItem('lowscore')}`;
}


gameBoard.addEventListener('click', function(e){
   if(flippedCard2){
       return;
   }
    if(e.target.parentElement.classList.contains("flip")){

        return;

    } if(!e.target.classList.contains('front')){
        return;
    }
    
    else {
        
        runningScore++;
        score[0].innerHTML = `${runningScore}`;


        if(e.target.className === 'front'){

           let thisCard = e.target.parentElement;
           thisCard.classList.add("flip");


           if(flipCount === 0){

            flippedCard1 = thisCard;
            

           }
           if(flipCount === 1){

               flippedCard2 = thisCard;
               let checkCard1 = flippedCard1.getAttribute('data-id');
               let checkCard2 = flippedCard2.getAttribute('data-id');


               if( checkCard1 === checkCard2 ){

                    flipCount = 0;
                    flippedCard1 = null;
                    flippedCard2 = null;
                    totalpoints += 2;
                    if(totalpoints === total){
                        endGame();
                    }
                    return;
               } 
               else 
               {
                    
                    setTimeout(function(){
                        flippedCard1.classList.remove('flip');
                        flippedCard2.classList.remove('flip');
                        flipCount = 0;
                        flippedCard1 = null;
                        flippedCard2 = null;
                        
                    }, 1000)

               } 
           }
           flipCount++;
        }
    }
});



function endGame(){
    score[1].innerHTML = `${runningScore}`;
    if(!localStorage.getItem('lowscore')){
        localStorage.setItem('lowscore', runningScore);
        newLowScore.classList.remove('loading');
        bestscore.innerHTML = `<span> ${runningScore} </span>`;
        runningScore = 0;
        score[0].innerHTML = `${runningScore}`;

    } else if(localStorage.getItem('lowscore') > runningScore){
        localStorage.setItem('lowscore', runningScore);
        newLowScore.classList.remove('loading');
        bestscore.innerHTML = `<span> ${runningScore} </span>`;
        runningScore = 0;
        score[0].innerHTML = `${runningScore}`;

    }
    endGameBox.classList.remove('loading');
    gameboard.classList.add('loading');
}



const cardList = ['A','2','3','4','5','6','7','8','9','10','J','Q','K','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let total = cardList.length;


start.addEventListener("click", function(e){
    gameboard.classList.remove('loading');
    window.scrollBy(0, 1000);
    spinUp();
});

restart.addEventListener('click', function(){
    gameboard.classList.remove('loading');
    endGameBox.classList.add('loading');
    newLowScore.classList.add('loading');
    window.scrollBy(0, 1000);
    spinUp();
});

function spinUp(){
    let tmpList = [];
    for(let j = 0; j <cardList.length; j++){
        tmpList[j] = cardList[j];
    }
    for(let i = 0; i < cards.length; i++){
        cards[i].classList.remove('flip');
        runningScore = 0;
        let storedIndex = randomizer(tmpList.length);
        cards[i].setAttribute('data-id', tmpList[storedIndex]);
        cards[i].lastElementChild.innerHTML = `<span class="emojil">&#x1F334;</span><span>${tmpList[storedIndex]}</span><span class="emojir"> &#x1F334;</span>   `;
        tmpList.splice(storedIndex, 1);
    }
}


function randomizer(max){
    let x = Math.floor(Math.random() * Math.floor(max) );
    return x;
}



