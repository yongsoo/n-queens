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
window.findNRooksSolution = function(n, colIndex){
  n = n || 1;
  colIndex = colIndex || 0;
  var solution = undefined;
  var rowIndex = 0;

  var board = new Board({'n': n});

  var recur = function() {
    if(rowIndex > n - 1) {
      return;
    }

    board.togglePiece(rowIndex, colIndex);

    if(board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      // remove the piece;
      board.togglePiece(rowIndex, colIndex);

      if(colIndex <= n - 1) {
        colIndex++;
        recur();
      }
    }

    // go to next row
    rowIndex++;
    colIndex = 0;

    recur();

  }

  recur();

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  n = n || 1;
  var solutionCount = 0;
  var allSolutions = [];

  for(var i = 0; i < n; i++) {
    var board = this.findNRooksSolution(n, i);
    var count = 0;

    _.each(board, function(row) {
      _.each(row, function(position) {
        if (position === 1) {
          count++;
        }
      });
    });

    // console.table(board);

    if (count === n) {
      solutionCount++;
      allSolutions.push(board);
    }
  }

  var reverseBoard = function(board) {
    _.each(board, function(row) {
      row.reverse();
    });
    return board;
  }

  // var clone = function(existingArray) {
  //   var newObj = (existingArray instanceof Array) ? [] : {};
  //   for (i in existingArray) {
  //     if (i == 'clone') continue;
  //     if (existingArray[i] && typeof existingArray[i] == "object") {
  //       newObj[i] = clone(existingArray[i]);
  //     } else {
  //       newObj[i] = existingArray[i]
  //     }
  //   }
  //   return newObj;
  // }


  // if (n !== 1 && n !== 2) {
  //   console.log('n = ', n);

  //   // var reversedPossibleSolutions = allSolutions.slice(0);
  //   var reversedPossibleSolutions = clone(allSolutions);

  //   console.log(allSolutions);
  //   console.log(reversedPossibleSolutions);

  //   _.each(reversedPossibleSolutions, function(board, index) {
  //     reversedPossibleSolutions[index] = reverseBoard(reversedPossibleSolutions[index]);
  //   });

  //   _.each(reversedPossibleSolutions, function(possibleSolution, index) {
  //     var found = false;
  //     console.table(possibleSolution);
  //     _.each(allSolutions, function(solution, solutionKey) {
  //       // Compare solutions
  //       if(JSON.stringify(solution) === JSON.stringify(possibleSolution) && !found) {
  //         found = true;
  //       }
  //     });

  //     if(!found) {
  //       allSolutions.push(possibleSolution);
  //       solutionCount++;
  //     }
  //   });
  // }

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
