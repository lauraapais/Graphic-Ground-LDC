var columns = 10, rows = 10;
var rotation = Array.from(Array(rows) , () => new Array (columns));
var colors = Array.from(Array(rows) , () => new Array (columns));

var wt=50, ht=50;


function patternSetup() {
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < rows; y++) {
            rotation[x][y] = int(random(4));
        }
    }
}


function patternDraw() {
    for(var x=0; x<rows; x++){
        for(var y=0; y<rows; y++){

            drawArc(x*wt, y*ht, wt, ht, rotation[x][y]);
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
}