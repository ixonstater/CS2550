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
    this.grid = [['0','0','64','2048'],
                ['0','0','32','1024'],
                ['0','2','16','256'],
                ['0','4','8','128']]
    
}

GameModel.prototype.swipeRight = function (){
    let vectors = this.grid.map((row) => {
        return row
    })

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

        while(vector[0]){

        }
    }

    return newGrid
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