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