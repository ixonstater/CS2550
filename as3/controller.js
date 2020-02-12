function GameInstance () {
    this.model = new GameModel
    this.view = new View()
    this.numRows = null
    this.numCols = null
}

GameInstance.prototype.initGame = function (){
    this.view.makeTable(ROWS, COLUMNS)
    this.view.updateUI(this.model.grid)
}