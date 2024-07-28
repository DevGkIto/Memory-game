let game = {

  flags : [
    'austria',
    'belgium',
    'ethiopia',
    'greece',
    'haiti',
    'italy',
    'japan',
    'paraguay',
    'saudi arabia',
    'uruguay',
  ],

  cards: [],
  firstCard: null,
  secondCard: null,
  lockMode: false,

  setCard: function(id){

    let card = this.cards.filter((card) => card.id === id)[0];

    if(card.flipped || this.lockMode){
      return false;
    }

    if(!this.firstCard){
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }

  },

  checkMatch: function(){
    if(!this.firstCard || !this.secondCard){
      return false;
    }

    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function(){
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function(){
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function(){
    return this.cards.filter(card => card.flipped).length == this.cards.length;
  },

  restart: function(){
    this.cards = [];
    this.clearCards();
    startGame();
  },

  createCardFromFlags: function(){

    this.flags.forEach((flag) => {    
      this.cards.push({
        id: this.generateFlagID(flag),
        icon: flag,
        flipped: false,
      });
      this.cards.push({
        id: this.generateFlagID(flag),
        icon: flag,
        flipped: false
      });
    })
  },

  generateFlagID: function(flag){
    return flag + parseInt(Math.random() * 1000);
  },

  shuffleCards: function(){

    for(let i = this.cards.length - 1; i > 0; i--){
      let j = Math.floor(Math.random()* (i+1));
      [this.cards[i], this.cards[j]] = [this.cards[j],this.cards[i]];
    }
  },

  addClickEvents: function(){

    document.querySelectorAll('.card')
      .forEach((card) => {
        card.addEventListener('click', () => {
          flipCard(card.id);
      })
    })

    document.querySelector(".play-again-button")
      .addEventListener('click', () => {
        this.restart();
        document.querySelector(".overlay")
          .style.display = 'none';
      })
  }
}

  
