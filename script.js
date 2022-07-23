newGameButton = document.querySelector('button.restart');
newGameButton.addEventListener('click', initNewGame);
// newGameButton.style.display = 'block'

function computerPlay() {
    let getRandomInt = (max) => Math.floor(Math.random() * max); 
    myRandInt = getRandomInt(3);
    switch (myRandInt){
        case 0: return "rock"
        case 1: return "paper"
        case 2: return "scissor"
    } 
}

const winCondition = new Map()
winCondition.set('lizard', {
    paper: 'eats',
    spock: 'poisons'
})
winCondition.set('scissor', {
    paper: 'cuts',
    lizard: 'decapitates'
})
winCondition.set('rock', {
    lizard: 'crushes',
    scissor: 'crushes'
})
winCondition.set('paper', {
    spock: 'disproves',
    rock: 'covers'
})
winCondition.set('spock', {
    rock: 'vaporizes',
    scissor: 'smashes'
})

function evalWinner(playerChoice, computerChoice) {
    if (winCondition.get(playerChoice).hasOwnProperty(computerChoice)) {
        return true //player wins!
    } else return false
}

function getFlavorText(winnerChoice, loserChoice) {
    let action = winCondition.get(winnerChoice)[loserChoice];
    return capText(winnerChoice) + ' ' + action + ' ' + loserChoice
}

function capText(text) {
    firstLetter = text[0].toUpperCase();
    remainder = text.slice(1);
    return firstLetter.concat(remainder)
}



function initNewGame() {
    newGameButton.style.display = 'none'
    playerScore = 0;
    playerScore_display.textContent = 0;
    pcScore = 0;
    pcScore_display.textContent = 0;
}

const scoreStatus = document.querySelector('#scoreStatus');
const gameStatus = document.querySelector('#gameStatus');
let playerScore_display = document.getElementById('playerScore_display');
let pcScore_display = document.getElementById('pcScore_display');

initNewGame();

const playerOptions = document.querySelectorAll('.playerOptions');
playerOptions.forEach(option => option.addEventListener('click', (e) => {
    playerChoice = e.target.value;
    playRound(playerChoice);
}));



function updateScoreDisplay() {
    playerScore_display.textContent = playerScore;
    pcScore_display.textContent = pcScore;
}

let againCounter = 0;

function playRound (playerChoice) {
    gameStatus.classList.remove("final");

    let computerChoice = computerPlay();
    playerWinCheck =  evalWinner(playerChoice,computerChoice);

    if (playerChoice === computerChoice) {
            gameStatus.textContent = "It's a draw."
            againCounter++
            if (againCounter == 2) gameStatus.textContent += `..again`
            else if (againCounter > 2) gameStatus.textContent += `..again (${againCounter-1}x)`
    } else if (playerWinCheck) {
        playerScore++
        flavorText = getFlavorText(playerChoice, computerChoice) + "!"; //winner in 1st slot
        gameStatus.textContent = `Player wins. ${flavorText}`   
        againCounter = 0;    
    } else {
        pcScore++
        flavorText = getFlavorText(computerChoice, playerChoice) + '...';
        gameStatus.textContent = `Computer wins. ${flavorText}`
        againCounter = 0;    
    }

    updateScoreDisplay();
    if (playerScore == 5) printFinalWinner("player");
    if (pcScore == 5) printFinalWinner("computer");
}

const printFinalWinner = function (winner) {
    gameStatus.classList.add("final")
    
    gameStatus.textContent = `Final winner is ${winner} with ${playerScore + ':' + pcScore} points`
        if (winner == "player") gameStatus.textContent += "!!!"
        else gameStatus.textContent += "..."

    playerOptions.forEach(option => option.disabled = true)
    newGameButton.style.display = "block"

}

