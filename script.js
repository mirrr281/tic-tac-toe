const body = document.querySelector("body");
const container = document.querySelector(".container");
const result = document.querySelector(".result");
const whoTurn = document.querySelector(".who");
let gameOver = false;
let isX = true;

const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// player turn
// player x and player o
// player get turn until they win/lose/draw
// to win they need to match certain pattern
// draw happen when the board is full
function gameOver(){
  
}
// verify move
function verifyMove(e) {
  if (!e.target.classList.contains("X") && !e.target.classList.contains("O")) {
    if (isX) {
      e.target.textContent = "X";
      e.target.classList.add("X");
      result.textContent = "it's O Turn";
      verifyPattern("X");
      isX = false;
    } else {
      e.target.textContent = "O";
      e.target.classList.add("O");
      result.textContent = "it's X Turn";
      verifyPattern("O");
      isX = true;
    }
  }
}

// if boxes with class of $who, get all list of index number is in the pattern list

function verifyPattern(who) {
  if (gameOver) return;
  const boxes = container.querySelectorAll("div");
  const boxesArray = Array.from(boxes);

  const selectedBoxes = boxesArray.reduce((result, box) => {
    if (box.classList.contains(who)) {
      result.push(Number(box.classList[0]));
    }
    return result;
  }, []);

  console.log(selectedBoxes);

  // idk what is this, gpt does it
  const isWin = patterns.some((pattern) => {
    return pattern.every((index) => {
      return selectedBoxes.includes(index);
    });
  });

  if (isWin) {
    gameOver = true;

    result.textContent = `${who} win`;
    boxes.forEach((box) => {
      box.removeEventListener("click", verifyMove);
    });

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Game";
    // im too lazy
    restartBtn.addEventListener("click", () => {
      window.location.reload();
    });

    body.appendChild(restartBtn);
  }
}

function init() {
  // populate all 9 unique box
  for (i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.classList = i;
    box.addEventListener("click", verifyMove);
    container.appendChild(box);
  }

  result.textContent = "it's X Turn";
}

init();
// horizontal line check
//   if (
//     boxes[0].classList.contains(who) &&
//     boxes[1].classList.contains(who) &&
//     boxes[2].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }

//   if (
//     boxes[3].classList.contains(who) &&
//     boxes[4].classList.contains(who) &&
//     boxes[5].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }

//   if (
//     boxes[6].classList.contains(who) &&
//     boxes[7].classList.contains(who) &&
//     boxes[8].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }

//   // vertical line check

//   if (
//     boxes[0].classList.contains(who) &&
//     boxes[3].classList.contains(who) &&
//     boxes[6].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }

//   if (
//     boxes[1].classList.contains(who) &&
//     boxes[4].classList.contains(who) &&
//     boxes[7].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }

//   if (
//     boxes[2].classList.contains(who) &&
//     boxes[5].classList.contains(who) &&
//     boxes[8].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }

//   // cross check
//   if (
//     boxes[0].classList.contains(who) &&
//     boxes[4].classList.contains(who) &&
//     boxes[8].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }
//   if (
//     boxes[2].classList.contains(who) &&
//     boxes[4].classList.contains(who) &&
//     boxes[6].classList.contains(who)
//   ) {
//     result.textContent = `${who} win`;
//   }

// which player
// draw the board if it is not occupied
// verify pattern
