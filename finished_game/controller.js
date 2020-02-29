function GameInstance () {
    this.model = new GameModel()
    this.view = new View()
    this.numRows = null
    this.numCols = null
}

GameInstance.prototype.initGame = function (){
    this.view.makeTable(ROWS, COLUMNS)
    this.view.updateUI(this.model.grid)
    document.addEventListener('keydown', this.swipe.bind(this))
}

GameInstance.prototype.finishGame = function (){

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
    this.view.updateUI(this.model.grid)
}

GameInstance.prototype.newGame = function (){

}