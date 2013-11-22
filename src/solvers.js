/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = undefined;
  n = n || 1;

  var board = new Board({'n': n});

  _.each(board.rows(), function(row, rowIndex) {
    _.each(row, function(col, colIndex) {
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      }
    });
  });

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  n = n || 1;
  var solutionCount = 0;

  var findSolution = function(board, startRow) {

    if(startRow === n) {
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++) {
      board.togglePiece(startRow, i);

      if(!board.hasAnyRooksConflicts()) {
        findSolution(board, startRow + 1);
      }

      board.togglePiece(startRow, i);
    }
  }

  var board = new Board({n: n});

  findSolution(board, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined;
  n = n || 1;

  var board = new Board({'n': n});

  _.each(board.rows(), function(row, rowIndex) {
    _.each(row, function(col, colIndex) {
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      }
    });
  });

  solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  n = n || 1;
  var solutionCount = 0;

  var findSolution = function(board, startRow, startCol) {

    if(startRow === n) {
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++) {
      board.togglePiece(startRow, i);

      if(!board.hasAnyQueensConflicts()) {
        findSolution(board, startRow + 1);
      }

      board.togglePiece(startRow, i);
    }
  }

  var board = new Board({n: n});

  findSolution(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
