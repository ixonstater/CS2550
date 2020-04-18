const CELL2 = '2'
const CELL4 = '4'
const CELL8 = '8'
const CELL16 = '16'
const CELL32 = '32'
const CELL64 = '64'
const CELL128 = '128'
const CELL256 = '256'
const CELL512 = '512'
const CELL1024 = '1024'
const CELL2048 = '2048'

function GameModel() {
    this.winningBoardJson = this.readData()
    this.winningBoard = JSON.parse(this.winningBoardJson).boardState
    this.initialGrid = 
    [['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0']];
    this.grid = this.initialGrid
    this.insertRandom(this.grid)
}

GameModel.prototype.routeSwipe = function (dir) {
    switch (dir) {
        case 'right':
            this.swipeRight()
            break;
        case 'left':
            this.swipeLeft()
            break;
        case 'up':
            this.swipeUp()
            break;
        case 'down':
            this.swipeDown()
            break;
        default:
            return false;
    }
}

GameModel.prototype.readData = function (){
    var req = new XMLHttpRequest()
    req.open('get', 'winning_board.json', false)
    req.send(null)
    return req.responseText
}

GameModel.prototype.swipeRight = function () {
    let vectors = this.grid.map((row) => {
        return row
    })
    let mergedGrid = this.mergeTiles(vectors)
    this.grid = this.insertRandom(mergedGrid)
}

GameModel.prototype.swipeLeft = function () {
    let vectors = this.grid.map((row) => {
        return row.slice().reverse()
    })
    let scrambledRows = this.mergeTiles(vectors)
    let mergedGrid = scrambledRows.map((row) => {
        return row.reverse()
    })
    this.grid = this.insertRandom(mergedGrid)
}

GameModel.prototype.swipeUp = function () {
    let vectors = [[,,,,],
                   [,,,,],
                   [,,,,],
                   [,,,,]]
                   
    let mergedGrid = [[,,,,],
                      [,,,,],
                      [,,,,],
                      [,,,,]]
                   
    let arrangeRows = (vectors, grid) => {

        for (let x = 0; x < 4; x++){
            for (let y = 0; y < 4; y++){
                vectors[x][y] = grid[y][x]
            }
        }
    }
    arrangeRows(vectors, this.grid.slice().reverse())
    let scrambledRows = this.mergeTiles(vectors)
    arrangeRows(mergedGrid, scrambledRows)
    mergedGrid.reverse()
    this.grid = this.insertRandom(mergedGrid)
}

GameModel.prototype.swipeDown = function () {
    let vectors = [[,,,,],
                   [,,,,],
                   [,,,,],
                   [,,,,]]
                   
    let mergedGrid = [[,,,,],
                      [,,,,],
                      [,,,,],
                      [,,,,]]
                   
    let arrangeRows = (vectors, grid) => {
        for (let x = 0; x < 4; x++){
            for (let y = 0; y < 4; y++){
                vectors[x][y] = grid[y][x]
            }
        }
    }
    arrangeRows(vectors, this.grid)
    let scrambledRows = this.mergeTiles(vectors)
    arrangeRows(mergedGrid, scrambledRows)
    this.grid = this.insertRandom(mergedGrid)
}

GameModel.prototype.gameHasEnded = function () {
    return false
}

GameModel.prototype.mergeTiles = function (vectors) {
    let newGrid = []

    for (vector of vectors) {
        //move tiles
        vector = vector.filter((elem) => {
            if(elem !== '0'){
                return elem
            }
        })

        //merge tiles
        let newVector = []
        let newAppendVal = vector.pop()

        while (newAppendVal) {
            let compVal = vector.pop()

            if (compVal != newAppendVal) {
                newVector.unshift(newAppendVal)
                newAppendVal = compVal
            } else {
                newVector.unshift(this.getNextVal(newAppendVal))
                newAppendVal = vector.pop()
            }
        }

        let blankArr = []
        blankArr.length = 4 - newVector.length
        blankArr.fill('0', 0)
        newVector = blankArr.concat(newVector)
        newGrid.push(newVector)
    }

    return newGrid
}

GameModel.prototype.insertRandom = function (mergedGrid) {
    let possibleIndicies = this.getPossibleIndicies(mergedGrid)

    let index = possibleIndicies[Math.floor(Math.random() * possibleIndicies.length)]
    let val = Math.random() < 0.5 ? 2 : 4
    mergedGrid[index[0]][index[1]] = '' + val

    return mergedGrid
}

GameModel.prototype.getPossibleIndicies = function (mergedGrid) {
    let indicies = []
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            if (mergedGrid[x][y] == '0') {
                indicies.push([x, y])
            }
        }
    }
    return indicies
}

GameModel.prototype.getNextVal = function (currentVal) {
    switch (currentVal) {

        case CELL2:
            return CELL4

        case CELL4:
            return CELL8

        case CELL8:
            return CELL16

        case CELL16:
            return CELL32

        case CELL32:
            return CELL64

        case CELL64:
            return CELL128

        case CELL128:
            return CELL256

        case CELL256:
            return CELL512

        case CELL512:
            return CELL1024

        case CELL1024:
            return CELL2048

        default:
            return '0'

    }
}