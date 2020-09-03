const cards = Array.from(document.querySelectorAll(".card"));
const imagesArr = [
  "./images/img2.png",
  "./images/img3.png",
  "./images/img1.png",
  "./images/img4.png",
  "./images/img5.png",
  "./images/img6.png",
  "./images/img7.png",
  "./images/img8.png",
  "./images/img9.png",
  "./images/img10.png",
  "./images/img11.png",
  "./images/img12.png",
];

window.onload = function () {
  imagesArr.forEach((x) => {
    fetch(x);
  });
};

const playAgain = document.querySelector("button");
const counterDisplays = document.querySelectorAll(".counter");
const grid = document.querySelector("ul");
const winMessage = document.querySelector(".win-alert");
let count = 0;

// reset after win----------------
playAgain.addEventListener("click", () => reset());

// rendering random images array--------
generateGame();

function generateGame() {
  let images = imagesArr.concat([...imagesArr]);
  shuffle(images);
  for (let i = 0; i < images.length; i++) {
    cards[i].style.background = `url(${images[i]}) center/cover`;
  }
}

// handeling click event --------------------
let chosenCards = [];

cards.forEach((card) => {
  card.addEventListener("click", function () {
    if (
      this.dataset.matched === "true" ||
      !this.classList.contains("covered") ||
      chosenCards.length > 1
    ) {
      return;
    } else {
      if (chosenCards.length < 1) {
        showCard(this);
      } else if ((chosenCards.length = 1)) {
        updateCount();
        showCard(this);
        setTimeout(checkMatch, 600);
      }
    }
    checkWin();
  });
});

// helper functions ------------------

// shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// show card
function showCard(clicked) {
  clicked.classList.remove("covered");
  chosenCards.push(clicked);
}
// check for a match
function checkMatch() {
  if (chosenCards[0].style.background === chosenCards[1].style.background) {
    for (let chosenCard of chosenCards) {
      chosenCard.dataset.matched = "true";
    }
    chosenCards = [];
  } else {
    for (let chosenCard of chosenCards) {
      chosenCard.classList.add("covered");
    }
    chosenCards = [];
  }
}
// update the count
function updateCount() {
  count += 1;
  counterDisplays.forEach((counterDisplay) => {
    counterDisplay.textContent = `${count}`;
  });
}
// check for a win
function checkWin() {
  if (
    cards.every((card) => {
      return !card.classList.contains("covered");
    })
  ) {
    winMessage.style.visibility = "visible";
    grid.style.filter = "blur(3px)";
  }
}

// new game
function reset() {
  winMessage.style.visibility = "hidden";
  grid.style.filter = "";
  cards.forEach((card) => {
    card.classList.add("covered");
    card.dataset.matched = "false";
  });
  count = 0;
  counterDisplays.forEach((counterDisplay) => {
    counterDisplay.textContent = `${count}`;
  });
  generateGame();
}
