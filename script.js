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

function playRound () {
    let playerSelection = getPlayerInput();
    let computerSelection = computerPlay();
    // let outcome = evalWinner(playerSelection,computerSelection);
    let outcome = rpsMap.get(playerSelection)[computerSelection];
    let resultText = 
        (outcome == 'lose')? `You lose! ${capText(computerSelection)} beats ${playerSelection}.` :
        (outcome == 'win')? `You win! ${capText(playerSelection)} beats ${computerSelection}.` :
        `It's a tie.`;
    console.log(resultText);
    if (outcome == 'win') return 1;
    if (outcome == 'lose') return -1;
    else return 0;
}

function capText(text) {
    firstLetter = text[0].toUpperCase();
    remainder = text.slice(1);
    return firstLetter.concat(remainder)
}

function game() {
    let score = 0;
    for(let i=0; i < 5; i++){
        score += playRound();
    }
(score > 0)? console.log(`Final winner is Player with ${score} points!`) :
(score < 0)? console.log(`Final winner is Computer with ${score} points...`) :
console.log("It's a tie.")
}



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
