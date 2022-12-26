var wt=30, ht=30;
var blankSpace;

var currentPattern = 0; // ---- 1 = ARCS

var patterns = {
        "rotation": null,
        "colors": null,
        "columns": 0, "rows": 0};

function setPatternSize(row, collumn) {
    patterns.rows = row;
    patterns.columns = collumn;

    patterns.rotation = (Array.from(Array( patterns.rows) , () => new Array (patterns.columns)));
    patterns.colors = (Array.from(Array( patterns.rows) , () => new Array (patterns.columns)));
}

function patternSetup(patternID, row, collumn) {
    setPatternSize(row, collumn);
    currentPattern = patternID;

    // ---- ARC PATTERN CREATION ----
    if(currentPattern == 1) {
        for (var x = 0; x < patterns.rows; x++) {
            for (var y = 0; y < patterns.rows; y++) {
                patterns.rotation[x][y] = int(random(4));
            }
        }
    }
}


function patternDraw() {
    blankSpace=randInt(1,2);
    if (currentPattern == 1) {
        for (var x = 0; x < patterns.rows; x++) {
            for (var y = 0; y < patterns.rows; y++) {

                if(blankSpace==1){
                    drawArc(x * wt, y * ht, wt, ht, patterns.rotation[x][y]);
                }
                else if(blankSpace==2){
                    rect(x*wt,y*wt, wt,ht);
                }


            }
        }
    }
}

function drawArc(x, y, w, h, rot){
    if(rot==1 || rot==2) {
        x+=w;
    }
    if(rot == 2 || rot==3) {
        y+=h;
    }
    noStroke();
    arc(x, y, w*2, h*2, HALF_PI*rot, HALF_PI*(rot+1));
}
