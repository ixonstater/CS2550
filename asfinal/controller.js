var ref

function GameInstance () {
    this.model = new GameModel()
    this.view = new View()
    this.numRows = null
    this.numCols = null
    this.audioCountDown = null
    ref = this
}

GameInstance.prototype.initGame = function (){
    this.view.makeTable(ROWS, COLUMNS)
    this.view.updateUI(this.model.grid)
    document.addEventListener('keydown', this.swipe.bind(this))
    document.getElementById('show-winning-board').addEventListener('click', this.showWinningBoard.bind(this))
    document.getElementById('reset-game').addEventListener('click', this.newGame.bind(this))
}

GameInstance.prototype.finishGame = function (){
    this.view.hideTable()
}

GameInstance.prototype.newGame = function (){
    this.model = new GameModel()
    this.view.updateUI(this.model.grid)
    this.view.showTable()
}

GameInstance.prototype.showWinningBoard = function (){
    this.model.grid = this.model.winningBoard
    this.view.updateUI(this.model.grid)
    this.view.showTable()
}

GameInstance.prototype.swipe = function (e){
    if(this.model.gameHasEnded()){
        this.finishGame()
    }
    
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
        default:
            return
    }

    this.startPlayAudioCountdown()
    this.view.updateUI(this.model.grid)
}

GameInstance.prototype.startPlayAudioCountdown = function(){
    this.view.startAudio()

    if(this.audioCountDown){
        clearTimeout(this.audioCountDown)
    }
    
    this.audioCountDown = window.setTimeout(function (){
        this.view.stopAudio()
    }.bind(this), 3000)
}