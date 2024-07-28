
startGame();

function startGame(){
  game.createCardFromFlags();
  game.addClickEvents();
  game.shuffleCards();
  createCardHTML(game.cards);  
}


function createCardHTML(cards){

  let cardHTML = '';

  cards.forEach((card) => {
    cardHTML += `
    <div class="card" id="${card.id}">
      <div class="card-front">
        <img class="icon" src="flags/${card.icon}.svg">
      </div>
      <div class="card-back">
        &lt/&gt
      </div>
    </div>`;
  })
  document.querySelector(".gameBoard")
    .innerHTML = cardHTML;

  document.querySelectorAll('.card')
    .forEach((card) => {
      card.addEventListener('click', () => {
        flipCard(card.id);
      })
    })
}

function flipCard(id){

  if(game.setCard(id)){
    let cardClass = document.getElementById(id);
    cardClass.classList.add("flip");
    if(game.secondCard){
      if(game.checkMatch()){
        game.clearCards();
        if(game.checkGameOver()){
          document.querySelector(".overlay")
            .style.display = 'flex';
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
  
          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        },1000);
      }
    }
  }
}
