const movesCounter = document.querySelector(".moves-counter");
const timeCounter = document.querySelector(".time-counter");
const winContainer = document.querySelector(".win-container");
const winMessage = document.querySelector(".win-message");
const movesMessage = document.querySelector(".moves-message");
const gridCard = document.querySelectorAll(".grid-card");
const cardBack = document.querySelectorAll(".card-back");
const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");

let cards = [
  { name: "buns", image: "buns.png" },
  { name: "donut", image: "donut.png" },
  { name: "french-fries", image: "french-fries.png" },
  { name: "hamburger", image: "hamburger.png" },
  { name: "fried-chicken", image: "fried-chicken.png" },
  { name: "lettuce", image: "lettuce.png" },
  { name: "pizza", image: "pizza.png" },
  { name: "ramen", image: "ramen.png" },
];

let gameStart = false;

let firstCard = false,
  secondCard = false;

let interval;

let seconds = 0,
  minutes = 0;

let moves = 0;

let numofmatches = 0;

let winStatus = false;

//time counter and formatting
const timeGenerator = () => {
  seconds++;

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  let formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  timeCounter.innerHTML = `<span>Time : </span>${formatMinutes} : ${formatSeconds}`;
};

//counts the number of moves
const movesCount = () => {
  moves++;
  movesCounter.innerHTML = `<span>Moves : </span>${moves}`;
};

//generates random cards array
const randomCardGenerator = () => {
  let randomCards = [...cards, ...cards];

  for (let i = randomCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomCards[i], randomCards[j]] = [randomCards[j], randomCards[i]];
  }
  console.log(randomCards);
  return randomCards;
};

let firstCardName;

//main function of the game

gridCard.forEach((val) => {
  val.addEventListener("click", () => {
    console.log(val);
    if (gameStart) {
      console.log(gameStart);
      let tempCardBack = val.children[0].children[1].children[0];
      // console.log(tempCardBack);

      if (!firstCard) {
        firstCard = val;
        // console.log(firstCard);
        firstCardName = tempCardBack.dataset.cardName;
        console.log(firstCardName);
        firstCard.style.pointerEvents = `none`;
        console.log(
          window.getComputedStyle(firstCard).getPropertyValue("pointer-events")
        );
      } else {
        movesCount();
        secondCard = val;
        console.log(secondCard);

        let secondCardName = tempCardBack.dataset.cardName;
        console.log(secondCardName);
        setTimeout(() => {
          gameStart = true;
        }, 400);

        let [tempFirst, tempSecond] = [firstCard, secondCard];

        console.log(
          window.getComputedStyle(tempFirst).getPropertyValue("pointer-events")
        );

        if (firstCardName === secondCardName) {
          numofmatches++;
          console.log(numofmatches);

          setTimeout(() => {
            tempFirst.classList.add("scaleout");
            tempSecond.classList.add("scaleout");

            tempFirst.classList.remove("scalein");
            tempSecond.classList.remove("scalein");
            // tempFirst.classList.add("trans");
            // tempSecond.classList.add("trans");
          }, 700);

          if (numofmatches == 8) {
            winStatus = true;
            console.log("You win");
            //stopGame();
            displayMessage("You Win");
          }
          firstCard = false;
        } else {
          setTimeout(() => {
            tempFirst.classList.remove("flipped");
            tempSecond.classList.remove("flipped");
          }, 700);
          gameStart = false;
          firstCard.style.pointerEvents = `auto`;
          firstCard = false;
          secondCard = false;
        }
      }
      val.classList.add("flipped");
    }
  });
});

//game starts
startButton.addEventListener("click", () => {
  gameStart = true;

  let randomCards = randomCardGenerator();

  cardBack.forEach((val, index) => {
    val.innerHTML = `<img src="images/${randomCards[index].image}" alt="" data-card-name="${randomCards[index].name}" />`;
  });

  interval = setInterval(timeGenerator, 1000);
  // winContainer.style.visibility = `visible`;
  winContainer.style.visibility = `hidden`;

  if (winStatus) {
    gridCard.forEach((val) => {
      //val.classList.remove("trans");
      setTimeout(() => {
        val.classList.add("scalein");
        val.classList.remove("scaleout");
      }, 100);
      val.classList.remove("flipped");
      val.style.pointerEvents = `auto`;
    });
    numofmatches = 0;
  }

  startButton.disabled = true;
  startButton.style.display = `none`;

  stopButton.disabled = false;
  stopButton.style.display = `inline-block`;
});

//game stops
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    gameStart = false;

    gridCard.forEach((val) => {
      //val.classList.remove("trans");
      setTimeout(() => {
        val.classList.add("scalein");
        val.classList.remove("scaleout");
      }, 100);
      val.classList.remove("flipped");
      val.style.pointerEvents = `auto`;
    });
    numofmatches = 0;

    common();

    startButton.disabled = false;
    startButton.style.display = `inline-block`;

    stopButton.disabled = true;
    stopButton.style.display = `none`;
  })
);

function displayMessage(message) {
  //   console.log("displayMessage(message) function called");
  winMessage.innerHTML = `${message}`;
  console.log(winMessage.innerHTML);
  movesMessage.innerHTML = `Moves : ${moves}`;
  setTimeout(() => {
    winContainer.style.visibility = `visible`;
    console.log(
      window.getComputedStyle(winContainer).getPropertyValue("visibility")
    );
    startButton.disabled = false;
    startButton.style.display = `inline-block`;

    stopButton.disabled = true;
    stopButton.style.display = `none`;
  }, 1200);
  common();
}

function common() {
  clearInterval(interval);

  moves = 0;
  seconds = 0;
  minutes = 0;
  movesCounter.innerHTML = `<span>Moves : </span>0`;
  timeCounter.innerHTML = `<span>Time : </span>00 : 00`;
}
