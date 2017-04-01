var canvas;
var stage;
var barPadding = 25;
var axisPadding = 15;
var maxValue = 50;
var barValues = [];
var bars = [];
///  Temporary variables for development
//  These are things that eventually will be gathered from
//  the database or calculated.
var separatorSpacing = 30;
var currentDate = new Date(2016, 8, 26);
var startDate = new Date(2016, 8, 10);
var numDays = 8;
var barWidth = 30;
var axisLeftMargin = 60;
var axisRightMargin = 20;
var tickLength = 20;
var axisLabelOffset = 5;
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
    canvas = document.getElementById("timeline-canvas");
    stage = new createjs.Stage(canvas);

    // generate some random data (between 4 and 10, the |0 floors (for positive numbers))
    var numBars = numPlayers;
    var max = 0;
    for (var i = 1; i < numPlayers+1; i++) {
        barValues.push(i);
    }

    // Parent container for all of the plot. x = 0 will be the start date.
    var graphPlane = new createjs.Container();
    // hold all of the parts of the axis so that it can all be moved together.
    var axisContainer = new createjs.Container();

    // TODO:  Move all of the axis parts in to the container so that explititly putting in all
    //  of the padding and bar heights is unnecessary. These should just go in once in the placement
    //  of the entire container.

    // create a shape to draw the background into:
    var axis = new createjs.Shape();
    stage.addChild(axis);

    // Draw axis on the bottom
    axis.graphics.setStrokeStyle(2)
        .beginFill("black")
        .beginStroke("black")
        .moveTo(axisLeftMargin, (barWidth+barPadding)*(numPlayers+1) + axisPadding)
        .lineTo(canvas.width - axisRightMargin, (barWidth+barPadding)*(numPlayers+1) + axisPadding);

    // Draw tick marks on the axis for each day
    for(var day=0; day < numDays+1; day++){
        axis.graphics.setStrokeStyle(2)
            .beginStroke("black")
            //.moveTo(60 + day*(canvas.width-80)/numDays, canvas.height - 50)
            //.lineTo(60 + day*(canvas.width-80)/numDays, canvas.height - 30);
            .moveTo(axisLeftMargin + day*(canvas.width-(axisLeftMargin + axisRightMargin))/numDays, (barWidth+barPadding)*(numPlayers+1) + axisPadding)
            .lineTo(axisLeftMargin + day*(canvas.width-(axisLeftMargin + axisRightMargin))/numDays, (barWidth+barPadding)*(numPlayers+1) + axisPadding + tickLength);

        //Add the numbers on the axis. This will get replaced with dates eventually.
        axisLabel = new createjs.Text(day, "24px Arial", "#000");
        axisLabel.textAlign = "center";
        axisLabel.x = 60 + day*(canvas.width-80)/numDays;
        axisLabel.y = (barWidth+barPadding)*(numPlayers +1) + barPadding + tickLength + axisLabelOffset;
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

        var pName = new createjs.Text(players[i], "16px Arial", "#000");
        pName.x = -50;
        pName.y = 0;

        var pIcon = new createjs.Bitmap("/images/sample_player_icon.png");
        pIcon.regX = pIcon.image.width / 2;
        pIcon.regY = pIcon.image.height / 2;
        pIcon.x = 20;
        pIcon.y = barWidth / 2;
        pIcon.scaleX = 0.5*(barWidth + barPadding/2)/ pIcon.image.width;
        pIcon.scaleY = 0.5*(barWidth + barPadding/2)/ pIcon.image.height;

        // this will determine the color of each bar, save as a property of the bar for use in drawBar:
        var hue = bar.hue = i / numBars * 360;

        // draw the front panel of the bar, this will be scaled to the right size in drawBar:
        var front = new createjs.Shape();
        front.graphics.beginFill( createjs.Graphics.getHSL(hue, 100, 60, 0.9))
                .drawRect(0, 0, 1, barWidth);

        // add all of the elements to the bar Container:
        //bar.addChild(right, front, top, tab, value, label);
        bar.addChild(front, pName, pIcon);
        //bar.addChild(namePlate);


        // position the bar, and add it to the stage:
        //bar.x = i * (barWidth + barPadding) + 60;
        //bar.y = canvas.height - 70;
        bar.x = 60;   // was 60
        bar.y = 60 + i * (barWidth+barPadding)  ;


        stage.addChild(bar);
        bars.push(bar);

        // draw the bar
        drawBar(bar, barValues[i]);
        pIcon.image.onload = function() {
            stage.update();
        };
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


    // scale the bar to the proper length
    bar.getChildAt(0).scaleX = length;

}
