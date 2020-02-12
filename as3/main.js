
const ROWS = 4
const COLUMNS = 4

//controller
function GameInstance () {
    this.model = new GameModel
    this.viewRefs = new ViewRefsWrapper()
    this.numRows = null
    this.numCols = null
}

GameInstance.prototype.initGame = function (){
    this.makeTable(ROWS, COLUMNS)
    this.updateUI()
}

GameInstance.prototype.updateUI = function (){
    for (var x = 0; x < this.numRows; x++){
        for (var y = 0; y < this.numCols; y++){
            this.viewRefs.grid[x][y].className = 'grid-cell cell-' + this.model.grid[x][y]
        }
    }
}

GameInstance.prototype.makeTable = function (rows, columns){
    var appendPoint = document.getElementById('table-wrapper')
    var table = document.createElement('table')
    table.id = 'game-grid'
    var gridRefs = []

    for (var x = 0; x < rows; x++){
        var row = document.createElement('tr')
        row.className = 'grid-row'
        table.appendChild(row)
        var rowRefs = []

        for (var y = 0; y < columns; y++){
            var cell = document.createElement('td')
            cell.className = 'grid-cell'
            row.appendChild(cell)
            rowRefs.push(cell)
        }

        gridRefs.push(rowRefs)
    }

    appendPoint.appendChild(table)
    this.viewRefs.grid = gridRefs
    this.numCols = columns
    this.numRows = rows
}

//view

function ViewRefsWrapper(){
    this.grid = null
    this.rulesModal = null
    this.endGameModal = null
}

//entrypoint

function main(){
    var instance = new GameInstance()
    instance.initGame()
}

document.addEventListener('DOMContentLoaded', main)