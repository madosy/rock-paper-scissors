function computerPlay() {
    myRandInt = getRandomInt(3);
    switch (myRandInt){
        case 0: return "rock"
        case 1: return "paper"
        case 2: return "scissor"
    } 
}

function getRandomInt(max) {
    //get random int with a max value
    return Math.floor( Math.random() * max );
}

function getPlayerInput(){
    console.log(this);
    let playerInput = prompt("What's your move?");
    let playerInput_lc = playerInput.toLowerCase();
    switch (playerInput_lc){
        case "rock":
        case "scissor":
        case "paper": return playerInput_lc;
        default: 
            alert("'"+playerInput+"'" + " is an invalid move! Try again.");
    }
}

const rpsMap = new Map()
//rpsMap.get(playerValue)[computerSelection] --> 'tie' || 'win' || 'lose'
rpsMap.set('rock', {
    rock: 'tie',
    paper: 'lose',
    scissor: 'win'
})
rpsMap.set('paper', {
    rock: 'win',
    paper: 'tie',
    scissor: 'lose'
})
rpsMap.set('scissor', {
    rock: 'lose',
    paper: 'win',
    scissor: 'tie'
})

const scoreStatus = document.querySelector('#scoreStatus');
const gameStatus = document.querySelector('#gameStatus');
let playerScore = 0;
let computerScore = 0;

const printFinalResults = (winner) => {
    gameStatus.textContent = `Final winner is ${winner} with ${playerScore + ':' + computerScore} points`
    if (winner == "player") gameStatus.textContent += "!!!"
    else gameStatus.textContent += "..."
    
    playerScore = 0;
    computerScore = 0;
}

const updateScoreStatus = () => scoreStatus.textContent = `${playerScore}:${computerScore}`;

function playRound (playerSelection) {
    // let playerSelection = getPlayerInput();
    
    let computerSelection = computerPlay();
    // let outcome = evalWinner(playerSelection,computerSelection);
    let outcome = rpsMap.get(playerSelection)[computerSelection];
    let resultText = 
        (outcome == 'lose')? `You lose! ${capText(computerSelection)} beats ${playerSelection}.` :
        (outcome == 'win')? `You win! ${capText(playerSelection)} beats ${computerSelection}.` :
        `It's a tie.`;
    gameStatus.textContent = resultText;
    if (outcome == 'win') playerScore++;
    if (outcome == 'lose') computerScore++;
    updateScoreStatus();

if (playerScore == 5) printFinalResults("player")
if (computerScore == 5) printFinalResults("computer")
}

function capText(text) {
    firstLetter = text[0].toUpperCase();
    remainder = text.slice(1);
    return firstLetter.concat(remainder)
}

const buttons = document.querySelectorAll('.game');
buttons.forEach(button => {button.addEventListener('click', function (e) {
    playRound(e.target.id)
})
    
});






// function evalWinner(playerSelection,computerSelection) {
//     if (playerSelection == computerSelection) {
//         return "It's a tie!"
//     } else if (playerSelection=="rock") {
//         switch (computerSelection){
//             case "paper": return "You lose! Paper beats Rock."
//             case "scissor": return "You win! Rock beats Scissor."
//         }
//     } else if (playerSelection=="paper") {
//         switch (computerSelection){
//             case "rock": return "You win! Paper beats Rock."
//             case "scissor": return "You lose! Scissor beats Paper."
//         }
//     } else if (playerSelection=="scissor") {
//         switch (computerSelection){
//             case "rock": return "You lose! Rock beats scissor."
//             case "paper": return "You win! Scissor beats Paper."
//         }
//     }
// }
