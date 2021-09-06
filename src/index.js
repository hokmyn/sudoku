module.exports = function solveSudoku(matrix) {
  // your solution
  if (solved(matrix)) {
    return matrix;
  } else {
    const possibilities = nextMatrixs(matrix);
    const validMatrixs = keepOnlyValid(possibilities);
    return searchForSolution(validMatrixs);
  }

  function searchForSolution(matrixs) {
    if (matrixs.length < 1) {
      return false;
    } else {
      let first = matrixs.shift();
      const tryPath = solveSudoku(first);
      if (tryPath != false) {
        return tryPath;
      } else {
        return searchForSolution(matrixs);
      }
    }
  }

  function solved(matrix) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  function nextMatrixs(matrix) {
    let res = [];
    const firstEmpty = findEmptySquare(matrix);
    if (firstEmpty != undefined) {
      const y = firstEmpty[0];
      const x = firstEmpty[1];
      for (let i = 1; i <= 9; i++) {
        let newMatrix = [...matrix];
        let row = [...newMatrix[y]];
        row[x] = i;
        newMatrix[y] = row;
        res.push(newMatrix);
      }
    }
    return res;
  }

  function findEmptySquare(matrix) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          return [i, j];
        }
      }
    }
  }

  function keepOnlyValid(matrixs) {
    let res = [];
    for (let i = 0; i < matrixs.length; i++) {
      if (validMatrix(matrixs[i])) {
        res.push(matrixs[i]);
      }
    }
    return res;
  }

  function validMatrix(matrix) {
    return rowsGood(matrix) && colsGood(matrix) && boxesGood(matrix);
  }

  function rowsGood(matrix) {
    for (let i = 0; i < 9; i++) {
      let cur = [];
      for (let j = 0; j < 9; j++) {
        if (cur.includes(matrix[i][j])) {
          return false;
        } else if (matrix[i][j] !== 0) {
          cur.push(matrix[i][j]);
        }
      }
    }
    return true;
  }

  function colsGood(matrix) {
    for (let i = 0; i < 9; i++) {
      let cur = [];
      for (let j = 0; j < 9; j++) {
        if (cur.includes(matrix[j][i])) {
          return false;
        } else if (matrix[j][i] !== 0) {
          cur.push(matrix[j][i]);
        }
      }
    }
    return true;
  }

  function boxesGood(matrix) {
    const boxCoordinates = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ];
    for (let y = 0; y < 9; y += 3) {
      for (let x = 0; x < 9; x += 3) {
        let cur = [];
        for (let i = 0; i < 9; i++) {
          let coordinates = [...boxCoordinates[i]];
          coordinates[0] += y;
          coordinates[1] += x;
          if (cur.includes(matrix[coordinates[0]][coordinates[1]])) {
            return false;
          } else if (matrix[coordinates[0]][coordinates[1]] !== 0) {
            cur.push(matrix[coordinates[0]][coordinates[1]]);
          }
        }
      }
    }
    return true;
  }
};
