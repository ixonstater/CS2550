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
    document.getElementById('submit').addEventListener('click', this.submitLoginCreds)
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

GameInstance.prototype.submitLoginCreds = function (e){
    e.preventDefault()
    e.stopPropagation()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    var req = new XMLHttpRequest()
    req.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php")
    req.addEventListener('load', function(){
        console.log(this.responseText)
    })
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    req.send("userName=" + username + "&password=" + password)
}