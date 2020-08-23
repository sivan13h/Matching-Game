const cards = Array.from(document.querySelectorAll(".card"));
const imagesArr = [
  "url(/dist/images/img1.png) center/cover",
  "url(/dist/images/img2.png) center/cover",
  "url(/dist/images/img3.png) center/cover",
  "url(/dist/images/img4.png) center/cover",
  "url(/dist/images/img5.png) center/cover",
  "url(/dist/images/img6.png) center/cover",
  "url(/dist/images/img7.png) center/cover",
  "url(/dist/images/img8.png) center/cover",
  "url(/dist/images/img9.png) center/cover",
  "url(/dist/images/img10.png) center/cover",
  "url(/dist/images/img11.png) center/cover",
  "url(/dist/images/img12.png) center/cover",
  "url(/dist/images/img1.png) center/cover",
  "url(/dist/images/img2.png) center/cover",
  "url(/dist/images/img3.png) center/cover",
  "url(/dist/images/img4.png) center/cover",
  "url(/dist/images/img5.png) center/cover",
  "url(/dist/images/img6.png) center/cover",
  "url(/dist/images/img7.png) center/cover",
  "url(/dist/images/img8.png) center/cover",
  "url(/dist/images/img9.png) center/cover",
  "url(/dist/images/img10.png) center/cover",
  "url(/dist/images/img11.png) center/cover",
  "url(/dist/images/img12.png) center/cover",
];
const playAgain = document.querySelector("button");
const counterDisplays = document.querySelectorAll(".counter");
const grid = document.querySelector("ul");
const winMessage = document.querySelector(".win-alert");
let count = -1;

// reset after win----------------
playAgain.addEventListener("click", () => reset());

// rendering random images array--------
generateGame();

function generateGame() {
  shuffle(imagesArr);
  for (let i = 0; i < 24; i++) {
    cards[i].style.background = imagesArr[i];
  }
}

// handeling click event --------------------
let chosenCards = [];

cards.forEach((card) => {
  card.addEventListener("click", function () {
    if (
      this.dataset.matched === "true" ||
      !this.classList.contains("covered")
    ) {
      return;
    } else {
      if (chosenCards.length < 2) {
        updateCount();
        showCard(this);
      } else {
        checkMatch();
        showCard(this);
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
  generateGame();
}
