let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#btn");
let move = document.querySelector("#count");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");

const values = ["🍎","🍌","🍊","🍇","🍓","🍏","🍉","🍑","🍎","🍌","🍊","🍇","🍓","🍏","🍉","🍑"];

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let clickedFruits = [];     
let clickedBoxes = [];      
let moves = 0;
let matchedPairs = 0;

let randomValues = shuffleArray(values);

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        
        if (clickedBoxes.includes(box) || clickedBoxes.length === 2) return;
        

        const fruit = randomValues[index];
        box.innerText = fruit;

        clickedFruits.push(fruit);
        clickedBoxes.push(box);

        console.log("Clicked fruits:", clickedFruits);

        if (clickedFruits.length === 2) {
            
            moves++;
            console.log("moves=", moves);
            move.innerText = `Moves: ${moves}`;

            if (clickedFruits[0] === clickedFruits[1]) {
                console.log("Matching");

                clickedBoxes[0].style.pointerEvents = "none";
                clickedBoxes[1].style.pointerEvents = "none";

                matchedPairs++;

                clickedFruits = [];
                clickedBoxes = [];

                if(matchedPairs==8){
                    console.log("done");
                    msg.innerText = `Yipee! all pairs matched in ${moves} moves`;
                    msgContainer.classList.remove("hide"); 
                    
                }

            } else {
                console.log("Not matched");

                setTimeout(() => {
                    clickedBoxes[0].innerText = "?";
                    clickedBoxes[1].innerText = "?";

                    clickedFruits = [];
                    clickedBoxes = [];
                }, 1000);
            }
        }
    });
});

const resetGame = () => {
    clickedFruits = [];
    clickedBoxes = [];
    matchedPairs = 0;
    moves = 0;
    move.innerText = `Moves: 0`;
    
    msgContainer.classList.add("hide");

    randomValues = shuffleArray(values);
    
    boxes.forEach((box, index) => {
        box.innerText = "?";
        box.style.pointerEvents = "auto"; 
    });
}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);