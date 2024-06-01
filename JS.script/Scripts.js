const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, SecondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    SecondCard = this
    checkforMach();
}

function checkforMach() {
    let isMatch = firstCard.dataset.framework === SecondCard.dataset.framework;

    isMatch ? disableCards() :  unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    SecondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

     setTimeout( () => {
    firstCard.classList.remove('flip');
    SecondCard.classList.remove('flip');

    resetBoard(); 
    }, 500);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, SecondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() *12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));