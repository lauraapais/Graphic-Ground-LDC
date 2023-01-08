var inputSpacer = document.getElementById("inputSpacer");
var inputBottom = document.getElementById("inputBottom");
var inputUpper = document.getElementById("inputUpper");

window.onload = (event) => {
    setInputSize();
};

function setInputSize() {
    var total = window.innerHeight*(100-17-8)/100;
    inputSpacer.style.height = Math.max(total - inputUpper.offsetHeight - inputBottom.offsetHeight, 0)+"px";
    return "RESIZED";
}