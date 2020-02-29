function animateOnLoad(){

}

function main(){
    var instance = new GameInstance()
    instance.initGame()
}

document.addEventListener('DOMContentLoaded', main)
document.addEventListener('load', animateOnLoad)