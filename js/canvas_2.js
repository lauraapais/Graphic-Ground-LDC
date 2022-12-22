var buttonLayout = document.getElementById("buttonLayout");

buttonLayout.addEventListener("click", layoutChange);

function layoutChange(){
    titleLayout(titleText);
    subtitleLayout(subtitleText);
    aditionalInfoLayout(aditionalInfoText);
}