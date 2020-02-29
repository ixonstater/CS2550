function GameInstance () {
    this.model = new GameModel()
    this.view = new View()
    this.numRows = null
    this.numCols = null
}

GameInstance.prototype.initGame = function (){
    this.setupInput()
    this.view.makeTable(ROWS, COLUMNS)
    this.view.updateUI(this.model.grid, this.model.name, this.model.matchName, this.model.emptyCells, this.model.selectedCell)
    document.addEventListener('keydown', this.swipe.bind(this))
}

GameInstance.prototype.finishGame = function (){

}

GameInstance.prototype.newGame = function (){

}

GameInstance.prototype.swipe = function (e){
    switch(e.key){
        case 'ArrowRight':
            this.model.routeSwipe('right')
        break;
        case 'ArrowLeft':
            this.model.routeSwipe('left')
        break;
        case 'ArrowUp':
            this.model.routeSwipe('up')
        break;
        case 'ArrowDown':
            this.model.routeSwipe('down')
        break;
    }
    if(this.model.gameHasEnded()){
        this.finishGame()
    }
    this.view.updateUI(this.model.grid, this.model.name, this.model.matchName, this.model.emptyCells, this.model.selectedCell)
}

GameInstance.prototype.setupInput = function (){
    document.getElementById('send-data').addEventListener('click', this.handleInput.bind(this))
}

GameInstance.prototype.handleInput = function (){
    var dataType = document.getElementById('data-type').value
    var dataVal = document.getElementById('data-val').value
    if (dataType === 'name'){
        this.model.name = 'Name: ' + dataVal
    } else if (dataType === 'matchName'){
        this.model.matchName = 'Match name: ' + dataVal
    }
    this.view.updateUI(this.model.grid, this.model.name, this.model.matchName, this.model.emptyCells, this.model.selectedCell)
}