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
            this.grid[x][y].style = ''
            this.grid[x][y].firstChild.style = ''
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
            cell.dataset.index = `${x},${y}`
            cell.append(innerP)
            cell.addEventListener('click', function (e){
                if(e.target.tagName === 'P'){
                    e.target.innerHTML = 'Clicked'
                    e.target.style.color = 'black'
                    document.getElementById('clicked-cell').innerHTML = 'You clicked: ' + e.target.parentNode.dataset.index
                } else {
                    e.target.firstChild.innerHTML = 'Clicked'
                    e.target.firstChild.style.color = 'black'
                    document.getElementById('clicked-cell').innerHTML = 'You clicked: ' + e.target.dataset.index
                }
            })
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