let deckId = ''
let leftForWar = 0
let node = document.querySelector('.flexbox-container')
let clone = node.cloneNode(true)

// grabbing new deck from API to play game with
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

// Button that makes next round run
document.querySelector('#btn').addEventListener('click', grabTwo)
// Button that makes war run
document.querySelector('#warbtn').addEventListener('click', war)
// Button to see who won
document.querySelector('#checkforwinner').addEventListener('click', seeWhoWon)

// grabs 2 cards when button is clicked and checks who is the winner
function grabTwo(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.querySelector('#card1').src = data.cards[0].image
    document.querySelector('#card2').src = data.cards[1].image
// compares value of the 2 cards to decide who wins or if its war
    if (convertToNum(data.cards[0].value) > convertToNum(data.cards[1].value)){
      document.querySelector('h3').innerHTML = 'Player 1 wins!';
      document.querySelector('#score1').textContent =  +document.querySelector('#score1').textContent + 2 // adds 2 to score
      isGameOver(data.remaining)
    }else if (convertToNum(data.cards[0].value) < convertToNum(data.cards[1].value)){
      document.querySelector('h3').innerHTML = 'Player 2 wins!';
      document.querySelector('#score2').textContent =  +document.querySelector('#score2').textContent + 2 // adds 2 to score
      isGameOver(data.remaining)
    }else {
      document.querySelector('h3').innerHTML = 'WAR!!!!'
      document.querySelector("#warbtn").style.display = "block" 
      document.querySelector("#btn").style.display = "none"
      leftForWar = warCount(data.remaining)
      isGameOver(data.remaining)
    } 
  })
} 
// Code for what to do when players reach a draw/war 
function war(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${leftForWar}`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.querySelector('#card1').src = data.cards[0].image
    document.querySelector('#card2').src = data.cards[1].image

// compares value of the 2 cards to decide who wins or if its war also adds 8 points or what was left in the deck
    if (convertToNum(data.cards[0].value) > convertToNum(data.cards[1].value)){
      document.querySelector('h3').innerHTML = 'Player 1 wins!';
      document.querySelector('#score1').textContent =  +document.querySelector('#score1').textContent + leftForWar + 2// adds 10 or whats left to score
      document.querySelector("#btn").style.display = "block" //toggles draw 2 button back on and hides war button
      document.querySelector("#warbtn").style.display = "none" 
      isGameOver(data.remaining)
    }else if (convertToNum(data.cards[0].value) < convertToNum(data.cards[1].value)){
      document.querySelector('h3').innerHTML = 'Player 2 wins!';
      document.querySelector('#score2').textContent =  +document.querySelector('#score2').textContent + leftForWar + 2// adds 10 or whats left to score
      document.querySelector("#btn").style.display = "block" //toggles draw 2 button back on and hides war button
      document.querySelector("#warbtn").style.display = "none" 
      isGameOver(data.remaining)
    }else {
      document.querySelector('h3').innerHTML = 'WAR!!!!'
      document.querySelector("#warbtn").style.display = "block" 
      document.querySelector("#btn").style.display = "none"
      leftForWar = warCount(data.remaining)
      isGameOver(data.remaining)
    } 
  })
} 

// converts face cards to their number value
function convertToNum(val){
  if ( val === 'ACE'){
    return 14
  }else if ( val === 'KING'){
    return 13
  }else if ( val === 'QUEEN'){
    return 12
  }else if ( val === 'JACK'){
    return 11
  } else return Number(val)
}

// in the case of war this function checks to see if there is enough cards to run war, if not it runs it with whatever cards remain.
function warCount(val){
  if (+val < 8){
    return +val
  }else return 8
}

function isGameOver(val){ // checks to see if deck is out of cards
  if(val === 0){
    document.querySelector("#btn").style.display = "none"
    document.querySelector("#warbtn").style.display = "none"
    document.querySelector("#checkforwinner").style.display = "flex"
    let scr = document.getElementsByClassName('score')// hides the score
    for (let i=0; i < scr.length; i+=1){
      scr[i].style.display = 'none'
    }
  }
}

function seeWhoWon(){ // checks to see who won
  let elems = document.getElementsByClassName('game')// hides the game
  for (let i=0; i < elems.length; i+=1){
    elems[i].style.display = 'none'
  }
  document.querySelector("#gameend").style.display = "flex"// displays winner
  if (document.querySelector('#score1').textContent < document.querySelector('#score2').textContent){ // decides who won
    document.querySelector('#whowon').innerHTML = 'Player 2'
  }else document.querySelector('#whowon').innerHTML = 'Player 1'
}
