var canvas;
var stage;
var barPadding = 15;
var maxValue = 50;
var count;
var barValues = [];
var bars = [];
///  Temporary variables for development
//  These are things that eventually will be gathered from
//  the database or calculated.
var separatorSpacing = 20;
var currentDate = new Date(2016, 8, 26);
var startDate = new Date(2016, 8, 10);
var numDays = 8;
var barWidth = 30;
var players = [
    "Danny",
    "Alan",
    "John",
    "Thews",
    "Rob"
];
var numPlayers = players.length;
// -------------------------------------

function init() {
    // create a new stage and point it at our canvas:
    canvas = document.getElementById("timeline");
    stage = new createjs.Stage(canvas);

    // generate some random data (between 4 and 10, the |0 floors (for positive numbers))
    var numBars = numPlayers;
    var max = 0;
    for (var i = 1; i < numPlayers+1; i++) {
        barValues.push(i);
    }

    // create a shape to draw the background into:
    var bg = new createjs.Shape();
    stage.addChild(bg);

    // Draw axis on the bottom
    bg.graphics.setStrokeStyle(2)
        .beginFill("black")
        .beginStroke("black")
        .moveTo(60, (barWidth+barPadding)*(numPlayers+1) + barPadding)
        .lineTo(canvas.width - 20, (barWidth+barPadding)*(numPlayers+1) + barPadding);

    // Draw tick marks on the axis for each day
    for(var day=0; day < numDays+1; day++){
        bg.graphics.setStrokeStyle(2)
            .beginStroke("black")
            //.moveTo(60 + day*(canvas.width-80)/numDays, canvas.height - 50)
            //.lineTo(60 + day*(canvas.width-80)/numDays, canvas.height - 30);
            .moveTo(60 + day*(canvas.width-80)/numDays, (barWidth+barPadding)*(numPlayers+1) + barPadding)
            .lineTo(60 + day*(canvas.width-80)/numDays, (barWidth+barPadding)*(numPlayers+1) + barPadding + 20);

        //Add the numbers on the axis. This will get replaced with dates eventually.
        axisLabel = new createjs.Text(day, "24px Arial", "#000");
        axisLabel.textAlign = "center";
        axisLabel.x = 60 + day*(canvas.width-80)/numDays;
        axisLabel.y = (barWidth+barPadding)*(numPlayers +1) + barPadding + 25;
        stage.addChild(axisLabel);

    }


    // add the graph title:
    label = new createjs.Text("Game Name", "bold 24px Arial", "#000");
    label.textAlign = "center";
    label.x = canvas.width / 2;
    label.y = 20;
    stage.addChild(label);

    // draw the bars:
    for (i = 0; i < numPlayers; i++) {
        // each bar is assembled in its own Container, to make them easier to work with:
        var bar = new createjs.Container();

        // this will determine the color of each bar, save as a property of the bar for use in drawBar:
        var hue = bar.hue = i / numBars * 360;

        // draw the front panel of the bar, this will be scaled to the right size in drawBar:
        var front = new createjs.Shape();
        front.graphics.beginFill( createjs.Graphics.getHSL(hue, 100, 60, 0.9))
                .drawRect(0, 0, 1, barWidth);

        // add all of the elements to the bar Container:
        //bar.addChild(right, front, top, tab, value, label);
        bar.addChild(front);

        // position the bar, and add it to the stage:
        //bar.x = i * (barWidth + barPadding) + 60;
        //bar.y = canvas.height - 70;
        bar.x = 60;
        bar.y = 60 + i * (barWidth+barPadding)  ;

        stage.addChild(bar);
        bars.push(bar);

        // draw the bar
        drawBar(bar, barValues[i]);
    }
    stage.update();

}

function dateToX(date) {
    //Convert a game date to an x value on the canvas
    // This will allow placement of events and bars on a date
    // instead of the x coord. Should make placing events easier.
}

function playerToY(player) {
    // Convert a player name to a y value on the canvas.
    // This should make it easy to place events on the proper bar.
}

function drawBar(bar, value) {
    // calculate bar height:
    var length = value*(canvas.width-80)/numDays;


    // scale the front panel, and position the top:
    bar.getChildAt(0).scaleX = length;
    //bar.getChildAt(2).y = -h + 0.5; // the 0.5 eliminates gaps from numerical precision issues.

}
