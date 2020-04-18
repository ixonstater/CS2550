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

    this.startPlayAudioCountdown()

    if(this.model.gameHasEnded()){
        this.finishGame()
    }
    this.view.updateUI(this.model.grid)
}

GameInstance.prototype.newGame = function (){

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