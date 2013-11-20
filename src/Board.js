// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function(){

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (typeof params == "undefined" || params == null) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _                     
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _ 
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_ 
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
                                                   
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    // 

    hasRowConflictAt: function(rowIndex){
      var row = this.get(rowIndex);
      var hasConflict = false;
      var rowPieceCount = 0;

      _.each(row, function(position, posindex){
        if(position && !hasConflict) {
          rowPieceCount++;
        }
        if(rowPieceCount > 1) {
          hasConflict = true;
        }
      });

      return hasConflict;
    },

    hasAnyRowConflicts: function(){
      var board = this.rows();
      var hasConflict = false;
      var that = this;
      _.each(board, function(row, rowIndex) {
        if (that.hasRowConflictAt(rowIndex) && !hasConflict) {
          hasConflict = true;
        }
      });
      return hasConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //

    hasColConflictAt: function(colIndex){
      var board = this.rows();
      var hasConflict = false;
      var colPieceCount = 0;

      _.each(board, function(row) {
        if (row[colIndex] && !hasConflict) {
          colPieceCount++;
        }

        if (colPieceCount > 1) {
          hasConflict = true;
        }
      });

      return hasConflict;
    },

    hasAnyColConflicts: function(){
      var board = this.rows();
      var hasConflict = false;
      var that = this;
      _.each(board, function(row, rowIndex) {
        _.each(row, function(boardPosition, colIndex) {
          if (that.hasColConflictAt(colIndex) && !hasConflict) {
            hasConflict = true;
          }
        });
      });
      return hasConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // 

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndex){
      var board = this.rows();
      var hasConflict = false;
      var diagPieceCount = 0;

      _.each(board, function(row) {
        if (row[majorDiagonalColumnIndex] && !hasConflict) {
          diagPieceCount++;
        }

        if (diagPieceCount > 1) {
          hasConflict = true;
        }

        majorDiagonalColumnIndex++;
      })
      return hasConflict;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var board = this.rows();
      var hasConflict = false;
      var that = this;
      _.each(board, function(row, rowIndex) {
        _.each(row, function(boardPosition, colIndex) {
          if (that.hasMajorDiagonalConflictAt(colIndex) && !hasConflict) {
            hasConflict = true;
          }
        });
      });
      return hasConflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // 

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndex){
      var board = this.rows();
      var hasConflict = false;
      var diagPieceCount = 0;

      _.each(board, function(row) {
        if (row[minorDiagonalColumnIndex] && !hasConflict) {
          diagPieceCount++;
        }

        if (diagPieceCount > 1) {
          hasConflict = true;
        }

        minorDiagonalColumnIndex--;
      })
      return hasConflict;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var board = this.rows();
      var hasConflict = false;
      var that = this;
      _.each(board, function(row, rowIndex) {
        _.each(row, function(boardPosition, colIndex) {
          if (that.hasMinorDiagonalConflictAt(colIndex) && !hasConflict) {
            hasConflict = true;
          }
        });
      });
      return hasConflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
