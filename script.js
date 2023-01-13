const buttons = document.querySelectorAll('div.buttons button');
const roundScore = document.querySelector('#roundScore');
const playerScore = document.querySelector('#playerScore');
const botScore = document.querySelector('#botScore');
const playAgainBtn = document.querySelector('#resetBtn');

//variables
let choices =  [{choice: 'Rock', value: 0}, {choice: 'Paper', value: 1}, {choice: 'Scissors', value: 2}];
let playerResult = 0;
let botResult = 0;
let player;

buttons.forEach(button=>{button.addEventListener('click',getPlayerChoice)});




//get bot choice
function getBotChoice() {
    return choices[Math.floor(Math.random() * choices.length)];

}
//single round
function playRound(playerSelection,botSelection){
    let roundWinResult = `${playerSelection}-${botSelection.value}`;
    let playerWinResult = ['1-0','2-1','0-2'];

    if(Number(playerSelection)===botSelection.value){
        playerScore.textContent = ++playerResult;
        botScore.textContent = ++botResult;
        roundScore.textContent ="Draw!";
    }else if(playerWinResult.includes(roundWinResult)){
        playerScore.textContent = ++playerResult;
        roundScore.textContent = `You Win! ${player} beats ${botSelection.choice}`;
    }else{
        botScore.textContent = ++botResult;
        roundScore.textContent = `You Lose! ${botSelection.choice} beats ${player}`;
    }
    checkWinner();
}


//check who is the winner 
function checkWinner() {
    if (playerResult === 5 || botResult === 5) {
        if (playerResult === botResult) {
            updateWinner('tie')
        } else {
            let win = `${(botResult > playerResult) ? 'bot' : 'player'}`;
            updateWinner(win);
        }
    }
}

const winnerResults = {
    bot: ["You Lost the game to a bot!", 'Game Over!'],
    player: ["You Win the game!", 'Game Over!'],
    tie: ["Draw!", 'Game Over!']
};

function updateWinner(winner) {
    roundScore.textContent = winnerResults[winner][0];
    roundScore.textContent = winnerResults[winner][1];

    buttons.forEach(button => {
        button.removeEventListener('click', getPlayerChoice);
    });
}

function getPlayerChoice(element) {
    let playerSelection = (element.target.id);
    player = element.target.textContent;
    playRound(playerSelection, getBotChoice());
}

//reload the page
playAgainBtn.addEventListener('click', () => location.reload());
