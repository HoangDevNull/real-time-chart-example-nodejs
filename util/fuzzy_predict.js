const fuzzyis = require('fuzzyis');

const { LinguisticVariable, Term, Rule, FIS } = fuzzyis;

// describe new system, input and output variables

const system = new FIS('Speed system');

// init and add variables into system

const SPEED = new LinguisticVariable('speed', [0, 100]);
system.addOutput(SPEED);

const INDOORTEMP = new LinguisticVariable('indoortemp', [0, 110]);
const OUTDOORTEMP = new LinguisticVariable('outdoortemp', [0, 110]);

system.addInput(INDOORTEMP);
system.addInput(OUTDOORTEMP);

// describe terms for each variable


INDOORTEMP.addTerm(new Term('freezy', 'trapeze', [0, 10, 30, 50]));
INDOORTEMP.addTerm(new Term('cool', 'triangle', [30, 50, 70]));
INDOORTEMP.addTerm(new Term('warm', 'triangle', [50, 70, 90]));
INDOORTEMP.addTerm(new Term('hot', 'trapeze', [70, 90, 110, 110]));


OUTDOORTEMP.addTerm(new Term('f', 'trapeze', [0, 10, 30, 50]));
OUTDOORTEMP.addTerm(new Term('c', 'triangle', [30, 50, 70]));
OUTDOORTEMP.addTerm(new Term('w', 'triangle', [50, 70, 90]));
OUTDOORTEMP.addTerm(new Term('h', 'trapeze', [70, 90, 110, 110]));


SPEED.addTerm(new Term('on', 'trapeze', [0, 0, 25, 50]));
SPEED.addTerm(new Term('off', 'trapeze', [50, 75, 100, 100]));



// describe system rules



system.rules = [
    new Rule(
        ['freezy', null],
        ['off'],
        'and'
    ),
    new Rule(
        ['cool', 'f'],
        ['off'],
        'and'
    ),
    new Rule(
        ['cool', 'c'],
        ['off'],
        'and'
    ),
    new Rule(
        ['cool', 'w'],
        ['on'],
        'and'
    ),
    new Rule(
        ['cool', 'h'],
        ['on'],
        'and'
    ),
    new Rule(
        ['warm', 'f'],
        ['off'],
        'and'
    ),
    new Rule(
        ['warm', 'c'],
        ['off'],
        'and'
    ),
    new Rule(
        ['warm', 'w'],
        ['on'],
        'and'
    ),
    new Rule(
        ['warm', 'h'],
        ['on'],
        'and'
    ),
    new Rule(
        ['hot', null],
        ['on'],
        'and'
    )
];

// get some calculation

module.exports = system;

