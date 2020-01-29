
const ROWS = 4
const COLUMNS = 4

function makeTable(rows, columns){
    let appendPoint = document.getElementById('table-wrapper')
    let table = document.createElement('table')
    table.id = 'game-grid'

    for (let x = 0; x < rows; x++){
        let row = document.createElement('tr')
        row.className = 'grid-row'
        table.appendChild(row)

        for (let y = 0; y < columns; y++){
            let cell = document.createElement('td')
            cell.className = 'grid-cell'
            if (x === y){
                cell.className += ' grid-diagonal'
            } else if (x + y === 3){
                cell.className += ' grid-diagonal'
            }
            row.appendChild(cell)
        }
    }

    appendPoint.appendChild(table)
}

function main(){
    makeTable(ROWS, COLUMNS)
}

document.addEventListener('DOMContentLoaded', main)