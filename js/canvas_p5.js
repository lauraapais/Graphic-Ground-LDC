var text1 = document.getElementsByName("text1")[0];
var canvas_parent = document.getElementById("canvas_parent");
let text1SizeRand;

/* GRID VALUES */
var canvasValues;
var gridValues;

/* INPUTS EQUALIZER */
var inputColunas = document.getElementById("nColunas");
inputColunas.addEventListener("change", calcCanvas);
var inputLinhas = document.getElementById("nLinhas");
inputLinhas.addEventListener("change", calcCanvas);

function setup() {
    let panel = document.getElementById("canvas_poster");

    var scale = 0.35;
    var wDiv = canvas_parent.clientWidth;
    var wPoster = 297;
    var hPoster = 420;

    let poster = createCanvas(wDiv * scale, hPoster * wDiv * scale / wPoster);

    text1SizeRand=random(width*0.05, width*0.1);

    poster.parent(panel);

    calcCanvas();
}

function draw() {
    background(255);
    push();
    translate(canvasValues.marginWidth, canvasValues.marginHeight);
    rect(0,0, canvasValues.posterWidth, canvasValues.posterHeight);
    drawGrid(gridValues);
    drawline(gridValues, 1, 2, 1,2)
    pop();


    /*
    textSize(text1SizeRand);
    fill(0);
    text(formatText(text1.value, (width*0.7-(margin*2)), text1SizeRand), margin, textAscent() + 30);
    */

}

function windowResized(){
    var scale = 0.3;
    var wDiv = canvas_parent.clientWidth;
    var wPoster = 394.8;
    var hPoster = 547.2;

    resizeCanvas(wDiv * scale, hPoster * wDiv * scale / wPoster);
}

function textOnGrid(gridValues, columnStart, columnEnd, rowStart, txt, txtSize) {
    var widthText; //= calcular o tamanho da grelha (numero de colunas)
    fill(0);
    textSize(txtSize);
    text(formatText(txt, widthText, txtSize), x, y);
}

function formatText(txt, boxWidth, txtSize) {

    textSize(txtSize);

    var outputText = "";
    var currentText = "";
    var words = split(txt, ' ');

    for(var i = 0; i<words.length; i++) {
        if(textWidth(currentText+words[i])>boxWidth) {
            if(textWidth(words[i]) > boxWidth * 0.8) {
                for(var j = 0; j < words[i].length; j++) {
                    if(textWidth(currentText + words[i].charAt(j) + "-")>boxWidth) {
                        outputText += "-\n"+words[i].charAt(j);
                        currentText = words[i].charAt(j);
                    } else {
                        if(j==0) {
                            outputText+=" ";
                            currentText+=" ";
                        }
                        outputText+=words[i].charAt(j);
                        currentText+=words[i].charAt(j);
                    }
                }
            } else {
                outputText += "\n"+words[i];
                currentText = words[i];
            }
        } else {
            if(currentText != "") {
                outputText += " ";
                currentText += " ";
            }
            outputText += words[i];
            currentText += words[i];
        }
    }
    return outputText;
}
/* CALCULAR GRELHAS */

function calcCanvas() {
    canvasValues = calcPoster(width, height, 0.1, 0.1);
    gridValues = calcGrid(inputColunas.value, 0.1, canvasValues.posterWidth,
        inputLinhas.value, 0.1, canvasValues.posterHeight);
}

function calcGrid(nColumns, columnGapScale, gridWidth, nRows, rowGapScale, gridHeight) {
    var gapColumn = gridWidth/(nColumns-1) * columnGapScale;
    var sizeColumn = (gridWidth-(gapColumn*(nColumns-1)))/nColumns;

    var gapRow = gridHeight/(nRows-1) * rowGapScale;
    var sizeRow = (gridHeight-(gapRow*(nRows-1)))/nRows;

    return {"nColumns": nColumns, "gapColumn": gapColumn, "sizeColumn": sizeColumn,
            "nRows": nRows, "gapRow": gapRow, "sizeRow": sizeRow};
}

function calcPoster(canvasWidth, canvasHeight, marginXScale, marginYScale) {
    var marginWidth = canvasWidth/2 * marginXScale;
    var marginHeight = canvasHeight/2 * marginYScale;

    return {"canvasWidth": canvasWidth, "canvasHeight": canvasHeight,
            "posterWidth": (canvasWidth-marginWidth*2), "posterHeight": (canvasHeight-marginHeight*2),
            "marginWidth": marginWidth, "marginHeight": marginHeight}
}

function drawGrid(gridValues) {
    for(var i=1; i<=(gridValues.nColumns-1); i++) {
        line(gridValues.sizeColumn*i + gridValues.gapColumn*(i-1), 0, gridValues.sizeColumn*i + gridValues.gapColumn*(i-1), canvasValues.posterHeight);
        line(gridValues.sizeColumn*i + gridValues.gapColumn*i, 0, gridValues.sizeColumn*i + gridValues.gapColumn*i, canvasValues.posterHeight);
    }
    for(var i=1; i<=(gridValues.nRows-1); i++) {
        line(0, gridValues.sizeRow*i + gridValues.gapRow*(i-1), canvasValues.posterWidth, gridValues.sizeRow*i + gridValues.gapRow*(i-1));
        line(0, gridValues.sizeRow*i + gridValues.gapRow*i, canvasValues.posterWidth, gridValues.sizeRow*i + gridValues.gapRow*i);
    }
}

function drawline(gridValues, columnStart, columnEnd, rowStart, rowEnd){ //1 - 2 - 1 - 2
    stroke(255,0,0);

    line(gridValues.sizeColumn * (columnStart-1) + gridValues.gapColumn * Math.max(0, columnStart-2),
            gridValues.sizeRow * (rowStart-1) + gridValues.gapRow * Math.max(0, rowStart-2),
            gridValues.sizeColumn * (columnEnd) + gridValues.gapColumn * Math.max(0, columnEnd-1),
            gridValues.sizeRow * (rowEnd) + gridValues.gapRow * Math.max(0, rowEnd-1));
}