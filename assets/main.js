// Imports
({Areas} = require('./classes/Areas'));
import Fish from './classes/Fish';
import Profile from './classes/Profile';
import Rand from './classes/Rand';
import Tools from './classes/Tools';

import {save} from '../saves/slot1';

// Saving/Loading Data

function save() {
    let file = new Blob([
`import Profile from '../assets/classes/Profile';
export const save = new Profile();`
    ], {type: 'js'});
    let s_Save = document.createElement('save');
    let url = URL.createObjectURL(file);
    s_Save.href = url;
    s_Save.download = 'slot1';
    document.body.appendChild(a);
    s_Save.click();
    setTimeout(() => {
        document.body.removeChild(s_Save);
        window.URL.revokeObjectURL(url);  
    }, 0);
}

let profile;
window.onload = () => {
    // add some save file shit idk man
    profile = {balance: 0, rod: 0, currentArea: 0, unlocked: 0, inventory: []};
}

// Testing
const giveMoney = (x) => profile.balance += x;


// Fishing Methods

/** sets unlocked to a new area */
function unlock(area) {
    if(profile.balance >= Areas.areas[area].cost) {
        if(profile.unlocked < area) {
            profile.unlocked = area;
            profile.balance -= Areas.areas[area].cost;
            console.log(`Unlocked the ${Areas.areas[area].name} area.`)
        } else console.log(`You already have the ${Areas.areas[area].name} area.`);
    } else console.log(`You cannot afford the ${Areas.areas[area].name} area.`)
}

/** sets currentArea to a new area */
function move(area) {
    if(profile.unlocked >= area) {
        profile.currentArea = area;
        console.log(`Moved to the ${Areas.areas[area].name} area.`);
    } else console.log(`You have not unlocked the ${Areas.areas[area].name} area.`);
}

/**
 * adds a fish of a certain grade from a certain area to the player's inventory
 * @param {int} grade grade of the fish to be added [0-4]
 * @param {int} area area of which the fish to be added is from [0-3]
 */
function catchFish(grade, area) {
    switch(grade) {
        case 0:
            profile.inventory.push(new Fish(
                Areas.areaFish[area].common[Rand.int(0, Areas.areaFish[area].common.length - 1)],
                0, Rand.int(8, 25)
            ));
            break;
        case 1:
            profile.inventory.push(new Fish(
                Areas.areaFish[area].rare[Rand.int(0, Areas.areaFish[area].rare.length - 1)],
                1, Rand.int(8, 25)
            ));
            break;
        case 2:
            profile.inventory.push(new Fish(
                Areas.areaFish[area].legendary[Rand.int(0, Areas.areaFish[area].legendary.length - 1)],
                2, area < 2 ? Rand.int(10, 25) : Rand.int(12, 25)
            ));
            break;
        case 3:
            profile.inventory.push(new Fish(
                Areas.areaFish[area].exotic[Rand.int(0, Areas.areaFish[area].exotic.length - 1)],
                3, Rand.int(15, 25)
            ));
            break;
        case 4:
            profile.inventory.push(new Fish(
                Areas.areaFish[area].endangered[Rand.int(0, Areas.areaFish[area].endangered.length - 1)],
                4, Rand.int(15, 30)
            ));
            break;
    }
    console.log(
`Caught: ${profile.inventory[profile.inventory.length - 1].getName()},
Length: ${profile.inventory[profile.inventory.length - 1].getLength()},
Value: \$${profile.inventory[profile.inventory.length - 1].getValue().toFixed(2)}`
    );
}

/** casts and catches a fish */
function cast() {
    let chance = Math.random();

    console.log(
`You are using a ${Tools.rods[profile.rod].name} rod,
and are in the ${profile.currentArea + 1}th area.
Luck level is: ${chance}`
    );

    for(let grade = 0; grade < 5; grade++)
        if(chance <= Areas.areaChances[profile.currentArea][grade] - (Tools.rods[profile.rod].luck * Tools.luckBonus)) {
            catchFish(grade, profile.currentArea);
            break;
        }
}

/** sells all fishes in the player's inventory */
function sellAll() {
    let changeInBal = 0;
    for(let i = 0; i < profile.inventory.length; i++) changeInBal += profile.inventory[i].getValue();
    //for(let fish in profile.inventory) changeInBal += fish.getValue();
    profile.balance += changeInBal;
    console.log(`You sold your inventory for \$${changeInBal.toFixed(2)}.`);

    profile.inventory = [];
}

/**
 * buys the specified rod (will not buy it if the player cannot afford it)
 * @param {int} rod the rod that will be bought according to the rods array [0-4]
 */
function buyRod(rod) {
    if(Tools.rods[rod].cost <= profile.balance) {
        profile.balance -= Tools.rods[rod].cost;
        profile.rod = rod;
        console.log(`You bought the ${Tools.rods[rod].name} rod for \$${Tools.rods[rod].cost}.`);
    } else console.log(`You cannot afford the ${Tools.rods[rod].name} rod.`);
}