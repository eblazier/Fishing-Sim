let stats;
window.onload = () => {
    // add some save file shit idk man
    stats = {balance: 0, rod: 0, unlocked: 0, inventory: []};
}

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


// /** Class for storing the properties of one's profile */
// class Profile {
//     /**
//      * @param {int} balance the player's balance
//      * @param {int} rod the player's equipped rod
//      * @param {int} unlocked the player's farthest unlocked area
//      * @param {String[]} inventory an array of the player's fishes
//      */
//     constructor(balance, rod, unlocked, inventory) {
//         this.balance = balance;
//         this.rod = rod;
//         this.unlocked = unlocked;
//         this.inventory = inventory;
//     }

//     get getBalance() {return this.balance;}
//     get getRod() {return this.rod;}
//     get getUnlocked() {return this.unlocked;}
//     get getInventory() {return this.inventory;}

//     /** @param {int} x */
//     set setBalance(x) {this.balance = x;}
//     /** @param {int} x */
//     set setRod(x) {this.rod = x;}
//     /** @param {int} x */
//     set setUnlocked(x) {this.unlocked = x;}
//     /** @param {String[]} x */
//     set setInventory(x) {this.inventory = x;}

//     /** @param {String} x */
//     addToInventory(x) {this.inventory.push(x);}
// }


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
        this.value = length * (
            grade == 0
            ? (1 / (1.05 - areaChances[stats.unlocked > 1 ? 1 : stats.unlocked][0])) / 3
            : (1 / (1.05 - areaChances[stats.unlocked][grade])) / 3
        );
    }

    /** @return returns the name of the fish */
    getName() {
        return this.name;
    }

    /** @return returns the length of the fish */
    getLength() {
        return this.length;
    }

    /** @return the selling value of the fish */
    getValue() {
        return this.value;
    }
}

/* Fishing Methods */

// Areas // ------
let currentArea = 0;
const areaFish = [
    {common: ["c"], rare: ["r"], legendary: ["l"]},
    {common: ["c"], rare: ["r"], legendary: ["l"]},
    {rare: ["r"], legendary: ["l"], exotic: ["ex"]},
    {rare: ["r"], legendary: ["l"], exotic: ["ex"], endangered: ["en"]}
];
const areaChances = [
    [0.70, 0.70 + 0.25, 0.95 + 0.05], // c70, r25, l5
    [0.50, 0.50 + 0.35, 0.85 + 0.15], // c50, r35, l15
    [0, 0.65, 0.65 + 0.30, 0.95 + 0.05], // c0 r65, l30, e5
    [0, 0.50, 0.50 + 0.25, 0.75 + 0.20, 0.95 + 0.05] // c0 r50, l25, e15, ed5
];

/** sets currentArea to a new area */
function move(area) {
    if(stats.unlocked >= area) {
        currentArea = area;
        console.log(`Moved to the ${area}th area.`);
    } else console.log('Cannot move to that area.');
}


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
        and are in the ${currentArea + 1}th area.
        Luck level is: ${chance}`
    );

    for(let grade = 0; grade < 5; grade++)
        if(chance <= areaChances[0][grade] - (rods[stats.rod].luck * luckBonus)) {
            catchFish(grade, currentArea);
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
    console.log(
        `Caught: ${stats.inventory[stats.inventory.length - 1].getName()},
Length: ${stats.inventory[stats.inventory.length - 1].getLength()},
Value: ${stats.inventory[stats.inventory.length - 1].getValue().toFixed(2)}`
    );
}

/** sells all fishes in the player's inventory */
function sellAll() {
    let changeInBal = 0;
    for(let i = 0; i < stats.inventory.length; i++) changeInBal += stats.inventory[i].getValue();
    //for(let fish in stats.inventory) changeInBal += fish.getValue();
    stats.balance += changeInBal;
    console.log(`You sold your inventory for \$${changeInBal.toFixed(2)}.`);

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