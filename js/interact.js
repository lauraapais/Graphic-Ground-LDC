//SHOW CONTENT ON CREATE
var contentText = document.getElementById("content");
var inputPoster = document.getElementById("inputPoster");
contentText.onclick = function(){
    if(inputPoster.style.display!== "none") {
        inputPoster.style.display = "none";
    } else {
        inputPoster.style.display = "block";
    }
    setInputSize();
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
    setInputSize();
}

//RANDOMIZE LAYOUT
var buttonLayout = document.getElementById("buttonLayout");
buttonLayout.addEventListener("click", layoutChange);
function layoutChange(){
    titleLayout(titleText);
    subtitleLayout(subtitleText);
    aditionalInfoLayout(aditionalInfoText);
}

//RANDOMIZE PATTERN POSITION
var buttonPositionPattern = document.getElementById("buttonPositionPattern");
buttonPositionPattern.addEventListener("click", patternPositionChange);
function patternPositionChange(){
    patternLayout();
}

//RANDOMIZE COLORS
var buttonColors = document.getElementById("buttonColors");
buttonColors.addEventListener("click", colorsChange);


var colorMinScale = 10;
var colorMaxScale = 40;

function colorsChange(){
    var newHSBColor = randInt(0,360);

    mainColor=color(newHSBColor, 100, 100);
    if(randInt(0,1)) {
        secondColor=color((360+newHSBColor-randInt(colorMinScale, colorMaxScale))%360, 100, random(50,100));
    } else {
        secondColor=color((360+newHSBColor+randInt(colorMinScale, colorMaxScale))%360, 100, random(50,100));
    }
}

var keywordsPattern = document.getElementById("keywords");
keywordsPattern.addEventListener("change", keywordChange);
var nKeyword=1;
function keywordChange(){
    if(this.value=="contained") {
        nKeyword = 1;
    }
    else if(this.value=="balanced") {
        nKeyword = 2;
    }
    else if(this.value=="powerful") {
        nKeyword = 3;
    }
    else if(this.value=="minimal") {
        nKeyword = 4;
    }
    patternChange();
}

function patternChange(){
    patternSetup(nKeyword, parseInt(patternScale.value));
}

function setPatternProbability() {
    probPattern = patternProbability.value/100;
    patternChange();
}

//RANDOMIZE FONT
var buttonFont= document.getElementById("buttonFont");
buttonFont.addEventListener("click", fontChange);
var currentFont=0;

function fontChange(){
    currentFont+=1;
    if(currentFont==fonts.length){
        currentFont=0
    }
}

//INPUT Scale Pattern
var patternScale = document.getElementById("patternScale");
patternScale.addEventListener("change", patternChange);

var patternProbability = document.getElementById("patternProbability");
patternProbability.addEventListener("change", setPatternProbability);

//RANDOMIZE PATTERN
var buttonPattern= document.getElementById("buttonPattern");
buttonPattern.addEventListener("click", patternChange);


//PNG e PDF
var buttonSavePNG= document.getElementById("savePNG");
buttonSavePNG.addEventListener("click", savePNG);
function savePNG() {
    saveCanvas(poster, 'GraphicGround', 'png');
}