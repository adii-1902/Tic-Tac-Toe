// select 
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

// to track the turn 
let turnO = true;  //playesX,playerO

// 2d array 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5,],
    [6, 7, 8]
]
// function to reset the game
const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#DDA71C";
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "#0cb8a8"
            turnO = true;
        }
        box.disabled = true;    // to avoid the double clicking the same box
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
})

// function to check the draw condition
const gameDraw = () => {
    msg.innerText = `Oops, it's a draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


// function to avoid the case - when someone wins the game the remaining buttons should not be pressed
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// function to enable all the boxes when new game starts
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
// function to show the winner
const showWinner = (winner) => {

    msg.innerText = `Congratulations, winner is ${winner}.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
// function to check the winner 
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        // check for non empty value 
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("Winner !!" , pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);