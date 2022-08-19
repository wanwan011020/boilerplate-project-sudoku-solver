class SudokuSolver {
  //Checks if puzzle string is valid 
  validate(puzzleString) {
    if (Boolean(puzzleString)===false){
        return 'Required field missing'; 
    }
    if (puzzleString.split("").length !== 81){
      return "Expected puzzle to be 81 characters long"; 
    }
    else if (/[^0-9\.]/.test(puzzleString)){
      return "Invalid characters in puzzle"; 
    }
    else{
      return puzzleString; 
    }
  }

  //Given the puzzle stirng, check the row to see if value's placement is valid  
  checkRowPlacement(board, row, column, value) {
    let fixedI = this.convertLetterToRow(row)
    let j = Number(column)-1; 
    for (let i=0; i<9; i++){
      if (board[fixedI][j]===value && i===fixedI){
        return true
      }
      else if (board[i][j]===value){
        return false; 
      }
    }
    return true; 
  }

  //Given the puzzle stirng, check the column to see if value's placement is valid  
  checkColPlacement(board, row, column, value) { 
   let i = this.convertLetterToRow(row)
   let j = Number(column)-1; 
   if (board[i][j]===value){
     return true
   }
   return (board[i].indexOf(value)<0); 
  }

  checkRegionPlacement(board, row, column, value) {
    row = this.convertLetterToRow(row); 
    column = Number(column)-1; 
    if (board[row][column]===value){
      return true
    }
    let startRow = row - row % 3;
    let startCol = column - column % 3;
    // for i in range(3):
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
         if (board[i + startRow][j + startCol] === value){
           return false
         }
      }
    }
    return true
  }

  //Solve Sudoku puzzle 
  solve(puzzleString) {
    let board = this.transformToBoard(puzzleString);
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; 
    if (this.fillInNumbers(board, 0, 0)){
      return board.flat().join("")
    } 
    else{
      return "Puzzle cannot be solved"; 
    }
  }
  isSafe(board, i, j, value){
    let letterRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; 
    let isRegionPlaceable = this.checkRegionPlacement(board, letterRows[i], j+1, value); 
    let isColPlacementValid = this.checkColPlacement(board, letterRows[i], j+1, value);
     let isRowPlacementValid = this.checkRowPlacement(board, letterRows[i], j+1, value);  
    return (isRegionPlaceable && isColPlacementValid && isRowPlacementValid); 
  }

  fillInNumbers(board, row, column){
    if (row === 8 &&  column === 9){
      return true;
    }
    
    if (column===9){
      row += 1;
      column = 0; 
    }

    if (board[row][column] !=="."){
      return this.fillInNumbers(board, row, column + 1)
    }
    for (let value = 1; value <=9; value++){
      if (this.isSafe(board, row, column, String(value))){
        board[row][column] = String(value); 
        if (this.fillInNumbers(board, row, column + 1)){
          return true
        }
      }
      board[row][column] = "."
    }
    return false; 
  }

  transformToBoard(puzzleString){
    let board = []; 
    let puzzleArr = puzzleString.split(""); 
    for (let i=0; i<9; i++){
      board.push(puzzleArr.slice(9*i, (i+1)*9))
    } 
    return board; 
  }

  convertLetterToRow(row){
    const rowConverter = {
      A:0, 
      B:1, 
      C:2, 
      D:3, 
      E:4, 
      F:5, 
      G:6, 
      H:7, 
      I:8
    }
    return rowConverter[row]; 
  }
}
module.exports = SudokuSolver;
