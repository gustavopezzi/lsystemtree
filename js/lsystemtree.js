///////////////////////////////////////////////////////////////////////////////
// global variables
///////////////////////////////////////////////////////////////////////////////
var generations = 0;
var angle;
var axiom = 'F';
var sentence = axiom;
var len = 100;

var rules = [];

rules[0] = {
    a: 'F',
    b: 'FF+[+F-F-F]-[-F+F+F]'
}

///////////////////////////////////////////////////////////////////////////////
// generation event function
///////////////////////////////////////////////////////////////////////////////
function generate() {
    if (generations > 5) {
        axiomContainer.elt.innerHTML = '*** AXIOM IS TOO LONG ***';
        return;
    }
    generations++;
    len *= 0.5;
    var nextSentence = '';

    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        var found = false;
        for (var j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                nextSentence += rules[j].b;
                break;
            }
        }
        if (!found) {
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    axiomContainer.elt.innerHTML = '*** AXIOM ***<br/><br/>' + sentence;
    turtleDraw();
}

///////////////////////////////////////////////////////////////////////////////
// drawing function
///////////////////////////////////////////////////////////////////////////////
function turtleDraw() {
    background(1);
    resetMatrix();
    translate(width / 2, height);
    stroke(255, 80);
    strokeWeight(1);

    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);

        if (current == "F") {
            line(0, 0, 0, -len);
            translate(0, -len);
        }

        if (current == "+") {
            rotate(angle);
        }

        if (current == "-") {
            rotate(-angle)
        }

        if (current == "[") {
            push();
        }

        if (current == "]") {
            pop();
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
// initialization and environment setup
///////////////////////////////////////////////////////////////////////////////
function setup() {
    createCanvas(400, 400);
    angle = radians(25);
    background(51);
    turtleDraw();
    var button = createButton("generate");
    axiomContainer = createP('*** AXIOM ***<br/><br/>F');
    button.mousePressed(generate);
}