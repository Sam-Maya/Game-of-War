let deckId = ''

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
document.querySelector('#btn').addEventListener('click', test)

// grabs 2 cards when button is clicked and checks who is the winner
function test(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.querySelector('#card1').src = data.cards[0].image
    document.querySelector('#card2').src = data.cards[1].image

    if (convertToNum(data.cards[0].value) > convertToNum(data.cards[1].value)){
      document.querySelector('h3').innerHTML = 'player 1 wins!';
      document.querySelector('#score1').textContent =  +document.querySelector('#score1').textContent + 1 // adds 1 to score
    }else if (convertToNum(data.cards[0].value) < convertToNum(data.cards[1].value)){
      document.querySelector('h3').innerHTML = 'player 2 wins!';
      document.querySelector('#score2').textContent =  +document.querySelector('#score2').textContent + 1 // adds 1 to score
    }else {
      document.querySelector('h3').innerHTML = 'WAR'
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}

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