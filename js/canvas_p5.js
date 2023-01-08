var canvas_parent = document.getElementById("canvas_parent");
var checkboxDark = document.getElementById("checkboxDark");
var colorBackground, colorPattern;
var fonts=[];
var img;
var poster;
var pdf;

/* GRID VALUES */
var canvasValues;
var gridValues;
var nColunastmp=12, nLinhastmp=12;



var contentValue = {
    "title": {"columns": {"min": 9, "max": 11}, "size": {"proportion": 4.6, "relation": "column"}},
    "subtitle": {"columns": {"min": 7, "max": 9}, "size": {"proportion": 3, "relation": "column"}},
    "aditionalInfo": {"columns": {"min": 5, "max": 5}, "size": {"proportion": 2.5, "relation": "column"}},
    "pattern": {"columns": {"min": 4, "max": 9}, "rows": {"min": 4, "max": 9}},
    "defaultColumn": 12
};

var textInputs = {"title": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "subtitle": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "aditionalInfo": {"content": {"text": null, "nBreaks": null}, "rowStart": null, "columnStart": null, "rowEnd": null, "columnEnd": null, "size": null},
    "pattern": {"rowStart": null, "columnStart": null, "nRows": null, "nColumns": null}}

/* INPUTS EQUALIZER */
/*var inputColunas = document.getElementById("nColunas");
inputColunas.addEventListener("change", calcCanvas);
var inputLinhas = document.getElementById("nLinhas");
inputLinhas.addEventListener("change", calcCanvas);*/


/* INPUT TEXT */
var titleText = document.getElementById("title");
titleText.addEventListener("change", titleLayout);

var subtitleText = document.getElementById("subtitle");
subtitleText.addEventListener("change", subtitleLayout);

var aditionalInfoText = document.getElementById("aditionalInfo");
aditionalInfoText.addEventListener("change", aditionalInfoLayout);
function preload(){
    fonts.push(
        loadFont('data/fonts/Poppins-Medium.ttf'),
        loadFont('data/fonts/FjallaOne-Regular.ttf'),
        loadFont('data/fonts/OktaNeue-UltraLight.otf'),
        loadFont('data/fonts/PlayfairDisplay-Bold.ttf')
        );
}

function setup() {
    let panel = document.getElementById("canvas_poster");
    colorMode(HSB);
    textAlign(TOP, TOP);

    var scale = 0.35;
    var wDiv = canvas_parent.clientWidth;
    var wPoster = 297;
    var hPoster = 420;

    colorsChange();

    poster = createCanvas(wDiv * scale, hPoster * wDiv * scale / wPoster);
    poster.parent(panel);
    calcCanvas();
    layoutChange();
    patternPositionChange();

    pdf = createPDF();
    pdf.beginRecord();
}
var showGridsButton = document.getElementById("checkboxGrid");

function draw() {
    background(0,0,10);

    push();
    translate(canvasValues.marginWidth, canvasValues.marginHeight);

    patternDraw();
    if(checkboxDark.checked == true){
        filter(GRAY);
    }

    //show grids
    if(showGridsButton.checked == true){
        drawGrid(gridValues);
    }
    //texto
    drawText(textInputs, gridValues);
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
    textFont(fonts[currentFont]);
    textSize(txtSize);
    textLeading(txtSize*1.02);

    var outputText = "";
    var currentText = "";
    var words = split(txt, ' ');
    var nBreaks = 0;

    for(var i = 0; i<words.length; i++) { // Roda todas as palavras
        if(words[i] == "\n") console.log("TA AQUI UM ENTER!")
        if(textWidth(currentText+words[i])>boxWidth) { // Verifica se o tamanho da linha atual + a palavra atual superou o tamanho da caixa
            if(textWidth(words[i]) > boxWidth * 0.8) {
                for(var j = 0; j < words[i].length; j++) { // Roda todas as letras
                    if(textWidth(currentText + words[i].charAt(j) + "-")>boxWidth) {
                        if(j>0) {
                            outputText += "-\n"+words[i].charAt(j);
                        } else {
                            outputText += "\n"+words[i].charAt(j);
                        }
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
    //inputColunas.value //// inputLinhas.value

    canvasValues = calcPoster(width, height, 0.1, 0.1);
    gridValues = calcGrid(nColunastmp, 0.1, canvasValues.posterWidth,
        nLinhastmp, 0.1, canvasValues.posterHeight);
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
    noFill();
    stroke(0, 0, 90);
    rect(0,0, canvasValues.posterWidth, canvasValues.posterHeight);

    for(var i=1; i<=(gridValues.nColumns-1); i++) {
        line(gridValues.sizeColumn*i + gridValues.gapColumn*(i-1), 0, gridValues.sizeColumn*i + gridValues.gapColumn*(i-1), canvasValues.posterHeight);
        line(gridValues.sizeColumn*i + gridValues.gapColumn*i, 0, gridValues.sizeColumn*i + gridValues.gapColumn*i, canvasValues.posterHeight);
    }
    for(var i=1; i<=(gridValues.nRows-1); i++) {
        line(0, gridValues.sizeRow*i + gridValues.gapRow*(i-1), canvasValues.posterWidth, gridValues.sizeRow*i + gridValues.gapRow*(i-1));
        line(0, gridValues.sizeRow*i + gridValues.gapRow*i, canvasValues.posterWidth, gridValues.sizeRow*i + gridValues.gapRow*i);
    }
}

function drawText(textInputs, gridValues){
    textFont(fonts[currentFont]);
    fill(255);
    noStroke();
    // ---- Title ----
    if(textInputs.title.content.text != null && textInputs.title.content.text != "") {
        textSize(textInputs.title.size);
        textLeading(textInputs.title.content.leading);
        text(textInputs.title.content.text,
            gridValues.sizeColumn * (textInputs.title.columnStart) + gridValues.gapColumn * Math.max(0, textInputs.title.columnStart),
            gridValues.sizeRow * (textInputs.title.rowStart) + gridValues.gapRow * Math.max(0, textInputs.title.rowStart) - textInputs.title.size/5);
    }
    // ---- Sub-Title ----
    if(textInputs.subtitle.content.text != null && textInputs.subtitle.content.text != "") {
        textSize(textInputs.subtitle.size);
        textLeading(textInputs.subtitle.content.leading);
        text(textInputs.subtitle.content.text,
            gridValues.sizeColumn * (textInputs.subtitle.columnStart) + gridValues.gapColumn * Math.max(0, textInputs.subtitle.columnStart),
            gridValues.sizeRow * (textInputs.subtitle.rowStart) + gridValues.gapRow * Math.max(0, textInputs.subtitle.rowStart) - textInputs.subtitle.size/5);

    }

    // ---- Info ----
    if(textInputs.aditionalInfo.content.text != null && textInputs.aditionalInfo.content.text != "") {
        textSize(textInputs.aditionalInfo.size);
        textLeading(textInputs.aditionalInfo.content.leading);
        text(textInputs.aditionalInfo.content.text,
            gridValues.sizeColumn * (textInputs.aditionalInfo.columnStart) + gridValues.gapColumn * Math.max(0, textInputs.aditionalInfo.columnStart),
            gridValues.sizeRow * (textInputs.aditionalInfo.rowStart) + gridValues.gapRow * Math.max(0, textInputs.aditionalInfo.rowStart)  - textInputs.aditionalInfo.size/5);
    }
}

function titleLayout() {
    var text = titleText.value;

    var nColumns = randInt(contentValue.title.columns.min, contentValue.title.columns.max);
    textInputs.title.size = nColumns * contentValue.title.size.proportion;
    textInputs.title.columnStart = randInt(0, nColunastmp-nColumns);
    textInputs.title.columnEnd = textInputs.title.columnStart + nColumns;


    textInputs.title.content = formatText(text, nColumns*gridValues.sizeColumn+(nColumns-1)*gridValues.gapColumn, textInputs.title.size);

    var textHeight = (textInputs.title.content.nBreaks+1)*textInputs.title.size + textInputs.title.content.nBreaks*(1-textInputs.title.content.leading);
    var nRows = Math.round(textHeight/gridValues.sizeRow);


    textInputs.title.rowStart = randInt(0, nLinhastmp-nRows);
    textInputs.title.rowEnd = textInputs.title.rowStart + nRows;
}

function subtitleLayout() {
    var text = subtitleText.value;

    var nColumns = randInt(contentValue.subtitle.columns.min, contentValue.subtitle.columns.max);
    textInputs.subtitle.size = nColumns * contentValue.subtitle.size.proportion;
    textInputs.subtitle.columnStart = randInt(0, nColunastmp-nColumns);
    textInputs.subtitle.columnEnd = textInputs.subtitle.columnStart + nColumns;

    textInputs.subtitle.content = formatText(text, nColumns*gridValues.sizeColumn+(nColumns-1)*gridValues.gapColumn, textInputs.subtitle.size)

    var textHeight = (textInputs.subtitle.content.nBreaks+1)*textInputs.subtitle.size + textInputs.subtitle.content.nBreaks*(1-textInputs.subtitle.content.leading);
    var nRows = Math.round(textHeight/gridValues.sizeRow);

    textInputs.subtitle.rowStart = randInt(0, nLinhastmp-nRows);
    textInputs.subtitle.rowEnd = textInputs.subtitle.rowStart + nRows;
}

function aditionalInfoLayout() {
    var text = aditionalInfoText.value;

    var nColumns = randInt(contentValue.aditionalInfo.columns.min, contentValue.aditionalInfo.columns.max);
    textInputs.aditionalInfo.size = nColumns * contentValue.aditionalInfo.size.proportion;
    textInputs.aditionalInfo.columnStart = randInt(0, nColunastmp-nColumns);
    textInputs.aditionalInfo.columnEnd = textInputs.aditionalInfo.columnStart + nColumns;

    textInputs.aditionalInfo.content = formatText(text, nColumns*gridValues.sizeColumn+(nColumns-1)*gridValues.gapColumn, textInputs.aditionalInfo.size)

    var textHeight = (textInputs.aditionalInfo.content.nBreaks+1)*textInputs.aditionalInfo.size + textInputs.aditionalInfo.content.nBreaks*(1-textInputs.aditionalInfo.content.leading);
    var nRows = Math.round(textHeight/gridValues.sizeRow);

    textInputs.aditionalInfo.rowStart = randInt(0, nLinhastmp-nRows);
    textInputs.aditionalInfo.rowEnd = textInputs.aditionalInfo.rowStart + nRows;
}

function patternLayout(){
    textInputs.pattern.nColumns = randInt(contentValue.pattern.columns.min, contentValue.pattern.columns.max);
    textInputs.pattern.nRows = randInt(contentValue.pattern.rows.min, contentValue.pattern.rows.max);
    textInputs.pattern.columnStart = randInt(0, contentValue.defaultColumn - textInputs.pattern.nColumns);
    textInputs.pattern.rowStart = randInt(0, contentValue.defaultColumn - textInputs.pattern.nRows);
    patternChange();
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}