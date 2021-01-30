let target;
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const humanGuessInput = document.getElementById('human-guess');

const roundNumberDisplay = document.getElementById('round-number');
const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round');

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

guessButton.addEventListener('click', () => {
  // Generate the target value
  target = generateTarget();
  // Retrieve the player's guess
  const currentHumanGuess = humanGuessInput.value;
  // Make a random 'computer guess'
  const computerGuess = Math.floor(Math.random() * 10);

  // Display the computer guess and the target
  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;
  
  // Determine if the human or computer wins:
  const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)

  let winner = '';
  const regEx = /[0-9]/;

  if (regEx.exec(currentHumanGuess) && currentHumanGuess >= 0 && currentHumanGuess <= 9) {
    winner = humanIsWinner ? 'human' : 'computer';
  } else {
    window.alert('Invalid number! Please guess between 0 and 9!');
  }

  // Update the correct score:
  updateScore(winner);

  // Display the winner
  if (winner === 'human') {
    guessButton.innerText = 'You Win!';
    guessButton.classList.toggle('winning-text')
  } else if (winner === 'computer') {
    computerWinsDisplay.innerText = 'Computer Wins!';
    guessButton.innerText = '';
  } else {
    nextRoundButton.innerText = 'Try Again';
    guessButton.innerText = '';
    decreaseRound();
  }

  // Display the current scores:
  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;
  
  // Set the correct disabled state for the buttons
  guessButton.setAttribute('disabled', true)
  humanGuessInput.setAttribute('disabled', true)
  nextRoundButton.removeAttribute('disabled');
  addButton.setAttribute('disabled', true);
  subtractButton.setAttribute('disabled', true);
});

const handleValueChange = value => {
  if (value > 0 && value < 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value >= 9) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
}

humanGuessInput.addEventListener('input', function(e) {
  handleValueChange(e.target.value);
});

addButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value + 1;
  handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(humanGuessInput.value);
});

nextRoundButton.addEventListener('click', () => {
  // Increase the round number
  advanceRound();
  // Display the new round number
  roundNumberDisplay.innerText = currentRoundNumber;

  // Set the correct disabled state for the buttons
  nextRoundButton.setAttribute('disabled', true);
  nextRoundButton.innerText = 'Next Round';
  guessButton.removeAttribute('disabled');
  humanGuessInput.removeAttribute('disabled');
  addButton.removeAttribute('disabled');
  subtractButton.removeAttribute('disabled');

  // Reset the guess input box and the target number display:
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'Make a Guess';
  humanGuessInput.value = '0';
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text');
  handleValueChange(humanGuessInput.value);
});