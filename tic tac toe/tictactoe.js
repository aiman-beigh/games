const array = document.querySelectorAll(".box");
const text = document.querySelector(".text");
const restart = document.querySelector(".restart");
const winnerannouncement=document.querySelector(".winnerannouncement")
let arr = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let winnArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let roundWon = false;
let gamestop = false;
initialize();

function initialize() {
  displayPlayer();
  array.forEach((array) =>
    array.addEventListener("click", () => {
      let cellindex = array.getAttribute("cellindex");
      if (arr[cellindex] == "" && !gamestop) {
        if (currentPlayer == "X") {
          array.textContent = currentPlayer;
          arr[cellindex] = currentPlayer;

          winner(currentPlayer);
          currentPlayer = "0";
          displayPlayer();
        } else {
          array.textContent = currentPlayer;
          arr[cellindex] = currentPlayer;
          winner(currentPlayer);
          currentPlayer = "X";

          displayPlayer();
        }
      }
   })
  );


 
   
} 
restart.addEventListener("click", () => {
    array.forEach((array) => (array.textContent = " "));
   arr = ["", "", "", "", "", "", "", "", ""]; 
   currentPlayer = "X";
     gamestop = false;
     roundWon=false
     winnerannouncement.textContent=''
    initialize()
  });

function winner(currentPlayer) {
  for (let i = 0; i < winnArray.length; i++) {
    let options = winnArray[i];
    console.log("gfghf")
    let cell1 = arr[options[0]];
    let cell2 = arr[options[1]];
    let cell3 = arr[options[2]];
    if (cell1 == "" || cell2 == "" || cell3 == "") {
        console.log("1")
      continue;
    }
    if (cell1 == cell2 && cell2 == cell3) {
      roundWon = true;
      
      break;
    }
  }
  if (roundWon) {
   
    winnerannouncement.textContent=`${currentPlayer} won`
    winnerannouncement.style.color='green'
    
    gamestop = true;
  } else if (!arr.includes("")) {
    winnerannouncement.textContent=`draw match!Press restart `
    winnerannouncement.style.color='red'
  } 
  
    initialize();
 
}
function displayPlayer() {
  text.textContent = `${currentPlayer}'s turn`;
}