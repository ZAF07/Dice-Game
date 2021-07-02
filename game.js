// Set variables and counters

var dice,currentScore,activePlayer,gamePlaying;
currentScore = 0;
gameScore  = [0,0];
activePlayer = 0;
document.querySelector('.dice').style.display = 'none';

// Initialise the game
//gamePlaying = false;

// Bring user to game page
/*document.querySelector('.btn-gamePage').addEventListener('click', function() {
  document.querySelector('.welcome').style.display = 'none';
  document.querySelector('.play').style.display = 'block';
})*/

// var welcomePageButton = document.querySelector('.btn-gamePage')
// welcomePageButton.classList.add('animated', 'jello', 'slower')

// New Game button in play gameplay page
var newBtn = document.querySelector('.btn-new');

// LET'S PLAY BUTTON IN HOME PAGE
var start = document.querySelector('.btn-gamePage');
start.classList.add('animated', 'jello', 'slower')
start.addEventListener('click', function() {

  // class='welcome' == home page
  document.querySelector('.welcome').style.display = 'none';

  // class='play' == gameplay page
  document.querySelector('.play').style.display = 'block';
  document.querySelector('.play').classList.add('animated', 'jello', 'slow');
  newBtn.classList.add('animated', 'shake', 'slower');
});

var back = document.querySelector('.btn-back');
var welcome = document.querySelector('.welcome');
var play = document.querySelector('.play');

// BACK BUTTON IN GAMEPLAY PAGE
// this event toggles between pages
back.addEventListener('click', function() {
  play.style.display = 'none';
  welcome.style.display = 'block';
  welcome.classList.add('animated', 'jello', 'slow');
})



// Dice roll function
document.querySelector('.btn-roll').addEventListener('click', function() {
if (gamePlaying){

  dice = Math.floor(Math.random() * 6) + 1;
  document.querySelector('.dice').src = 'dice-' + dice + '.png';
  document.querySelector('.dice').style.display = 'block';
  document.querySelector('.dice').classList.add('animated', 'bounce')
  removeTease();

  //Game rules - If Dice roll == 1, then nextplayer()
  if (dice !== 1) {
    currentScore += dice
    console.log('THIS IS DICE ROLL', dice);
    document.querySelector('.player-' + activePlayer + '-cscore').textContent = currentScore;
  } else {
    //alert('YOU HIT 1 😩');
    rollIsOne();
    nextPlayer();
  }

} else {
  alert('Start a new game!')
};

})

// Hold function
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying){
    gameScore[activePlayer] += currentScore;

    document.querySelector('.player-' + activePlayer + '-rscore').textContent = gameScore[activePlayer];

    // Get the user input winning score and set game winnig score
    // == setWinningScore 
    var setWinningScore = document.querySelector('.set-score').value;
    var winningScore;
    if (setWinningScore) {
      var winningScore = setWinningScore;
    } else {
      winningScore = 10;
    }

    // if active player score === winningScore, player wins
    if (gameScore[activePlayer] == winningScore) {
      //document.querySelector('.player-' + activePlayer + '-name').classList.add('winner');
      alert('Well done! Player' + activePlayer + 'wins. Start a new game.' ) // could add an animation text winner instead of alert
      loserScreen();
      document.querySelector('.btn-new').style.display = 'none';
      document.querySelector('.end-game').style.display = 'block';
      document.querySelector('.dice').style.display = 'none';

      document.querySelector('.player-sec-' + activePlayer).classList.add('win');
      // remove the winning animation from winning player

      // set game state to false to end game
      gamePlaying = false;

      // if player score > winning Score, active player looses
    } else if (gameScore[activePlayer] > winningScore) {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      alert('player ' + activePlayer + ' wins! Score too high.');
      loserScreen();
      document.querySelector('.player-sec-' + activePlayer).classList.add('win');
      document.querySelector('.end-game').style.display = 'block';
      document.querySelector('.btn-new').style.display = 'none';
      document.querySelector('.dice').style.display = 'none';
      gamePlaying = false;
      //document.querySelector('.btn-new').style.display = 'block';
    } else if ((winningScore - gameScore[activePlayer]) <= 5 && (winningScore - gameScore[activePlayer]) >= 1){
      //alert('Very close to beating ass!🤪'); // create and set animation to winning player
      tease();
      nextPlayer();
    } else {
      nextPlayer();
      // set low opacity to non playing player
    };

  };
});

// New game button function (GAMEPLAY PAGE)
document.querySelector('.btn-new').addEventListener('click', function() {
  // reset all states of game and set gameplay to true
  currentScore = 0;
  gameScore  = [0,0];
  activePlayer = 0;
  console.log('active player ' + activePlayer);
  gamePlaying = true;

  //document.querySelector('.player-sec-' + activePlayer).classList.remove('win'); //something wrong here
  document.querySelector('.btn-new').style.display = 'none';
  document.querySelector('.player-0-name').classList.remove('winner');
  document.querySelector('.player-1-name').classList.remove('winner');
  document.querySelector('.player-0-name').classList.remove('active');
  document.querySelector('.player-1-name').classList.remove('active');
  document.querySelector('.player-0-rscore').textContent = '0';
  document.querySelector('.player-1-rscore').textContent = '0';
  document.querySelector('.player-0-cscore').textContent = '0';
  document.querySelector('.player-1-cscore').textContent = '0';
  document.querySelector('.char-select-0').style.display = 'block';
  document.querySelector('.eselect-0').style.display = 'block';
  alert('Select your character Player 1!');
})

// end game button function
var end = document.querySelector('.end-game');
end.addEventListener('click', function() {
  document.querySelector('.player-sec-' + activePlayer).classList.remove('win');
  document.querySelector('.btn-new').style.display = 'block';
  document.querySelector('.end-game').style.display = 'none';
  document.querySelector('.player-sec-0').classList.remove('opacity')
  document.querySelector('.player-sec-1').classList.remove('opacity')
  document.querySelector('.loser-0').style.display = 'none';
  document.querySelector('.loser-1').style.display = 'none';
})

// Next player button
var nxt = document.querySelector('.btn-next');
var playerOne = document.querySelector('.rolls-one-0');
var playerTwo = document.querySelector('.rolls-one-1');
nxt.addEventListener('click', function() {
  nxt.style.display = 'none';
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';
  playerOne.style.display = 'none';
  playerTwo.style.display = 'none';


})



// Player 1 GO! button
// GO! Button (GAMEPLAY PAGE) after selecting player character
document.querySelector('.eselect-0').addEventListener('click', function() {
  var e = document.querySelector(".char-select-0");
  var strUser = e.options[e.selectedIndex].text;
  document.querySelector('.emoji-player-'+ activePlayer).innerHTML = strUser;
  document.querySelector('.slide-'+ activePlayer).innerHTML = 'Catch me! ' + strUser;
  document.querySelector('.eselect-0').style.display = 'none';
  document.querySelector('.char-select-0').style.display = 'none';

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //activePlayer = 1;
  alert('Select your character Player 2!')
  document.querySelector('.char-select-1').style.display = 'block';
  document.querySelector('.eselect-1').style.display = 'block';
})

// ******************* GAME START *******************************
// Player 2 GO! button
// Also set the gamePlaying state to true here
  document.querySelector('.eselect-1').addEventListener('click', function() {
    var a = document.querySelector(".char-select-1");
    var strUser = a.options[a.selectedIndex].text;
    document.querySelector('.emoji-player-'+ activePlayer).innerHTML = strUser;
    document.querySelector('.slide-'+ activePlayer).innerHTML = 'Ready to loose? ' + strUser;
    document.querySelector('.eselect-1').style.display = 'none';
    document.querySelector('.char-select-1').style.display = 'none';
    // COULD ADD ANIMATION HERE AFTER CLICK (Let's Play slides in?)
    activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-name').classList.toggle('active');
    alert('You can set the winning score below! Now lets play!')

    gamePlaying = true;
})


// Next player function
function nextPlayer(){

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  console.log(activePlayer);
  currentScore = 0;
  document.querySelector('.player-0-cscore').textContent = 0;
  document.querySelector('.player-1-cscore').textContent = 0;
  document.querySelector('.player-0-name').classList.toggle('active');
  document.querySelector('.player-1-name').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}

// Loser screen function
function loserScreen() {
  if (activePlayer == 0) {
    document.querySelector('.player-sec-1').classList.add('opacity')
    document.querySelector('.loser-1').style.display = 'block';
  } else {
    document.querySelector('.player-sec-0').classList.add('opacity')
    document.querySelector('.loser-0').style.display = 'block';

  };
};


// set to block and give animation name
function tease() {
  if (activePlayer == 0) {
    document.querySelector('.slide-0').style.display ='block';
    document.querySelector('.slide-0').classList.add('slide1');

  } else {
    document.querySelector('.slide-1').style.display = 'block';
    document.querySelector('.slide-1').classList.add('slide');
  }
}

// set to none and remove animation name
function removeTease() {
  document.querySelector('.slide-1').style.display ='none';
  document.querySelector('.slide-1').classList.remove('slide1');
  document.querySelector('.slide-0').style.display = 'none';
  document.querySelector('.slide-0').classList.remove('slide');
}

// Dice rolls one
function rollIsOne() {
  var playerOne = document.querySelector('.rolls-one-0');
  var playerTwo = document.querySelector('.rolls-one-1');
  document.querySelector('.btn-roll').style.display = 'none';
  document.querySelector('.btn-hold').style.display = 'none';
  document.querySelector('.btn-next').style.display = 'block';
  if (activePlayer == 0) {
    playerOne.style.display = 'block';
  } else {
    playerTwo.style.display = 'block';
  }
}
