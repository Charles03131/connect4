/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;


let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/*
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  
  const board=document.getElementById("board");


  // this makes a click-able column top  that will allow you to place your game piece
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick); 
  


  console.log(top);
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); //this creates the table data for each column*WIDTH
    headCell.setAttribute('id', x); 
    console.log(headCell);
    top.append(headCell); 
  }
  board.append(top);    

  // this makes the main board of the game
  for (let y = 0; y < HEIGHT; y++) { 
    const row = document.createElement("tr"); 
    for (let x = 0; x < WIDTH; x++) { 
      const cell = document.createElement("td");
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell); 
      
    }
         board.append(row);  //this adds the row  to the html page
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--){
    if (!board[y][x]){
      return y;
    }
  }
  return null;
}
 


// placeInTable: update DOM to place piece into HTML table of board //

function placeInTable(y, x) {
  const piece=document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot=document.getElementById(`${y}-${x}`);
  spot.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
 const x =+evt.target.id;

 console.log(x);

  // get next spot in column (if none, ignore click)
  const y=findSpotForCol(x);
  if(y===null){
    return;
  }

  // place piece in board and add to HTML table

board[y][x]=currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie

  
      // every row has to be full and every cell filled. 
      if(board.every(row=>row.every(cell=>cell))){
        return endGame("TIE");
      }
      
currPlayer=currPlayer=== 1 ? 2 : 1;
   const playerTurn=document.getElementById("playersturn");
   playerTurn.innerText=`Player ${currPlayer}'s turn`;
    }
  // switch players


    
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //starting at 0 for x and y we are checking/getting
    //4 cells at a time to check see if they are a win horz,vert,diag(ascending,decending)
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
