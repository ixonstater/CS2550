inst = null

function main(){
    var instance = new GameInstance()
    instance.initGame()
    inst = instance
}

document.addEventListener('DOMContentLoaded', main)