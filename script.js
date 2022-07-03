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

function playRound () {
    let playerSelection = getPlayerInput();
    let computerSelection = computerPlay();
    let outcome = evalWinner(playerSelection,computerSelection);
    console.log(outcome);   
}

function evalWinner(playerSelection,computerSelection) {
    if (playerSelection == computerSelection) {
        return "It's a tie!"
    } else if (playerSelection=="rock") {
        switch (computerSelection){
            case "paper": return "You lose! Paper beats Rock."
            case "scissor": return "You win! Rock beats Scissor."
        }
    } else if (playerSelection=="paper") {
        switch (computerSelection){
            case "rock": return "You win! Paper beats Rock."
            case "scissor": return "You lose! Scissor beats Paper."
        }
    } else if (playerSelection=="scissor") {
        switch (computerSelection){
            case "rock": return "You lose! Rock beats scissor."
            case "paper": return "You win! Scissor beats Paper."
        }
    }
}
