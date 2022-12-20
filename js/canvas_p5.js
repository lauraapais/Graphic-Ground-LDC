var text1 = document.getElementsByName("text1")[0];
var canvas_parent = document.getElementById("canvas_parent");

var colorBackground;


/* GRID VALUES */
var canvasValues;
var gridValues;

var contentValue = {
    "title": {"columns": {"min": 7, "max": 10}, "size": {"proportion": 6, "relation": "column"}},
    "subtitle": {"columns": {"min": 5, "max": 7}, "size": {"proportion": 8, "relation": "column"}},
    "aditionalInfo": {"columns": {"min": 4, "max": 7}, "size": {"proportion": 5.5, "relation": "column"}},
    "defaultColumn": 12
};

var textInputs = {"title": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "subtitle": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "aditionalInfo": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null}}

/* INPUTS EQUALIZER */
var inputColunas = document.getElementById("nColunas");
inputColunas.addEventListener("change", calcCanvas);
var inputLinhas = document.getElementById("nLinhas");
inputLinhas.addEventListener("change", calcCanvas);

/* INPUT TEXT */
var titleText = document.getElementById("title");
titleText.addEventListener("change", titleLayout);

function setup() {
    let panel = document.getElementById("canvas_poster");

    var scale = 0.35;
    var wDiv = canvas_parent.clientWidth;
    var wPoster = 297;
    var hPoster = 420;

    colorBackground=color(randInt(0,255), randInt(0,255), randInt(0,255));


    let poster = createCanvas(wDiv * scale, hPoster * wDiv * scale / wPoster);
    poster.parent(panel);
    calcCanvas();
}

function draw() {
    background(colorBackground);

    push();
    translate(canvasValues.marginWidth, canvasValues.marginHeight);
    noFill();
    rect(0,0, canvasValues.posterWidth, canvasValues.posterHeight);
    drawGrid(gridValues);
    if(textInputs.title.content.text != null && textInputs.title.content.text != "") {
        fill(255);
        drawText(textInputs, gridValues);
    }
    pop();
}

function windowResized(){
    var scale = 0.3;
    var wDiv = canvas_parent.clientWidth;
    var wPoster = 394.8;
    var hPoster = 547.2;

    resizeCanvas(wDiv * scale, hPoster * wDiv * scale / wPoster);
}

function formatText(txt, boxWidth, txtSize) {
    console.log(txt, boxWidth, txtSize);
    textSize(txtSize);
    textLeading(txtSize*0.85);

    var outputText = "";
    var currentText = "";
    var words = split(txt, ' ');
    var nBreaks = 0;

    for(var i = 0; i<words.length; i++) {
        if(textWidth(currentText+words[i])>boxWidth) {
            if(textWidth(words[i]) > boxWidth * 0.8) {
                for(var j = 0; j < words[i].length; j++) {
                    if(textWidth(currentText + words[i].charAt(j) + "-")>boxWidth) {
                        outputText += "-\n"+words[i].charAt(j);
                        currentText = words[i].charAt(j);
                        nBreaks++;
                    } else {
                        if(i!=0 && j==0) {
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
                nBreaks++;
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
    return {"text": outputText, "nBreaks": nBreaks, "leading": textLeading()};
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

function drawText(textInputs, gridValues){
    textSize(textInputs.title.size);
    textLeading(textInputs.title.content.leading);
    text(textInputs.title.content.text,
        gridValues.sizeColumn * (textInputs.title.columnStart) + gridValues.gapColumn * Math.max(0, textInputs.title.columnStart-1),
        gridValues.sizeRow * (textInputs.title.rowStart) + gridValues.gapRow * Math.max(0, textInputs.title.rowStart-1) + textInputs.title.size);
}

function titleLayout() {
    var text = this.value;

    var nColumns = randInt(contentValue.title.columns.min, contentValue.title.columns.max);
    textInputs.title.size = nColumns * contentValue.title.size.proportion;
    textInputs.title.columnStart = randInt(0, inputColunas.value-nColumns);
    textInputs.title.columnEnd = textInputs.title.columnStart + nColumns;

    console.log(nColumns, gridValues.sizeColumn, gridValues.gapColumn);

    textInputs.title.content = formatText(text, nColumns*gridValues.sizeColumn+(nColumns-1)*gridValues.gapColumn, textInputs.title.size)

    var textHeight = (textInputs.title.content.nBreaks+1)*textInputs.title.size + textInputs.title.content.nBreaks*textInputs.title.content.leading;
    var nRows = Math.round(textHeight/gridValues.sizeRow);

    textInputs.title.rowStart = randInt(0, inputLinhas.value-nRows);
    textInputs.title.rowEnd = textInputs.title.rowStart + nRows;

    console.log(textInputs);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}