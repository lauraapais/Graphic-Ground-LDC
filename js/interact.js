var contentText = document.getElementById("content");
var inputPoster = document.getElementById("inputPoster");

var equalizerText = document.getElementById("equalizer");
var inputEq = document.getElementById("equalizerInputs");


contentText.onclick = function(){
    if(inputPoster.style.display!== "none") {
        inputPoster.style.display = "none";
    } else {
        inputPoster.style.display = "block";
    }
}

equalizerText.onclick = function(){
    if(inputEq.style.display!== "none") {
        inputEq.style.display = "none";
    } else {
        inputEq.style.display = "block";
    }
}