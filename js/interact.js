//SHOW CONTENT ON CREATE
var contentText = document.getElementById("content");
var inputPoster = document.getElementById("inputPoster");
contentText.onclick = function(){
    if(inputPoster.style.display!== "none") {
        inputPoster.style.display = "none";
    } else {
        inputPoster.style.display = "block";
    }
}

//SHOW EQUALIZER ON CREATE
var equalizerText = document.getElementById("equalizer");
var inputEq = document.getElementById("equalizerInputs");
equalizerText.onclick = function(){
    if(inputEq.style.display!== "none") {
        inputEq.style.display = "none";
    } else {
        inputEq.style.display = "block";
    }
}

//RANDOMIZE LAYOUT
var buttonLayout = document.getElementById("buttonLayout");
buttonLayout.addEventListener("click", layoutChange);
function layoutChange(){
    titleLayout(titleText);
    subtitleLayout(subtitleText);
    aditionalInfoLayout(aditionalInfoText);
}

//RANDOMIZE COLORS
var buttonColors = document.getElementById("buttonColors");
buttonColors.addEventListener("click", colorsChange);
function colorsChange(){
    colorBackground=color(randInt(0,255), randInt(0,255), randInt(0,255));
}

//RANDOMIZE FONT
var buttonFont= document.getElementById("buttonFont");
buttonFont.addEventListener("click", fontChange);
function fontChange(){
    var randNum = randInt(1,5);
    if(randNum==1) {
        textFont('Roboto');
    }
    else if(randNum==2){
        textFont('Sora');
    }
    else if(randNum==3){
        textFont('Poppins');
    }
    else if(randNum==4){
        textFont('Bebas Neue');
    }
}
