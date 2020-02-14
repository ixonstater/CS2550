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

function GameModel(){
    this.grid = [['2','2','64','64'],
                ['4','4','1024','1024'],
                ['0','0','0','0'],
                ['0','4','8','128']]
    
}

GameModel.routeSwipe(dir){
    switch(dir){
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

    this.gameHasEnded()
}

GameModel.prototype.swipeRight = function (){
    let vectors = this.grid.map((row) => {
        return row
    })
    let mergedGrid = this.mergeTiles(vectors)
    this.grid = this.insertRandom(mergedGrid)
}

GameModel.prototype.swipeLeft = function (){

}

GameModel.prototype.swipeUp = function (){

}

GameModel.prototype.swipeDown = function (){

}

GameModel.prototype.mergeTiles = function (vectors){
    let newGrid = []

    for (vector of vectors){

        let newVector = []
        let newAppendVal = vector.pop()

        while (vector.length){
            let compVal = vector.pop()

            if(compVal != newAppendVal){
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

GameModel.prototype.insertRandom = function (mergedGrid){
    let possibleIndicies = this.getPossibleIndicies(mergedGrid)
    let selectedIndicies = []

    let indiciesToFill = [0,0].map(function (){
        let index = Math.floor(Math.random() * possibleIndicies.length)
        while(selectedIndicies.includes(index)){
            index = Math.floor(Math.random() * possibleIndicies.length)
        }
        let val = Math.random() < 0.5 ? 2 : 4
        return [index, val]
    })

    for (pkg of indiciesToFill){
        [index, val] = pkg
        gridIndex = possibleIndicies[index]
        mergedGrid[gridIndex[0]][gridIndex[1]] = val
    }

    return mergedGrid
}

GameModel.prototype.getPossibleIndicies = function(mergedGrid){
    let indicies = []
    for (let x = 0; x < 4; x++){
        for (let y = 0; y < 4; y++){
            if(mergedGrid[x][y] == '0'){
                indicies.push([x,y])
            }
        }
    }
    return indicies
}

GameModel.prototype.getNextVal = function (currentVal){
    switch (currentVal){

        case '2':
            return '4'

        case '4':
            return '8'

        case '8':
            return '16'

        case '16':
            return '32'

        case '32':
            return '64'

        case '64':
            return '128'

        case '128':
            return '256'
        
        case '256':
            return '512'

        case '512':
            return '1024'

        case '1024':
            return '2048'

        default:
            return '0'

    }
}