const ROWS = 4
const COLUMNS = 4


function View(){
    this.grid = null
    this.rulesModal = null
    this.endGameModal = null
}

View.prototype.updateUI = function (stateGrid, name, matchName, emptyCells, selectedCell){
    for (var x = 0; x < this.numRows; x++){
        for (var y = 0; y < this.numCols; y++){
            this.grid[x][y].className = 'grid-cell cell-' + stateGrid[x][y]
            this.grid[x][y].firstChild.innerHTML = stateGrid[x][y]
        }
    }

    document.getElementById('name').innerHTML = name
    document.getElementById('match-name').innerHTML = matchName
    document.getElementById('empty-boxes').innerHTML = 'Empty cells: ' + emptyCells.map(function (elem){
        return '[' + elem[0] + ' ,' + elem[1] + ']'
    })
    document.getElementById('selected-cell').innerHTML = 'Randomly selected cell: ' + 'cell = [' + selectedCell[0][0] + ' ,' + selectedCell[0][1] + '] val = ' + selectedCell[1]
}

View.prototype.makeTable = function (rows, columns){
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
            var innerP = document.createElement('p')
            innerP.className = 'cell-inner-text'
            cell.className = 'grid-cell'
            cell.append(innerP)
            row.appendChild(cell)
            rowRefs.push(cell)
        }

        gridRefs.push(rowRefs)
    }

    appendPoint.appendChild(table)
    this.grid = gridRefs
    this.numCols = columns
    this.numRows = rows
}