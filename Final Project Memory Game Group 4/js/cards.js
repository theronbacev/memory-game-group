'use strict';

$("#tabs").tabs();

let cardsArray = [{
  'name': 'chair',
  'img': 'img/card_1.png'
}, {
  'name': 'bird1',
  'img': 'img/card_2.png'
}, {
  'name': 'bird3',
  'img': 'img/card_3.png'
}, {
  'name': 'daisy',
  'img': 'img/card_4.png'
}, {
  'name': 'card',
  'img': 'img/card_5.png'
}, {
  'name': 'coffee',
  'img': 'img/card_6.png'
}, {
  'name': 'egg',
  'img': 'img/card_7.png'
}, {
  'name': 'flame',
  'img': 'img/card_8.png'
}, {
  'name': 'giraffe',
  'img': 'img/card_9.png'
}, {
  'name': 'mountain',
  'img': 'img/card_10.png'
}, {
  'name': 'clover',
  'img': 'img/card_11.png'
}, {
  'name': 'isicle',
  'img': 'img/card_12.png'
}, {
  'name': 'orange',
  'img': 'img/card_13.png'
}, {
  'name': 'tangerine',
  'img': 'img/card_14.png'
}, {
  'name': 'penguin',
  'img': 'img/card_15.png'
}, {
  'name': 'flower',
  'img': 'img/card_16.png'
}, {
  'name': 'necterine',
  'img': 'img/card_17.png'
}, {
  'name': 'rose',
  'img': 'img/card_18.png'
}, {
  'name': 'sheep',
  'img': 'img/card_19.png'
}, {
  'name': 'snowman',
  'img': 'img/card_20.png'
}, {
  'name': 'teabag',
  'img': 'img/card_21.png'
}, {
  'name': 'xo',
  'img': 'img/card_22.png'
}, {
  'name': 'whale',
  'img': 'img/card_23.png'
}, {
  'name': 'balloons',
  'img': 'img/card_24.png'
}];

let limitedCardArray = cardsArray.slice(0,gamesApp.settings.getNumofImages());
let gameGrid = limitedCardArray.concat(limitedCardArray).sort(function () {
  return .5 - Math.random();
});

let choice1 = '';
let choice2 = '';
let count = 0;
let previousTarget = null;
let delay = 700;

let game = document.getElementById('game');
let grid = document.createElement('CARD');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  let name = item.name,
  img = item.img;
  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;
  let front = document.createElement('div');
  front.classList.add('front');
  let back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

let match = function match() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

let resetGuesses = function resetGuesses() {
  choice1 = '';
  choice2 = '';
  count = 0;
  previousTarget = null;
  let selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'CARD' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      choice1 = clicked.parentNode.dataset.name;
      console.log(choice1);
      clicked.parentNode.classList.add('selected');
    } else {
      choice2 = clicked.parentNode.dataset.name;
      console.log(choice2);
      clicked.parentNode.classList.add('selected');
    }

    if (choice1 && choice2) {
      gamesApp.scores.incrementMove();
      gamesApp.scores.updateScore();
      if (choice1 === choice2) {
        setTimeout(match, delay);
        gamesApp.scores.correctMove();
        gamesApp.scores.updateScore();
        gamesApp.scores.isGameFinished();
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
