/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Coding Challenges
#1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
#2. Add an input field to the HTML where players can set the winning score, so that they can change the predfined score of 100. (Hint: you can read that value with the
    .value property in JavaScript. This is a good opportunity to use google to figure this out.)
#3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second
    dice, so take a look at the CSS code for the first one.)

*/

var scores, roundScore, activePlayer, gamePlaying, diceHistory, firstSlot, doubleSixes, winningScore;

init();


var x = document.querySelector("#score-0").textContent;
console.log(x);



document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        for(var i = 0; i <= 1; i+=1){
            var diceDOM;
            //this will loop twice for 2 dice
            // 1st A random Number
            var dice = Math.floor(Math.random() * 6) + 1;
            //display result
            i === 0 ? diceDOM = document.querySelector('.dice1') : diceDOM = document.querySelector('.dice2');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            addToDiceHistory(dice);

            //update round score only if the rolled number was not a 1
            if(dice !== 1 && doubleSixes === false){
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }else{
                doubleSixes = false;
                nextPlayer();
                break;
            }
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
    
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});

document.getElementById('winningScore').addEventListener('keyup', function(){
    winningScore = document.getElementById('winningScore').value;
});

var nextPlayer = function(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    diceHistory = [0,0];
    activePlayer = 0;
    roundScore = 0;
    winningScore = 100;
    gamePlaying = true;
    firstSlot = true;
    doubleSixes = false;

    document.querySelector('.dice1').style.display = "none";
    document.querySelector('.dice2').style.display = "none";

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

var addToDiceHistory = function(diceNum){
    //Add diceNum to the list of the first spot of the array.
    firstSlot === true ? diceHistory[0] = diceNum : diceHistory[1] = diceNum;
    firstSlot === true ? firstSlot = false : firstSlot = true;

    //compare if both spots of the array are a 6
    if(diceHistory[0] === 6 && diceHistory[1] === 6){
        doubleSixes = true;
        diceHistory = [0,0];
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    }
}