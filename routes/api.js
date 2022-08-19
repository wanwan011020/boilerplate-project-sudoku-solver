'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle, coordinate, value} = req.body; 
      let validPuzzle = solver.validate(puzzle); 
      if (!puzzle || !coordinate || !value){
        res.json({error:'Required field(s) missing'})
      }
      else if (validPuzzle==="Invalid characters in puzzle"){
        res.json({error:"Invalid characters in puzzle"})
      } 
      else if (validPuzzle==="Expected puzzle to be 81 characters long"){
        res.json({error:"Expected puzzle to be 81 characters long"}); 
      }
      else if (/^([A-I][1-9])$/.test(coordinate)===false){
        res.json({error: 'Invalid coordinate'})
      } 
      else if (/^[1-9]$/.test(value)===false){
        res.json({ error: 'Invalid value' })
      }
      else{
        let row = coordinate.split("")[0];  
        let column = coordinate.split("")[1];
        let board = solver.transformToBoard(validPuzzle);
        let conflict = []; 
        if (solver.checkRowPlacement(board, row, column, value)===false){
          conflict.push("row"); 
        }
        if (solver.checkColPlacement(board, row, column, value)===false){
          conflict.push("column"); 
        }
        if (solver.checkRegionPlacement(board, row, column, value)===false){
          conflict.push("region"); 
        }

        if (conflict.length===0){
          res.json({valid:true})
        }
        else{
          res.json({valid:false, conflict})
        }


      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      //Validate the puzzle; make sure its exactly 81 characters long and doesn't contain any characters that are not periods or digits.
      let validPuzzle = solver.validate(puzzle);
      if (validPuzzle==="Required field missing"){
        res.json({error:'Required field missing'})
      }
      else if (validPuzzle==="Invalid characters in puzzle"){
        res.json({error:"Invalid characters in puzzle"})
      } 
      else if (validPuzzle==="Expected puzzle to be 81 characters long"){
        res.json({error:"Expected puzzle to be 81 characters long"}); 
      } 
      else {
        let solution = solver.solve(validPuzzle); 
        if (solution==="Puzzle cannot be solved"){
          res.json({error:"Puzzle cannot be solved"})
        } 
        else{
          res.send({solution});
        } 
      }
    });
};
