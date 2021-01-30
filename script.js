let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

const generateTarget = () => {
  const targetNumber = Math.floor(Math.random() * 10);
  return targetNumber;
}

const getAbsoluteDistance = (number1, number2) => {
  return Math.abs(number1 - number2);
}

const compareGuesses = (humanGuess, computerGuess, targetNumber) => {
  
  const humanDistance = getAbsoluteDistance(humanGuess, targetNumber);

  const computerDistance = getAbsoluteDistance(computerGuess, targetNumber);
  
  if (humanDistance <= computerDistance) {
    return true;
  } else {
    return false;
  }
}

const updateScore = winner => {
  if (winner === 'human') {
    return humanScore++;
  } else if (winner === 'computer') {
    return computerScore++;
  }
}

const advanceRound = () => currentRoundNumber++;

const decreaseRound = () => currentRoundNumber--;

