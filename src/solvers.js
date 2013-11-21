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
window.findNRooksSolution = function(n, colIndex, rowIndex){
  n = n || 1;
  colIndex = colIndex || 0;
  rowIndex = rowIndex || 0;
  var solution = undefined;
  var piecesPlaced = 0;

  var board = new Board({'n': n});

  console.log(n);

  var recur = function() {
    // if(rowIndex > n - 1) {
    if(piecesPlaced === n) {
      return;
    }

    board.togglePiece(rowIndex, colIndex);

    if(board.hasAnyRooksConflicts()) {
      // remove the piece;
      board.togglePiece(rowIndex, colIndex);

      // move to next col
      if(colIndex <= n - 1) {
        colIndex++;
        recur();
      }
    }

    piecesPlaced++;

    // go to next row
    rowIndex++;
    colIndex = 0;

    // If at the last row, start from top again
    // if(rowIndex > n - 1) {
      // rowIndex = 0;
    // }

    // if(piecesPlaced === 1 && n !== 1) {
      // rowIndex = 0;
    // }

    recur();

  }

  recur();

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  // debugger;
  n = n || 1;
  var solutionCount = 0;
  var allSolutions = [];

  for(var rowsIndex = 0; rowsIndex < n; rowsIndex++) {
    for(var colIndex = 0; colIndex < n; colIndex++) {
      var board = this.findNRooksSolution(n, colIndex, rowsIndex);

      // Check if solution is valid
      var count = 0;
      _.each(board, function(row) {
        _.each(row, function(position) {
          if (position === 1) {
            count++;
          }
        });
      });

      console.table(board);

      if (count === n) {
        solutionCount++;
        allSolutions.push(board);
      }
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
