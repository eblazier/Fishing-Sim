/** Class for getting random values */
class Rand {
    /** 
     * @param {int} min minimum possible value that can be returned
     * @param {int} max maximum possible value that can be returned
     * @return a random integer between min and max
     */
    static int(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /** @return true or false boolean value */
    static bool() {
        return this.int(0,1) == 1;
    }
}

// touch list meow~ // ------
let touchList = new TouchList({
    sensual: [gojo, nanami, oliver_aiku],
    hateful: [sukuna, mahito, hanami, jogo],
    pitiful: [kaiser, yuji, todo, megumi]
});


/** Fish class for fishies :3333 */
class Fish {
    /**
     * @param {String} name the name of the fish
     * @param {int} grade common, rare, legendary, exotic, or endangered [0-4]
     * @param {int} length the length of the fish
     */
    constructor(name, grade, length) {
        this.name = name;
        this.grade = grade;
        this.length = length;
    }

    /** @return returns the name of the fish */
    get getName() {
        return this.name;
    }

    /** @return returns the length of the fish */
    get getLength() {
        return this.length;
    }

    /** @return the selling value of the fish */
    get getValue() {
        switch(grade) {
            case COMMON:
                return length * (1 / areaChances[stats.unlocked > 1 ? 1 : stats.unlocked][0]);
                break;
            case RARE:
                return length * (1 / areaChances[stats.unlocked][1]);
                break;
            case LEGENDARY:
                return length * (1 / areaChances[stats.unlocked][2]);
                break;
            case EXOTIC:
                return length * (1 / areaChances[stats.unlocked][3]);
                break;
            case ENDANGERED:
                return length * (1 / areaChances[stats.unlocked][4]);
                break;
        }
    }
}

/* Fishing Methods */

window.onload = () => {
    // add some save file shit idk man
    let stats = {balance: 0, rod: 0, unlocked: 0, inventory: []};
}


// Areas // ------
const Areas = {LAKE, RIVER, BEACH, OCEAN};
let currentArea = Areas.RIVER;
const areaFish = [
    {common: [], rare: [], legendary: []},
    {common: [], rare: [], legendary: []},
    {rare: [], legendary: [], exotic: []},
    {rare: [], legendary: [], exotic: [], endangered: []}
];
const areaChances = [
    [0.70, 0.70 + 0.25, 0.95 + 0.05], // c70, r25, l5
    [0.50, 0.50 + 0.35, 0.85 + 0.15], // c50, r35, l15
    [0, 0.65, 0.65 + 0.30, 0.95 + 0.05], // c0 r65, l30, e5
    [0, 0.50, 0.50 + 0.25, 0.75 + 0.20, 0.95 + 0.05] // c0 r50, l25, e15, ed5
];


// Tools // ------
const rods = [
    {name: "Basic", luck: 0, cost: 0},
    {name: "Novice", luck: 1, cost: 100},
    {name: "Reinforced", luck: 3, cost: 5000},
    {name: "Golden", luck: 5, cost: 15000},
    {name: "God", luck: 999, cost: 99999}
];


// Methods // ------

const luckBonus = 0.005;

/** casts and catches a fish */
function cast() {
    let chance = Math.random();

    console.log(
        `You are using a ${rods[stats.rod].name} rod,
        and are in the ${currentArea} area.
        Luck level is: ${chance}`
    );

    switch(currentArea) {
        case LAKE:
            for(let grade = 0; grade < 3; grade++)
                if(chance <= areaChances[0][grade] - (rods[stats.rod].luck * luckBonus)) {
                    catchFish(grade, 0);
                    break;
                }
            break;
        case RIVER:
            for(let grade = 0; grade < 3; grade++)
                if(chance <= areaChances[0][grade] - (rods[stats.rod].luck * luckBonus)) {
                    catchFish(grade, 1);
                    break;
                }
            break;
        case BEACH:
            for(let grade = 1; grade < 4; grade++)
                if(chance <= areaChances[0][grade] - (rods[stats.rod].luck * luckBonus)) {
                    catchFish(grade, 2);
                    break;
                }
            break;
        case OCEAN:
            for(let grade = 1; grade < 5; grade++)
                if(chance <= areaChances[0][grade] - (rods[stats.rod].luck * luckBonus)) {
                    catchFish(grade, 3);
                    break;
                }
            break;
    }
}

const minLength = 8;
const maxLength = 25;
const randLength = () => Rand.int(minLength, maxLength);

/**
 * adds a fish of a certain grade from a certain area to the player's inventory
 * @param {int} grade grade of the fish to be added [0-4]
 * @param {int} area area of which the fish to be added is from [0-3]
 */
function catchFish(grade, area) {
    switch(grade) {
        case 0:
            stats.inventory.push(new Fish(
                areaFish[area].common[Rand.int(0, areaFish[area].common.length - 1)],
                0, randLength()
            ));
            break;
        case 1:
            stats.inventory.push(new Fish(
                areaFish[area].rare[Rand.int(0, areaFish[area].rare.length - 1)],
                1, randLength()
            ));
            break;
        case 2:
            stats.inventory.push(new Fish(
                areaFish[area].legendary[Rand.int(0, areaFish[area].legendary.length - 1)],
                2, randLength()
            ));
            break;
        case 3:
            stats.inventory.push(new Fish(
                areaFish[area].exotic[Rand.int(0, areaFish[area].exotic.length - 1)],
                3, randLength()
            ));
            break;
        case 4:
            stats.inventory.push(new Fish(
                areaFish[area].endangered[Rand.int(0, areaFish[area].endangered.length - 1)],
                4, randLength()
            ));
            break;
    }
    console.log(`Caught: ${stats.inventory[stats.inventory.length - 1].getName()}, Length: ${stats.inventory[stats.inventory.length - 1].getLength()}`)
}

/** sells all fishes in the player's inventory */
function sellAll() {
    let changeInBal = 0;
    for(let fish in stats.inventory) changeInBal += fish.getValue();
    stats.balance += changeInBal;
    console.log(`You sold your inventory for \$${changeInBal}.`);

    stats.inventory = [];
}

/**
 * buys the specified rod (will not buy it if the player cannot afford it)
 * @param {int} rod the rod that will be bought according to the rods array [0-4]
 */
function buyRod(rod) {
    if(rods[rod].cost <= stats.balance) {
        stats.balance -= rods[rod].cost;
        stats.rod = rod;
        console.log(`You bought the ${rods[rod].name} rod for \$${rods[rod].cost}.`);
    } else console.log('You can\'t afford this rod.');
}