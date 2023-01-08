var wt = 30, ht = 30;

var currentPattern = 0; // ---- 1 = ARCS

var patterns = {
    "rotation": null,
    "colors": null,
    "size": null,
    "display": null,
    "columns": 0, "rows": 0,
    "width": 0, "height": 0
};

var probPattern = 0.5;

function setPatternSize(row, collumn) {
    patterns.rows = row;
    patterns.columns = collumn;

    patterns.width = (textInputs.pattern.nColumns*gridValues.sizeColumn + (textInputs.pattern.nColumns-1)*gridValues.gapColumn) / collumn;
    patterns.height = (textInputs.pattern.nRows*gridValues.sizeRow + (textInputs.pattern.nRows-1)*gridValues.gapRow) / row;

    patterns.rotation = (Array.from(Array(patterns.columns), () => new Array(patterns.rows)));
    patterns.colors = (Array.from(Array(patterns.columns), () => new Array(patterns.rows)));

    patterns.size = (Array.from(Array(patterns.columns), () => new Array(patterns.rows)));

    patterns.display = (Array.from(Array(patterns.columns), () => new Array(patterns.rows)));
}

function patternSetup(patternID, collumn) {
    var row = Math.round((textInputs.pattern.nRows*gridValues.sizeRow + (textInputs.pattern.nRows-1)*gridValues.gapRow) /
        ((textInputs.pattern.nColumns*gridValues.sizeColumn + (textInputs.pattern.nColumns-1)*gridValues.gapColumn) / collumn));

    setPatternSize(row, collumn);
    currentPattern = patternID;

    // ---- ARC PATTERN CREATION ----
    if (currentPattern == 1) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                if (!(random() > probPattern)) {
                    patterns.rotation[x][y] = int(random(4));
                }
            }
        }
    } else if (currentPattern == 2) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                if (x == 0 || x > 0 && patterns.size[x - 1][y] != 2) {
                    if (!(random() > probPattern)) {
                        patterns.size[x][y] = int(random(1, 3));
                    } else {
                        patterns.size[x][y] = 0;
                    }
                } else {
                    patterns.size[x][y] = 0;
                }
            }
        }
    } else if (currentPattern == 3) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                if (!(random() > probPattern)) {
                    patterns.display[x][y] = true;
                } else {
                    patterns.display[x][y] = false;
                }
            }
        }
    } else if (currentPattern == 4) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                if (!(random() > probPattern)) {
                    patterns.display[x][y] = true;
                } else {
                    patterns.display[x][y] = false;
                }
                patterns.rotation[x][y] = int(random(2));
            }
        }
    }

    for (var x = 0; x < patterns.columns; x++) {
        for (var y = 0; y < patterns.rows; y++) {
            patterns.colors[x][y] = int(random(2));
        }
    }
}

function setColorPattern(x, y) {
    if(patterns.colors[x][y]) {
        fill(mainColor);
        stroke(mainColor);
    } else {
        fill(secondColor);
        stroke(secondColor);
    }
}

function patternDraw() {
    push();
    translate((textInputs.pattern.columnStart*gridValues.sizeColumn + (textInputs.pattern.columnStart)*gridValues.gapColumn),
        (textInputs.pattern.rowStart*gridValues.sizeRow + (textInputs.pattern.rowStart)*gridValues.gapRow));
    strokeWeight(1);

    if (currentPattern == 1) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                setColorPattern(x, y);
                drawArc(x * patterns.width, y * patterns.height, patterns.width, patterns.height, patterns.rotation[x][y]);
            }
        }
    } else if (currentPattern == 2) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                if (patterns.size[x][y] != 0) {
                    setColorPattern(x, y);
                    drawTri(x * patterns.width, y * patterns.height, x * patterns.width, y * patterns.height + patterns.height, x * patterns.width + (patterns.width * patterns.size[x][y]), y * patterns.height + (patterns.height / 2));
                }
            }
        }
    } else if (currentPattern == 3) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                if (patterns.display[x][y]) {
                    setColorPattern(x, y);
                    drawRect(x * patterns.width, y * patterns.height, patterns.width, patterns.height);
                }
            }
        }
    } else if (currentPattern == 4) {
        for (var x = 0; x < patterns.columns; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                if (patterns.display[x][y]) {
                    setColorPattern(x, y);
                    drawLine(x * patterns.width, y * patterns.height, patterns.width, patterns.height, patterns.rotation[x][y]);
                }
            }
        }
    }
    noStroke();
    pop();
}

function drawArc(x, y, w, h, rot) {
    if (rot < 4) {
        if (rot == 1 || rot == 2) {
            x += w;
        }
        if (rot == 2 || rot == 3) {
            y += h;
        }
        arc(x, y, w * 2, h * 2, HALF_PI * rot, HALF_PI * (rot + 1), PIE);
    }
}

function drawTri(x1, y1, x2, y2, x3, y3) {
    triangle(x1, y1, x2, y2, x3, y3);
}

function drawRect(x, y, w, h) {
    rect(x, y, w, h);
}

function drawLine(x1, y1, w, h, rot) {
    var nLines = (10);
    var spaceHeight = h/nLines;
    var spaceWidth = w/nLines;

    for(var i=0; i<nLines+1; i++) {
        if (rot == 0) { //0º
            line(x1, y1+spaceHeight*i, x1+w, y1+spaceHeight*i);
        } else if (rot == 1){ //90º
            line(x1+spaceWidth*i, y1, x1+spaceWidth*i, y1+h);
        }
    }
}
