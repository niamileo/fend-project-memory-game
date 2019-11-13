let cards = document.querySelector('ul.deck');
var timing = 0;
/*
 * Create a list that holds all of your cards
 */
const allCards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function initGame() {
    timing = 0;
    setInterval(function() { timing++; }, 1000);
    var cardsHtml = shuffle(allCards).map(function(card) {
        return generateCard(card);
    });
    cards.innerHTML = cardsHtml.join('');
    // console.log(cardsHtml);
}

initGame();

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let openedCards = [];

cards.addEventListener('click', function(e) {
    if (e.target.nodeName === 'LI') {
        if (!e.target.classList.contains('open') && !e.target.classList.contains('show') && !e.target.classList.contains('match')) {
            // console.log(!e.target.classList.contains('open'));
            openedCards.push(e.target);
            e.target.classList.add('open', 'show');

            if (openedCards.length === 2) {

                // Check if they Match
                if (openedCards[0].dataset.card === openedCards[1].dataset.card) {
                    openedCards[0].classList.add('match');
                    openedCards[0].classList.remove('open', 'show');
                    openedCards[1].classList.add('match');
                    openedCards[1].classList.remove('open', 'show');
                }


                // If they don't Match
                setTimeout(function() {
                    openedCards[0].classList.remove('open', 'show');
                    openedCards[1].classList.remove('open', 'show');
                    openedCards = []
                }, 400);
            }
        }
    }
});