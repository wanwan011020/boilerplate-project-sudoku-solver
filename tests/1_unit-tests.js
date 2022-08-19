const chai = require('chai');
const assert = chai.assert;
const puzzles = require("../controllers/puzzle-strings.js"); 
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  test("Logic handles a valid puzzle string of 81 characters", (done)=>{
    // let puzzleStrings = puzzles.puzzleAndSolutions; 
    puzzles.puzzlesAndSolutions.map(elem=>{
      assert.equal(elem[0].length, 81)
      assert.equal(solver.validate(elem[0]), elem[0])
    })
    done(); 
  })
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", (done)=>{
    let puzzleString = '1.e..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.wt...8..1..16....926914.37.'
    assert.equal(solver.validate(puzzleString), 'Invalid characters in puzzle'); 
    done(); 
  })
  test("Logic handles a puzzle string that is not 81 characters in length", (done)=>{
    let puzzleString = '1.e..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.wt...8..1..16....926914.37..8182121'
    assert.equal(solver.validate(puzzleString), 'Expected puzzle to be 81 characters long'); 
    done(); 
  })
  test("Logic handles a valid row placement", (done)=>{
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let board = solver.transformToBoard(puzzleString); 
    assert.equal(solver.checkRowPlacement(board, 'A', '2', '3'), true); 
    assert.equal(solver.checkRowPlacement(board, 'A', '3', '5'), true);
    done(); 
  })
  test("Logic handles a valid row placement", (done)=>{
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let board = solver.transformToBoard(puzzleString); 
    assert.equal(solver.checkRowPlacement(board, 'A', '2', '2'), false); 
    done(); 
  })
  test("Logic handles a valid column placement", (done)=>{
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let board = solver.transformToBoard(puzzleString); 
    assert.equal(solver.checkColPlacement(board, 'A', '3', '5'), true); 
    assert.equal(solver.checkColPlacement(board, 'A', '2', '3'), true); 
    done(); 
  })
  test("Logic handles an invalid column placement", (done)=>{
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let board = solver.transformToBoard(puzzleString); 
    assert.equal(solver.checkColPlacement(board, 'A', '2', '1'), false); 
    done(); 
  })
  test("Logic handles a valid region (3x3 grid) placement", (done)=>{
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let board = solver.transformToBoard(puzzleString); 
    assert.equal(solver.checkRegionPlacement(board, 'A', '2', '7'), true); 
    assert.equal(solver.checkRegionPlacement(board, 'A', '3', '5'), true); 
    done(); 
  })
  test("Logic handles an invalid region (3x3 grid) placement", (done)=>{
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let board = solver.transformToBoard(puzzleString); 
    assert.equal(solver.checkRegionPlacement(board, 'A', '2', '2'), false); 
    done(); 
  })
  test("Valid puzzle strings pass the solver", (done)=>{
    // let puzzleStrings = puzzles.puzzleAndSolutions; 
    puzzles.puzzlesAndSolutions.map(elem=>{
      assert.equal(solver.solve(elem[0]), elem[1]);
    })
    done(); 
  })
  test("Invalid puzzle strings fail the solver", (done)=>{
    let puzzleString = '1.5..5.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'; 
    let solution='Puzzle cannot be solved'; 
    assert.equal(solver.solve(puzzleString), solution); 
    done(); 
  })
  test("Solver returns the the expected solution for an incomplete puzzzle", (done)=>{
    // let puzzleStrings = puzzles.puzzleAndSolutions; 
    puzzles.puzzlesAndSolutions.map(elem=>{
      assert.equal(solver.solve(elem[0]), elem[1]);
    })
    done(); 
  })
});
