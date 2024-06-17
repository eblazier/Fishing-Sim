// Saving/Loading Data
function save(slot) {
    let file = new Blob([
        `const save${slot} = new Profile(${profile.getBalance()}, ${profile.getInventoryValue()}, ${profile.getRod()}, ${profile.getUnlocked()}, ${profile.getCurrentArea()});`
    ], {type: 'js'});
    let s_Save = document.createElement('a');
    let url = URL.createObjectURL(file);
    s_Save.href = url;
    s_Save.download = `save${slot}.js`;
    document.body.appendChild(s_Save);
    s_Save.click();
    setTimeout(() => {
        document.body.removeChild(s_Save);
        window.URL.revokeObjectURL(url);  
    }, 0);
}

let profile;
window.onload = () => {
    // add some save file shit idk man
    profile = save1;
    Profile.setBalance(profile.getBalance());
    Profile.setInventoryValue(profile.getInventoryValue());
}

// Testing
const giveMoney = (x) => profile.deposit(x);


// Fishing Methods

/** sets unlocked to a new area */
function unlock(area) {
    if(profile.getBalance() >= Areas.areas[area].cost) {
        if(profile.getUnlocked() < area) {
            profile.setUnlocked(area);
            profile.withdraw(Areas.areas[area].cost);
            console.log(`Unlocked the ${Areas.areas[area].name} area.`)
        } else console.log(`You already have the ${Areas.areas[area].name} area.`);
    } else console.log(`You cannot afford the ${Areas.areas[area].name} area.`)
}

/** sets currentArea to a new area */
function move(area) {
    if(profile.getUnlocked() >= area) {
        profile.setCurrentArea(area);
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
            profile.addToInventory(new Fish(
                Areas.areaFish[area].common[Rand.int(0, Areas.areaFish[area].common.length - 1)],
                0, Rand.int(8, 25), profile.unlocked
            ));
            break;
        case 1:
            profile.addToInventory(new Fish(
                Areas.areaFish[area].rare[Rand.int(0, Areas.areaFish[area].rare.length - 1)],
                1, Rand.int(8, 25), profile.unlocked
            ));
            break;
        case 2:
            profile.addToInventory(new Fish(
                Areas.areaFish[area].legendary[Rand.int(0, Areas.areaFish[area].legendary.length - 1)],
                2, area < 2 ? Rand.int(10, 25) : Rand.int(12, 25), profile.unlocked
            ));
            break;
        case 3:
            profile.addToInventory(new Fish(
                Areas.areaFish[area].exotic[Rand.int(0, Areas.areaFish[area].exotic.length - 1)],
                3, Rand.int(15, 25), profile.unlocked
            ));
            break;
        case 4:
            profile.addToInventory(new Fish(
                Areas.areaFish[area].endangered[Rand.int(0, Areas.areaFish[area].endangered.length - 1)],
                4, Rand.int(15, 30), profile.unlocked
            ));
            break;
    }
    console.log(
`Caught: ${profile.getInventory()[profile.inventory.length - 1].getName()},
Length: ${profile.getInventory()[profile.inventory.length - 1].getLength()},
Value: \$${profile.getInventory()[profile.inventory.length - 1].getValue().toFixed(2)}`
    );
    Profile.setInventoryValue(profile.getInventoryValue());
}

/** casts and catches a fish */
function cast() {
    let chance = Math.random();

    console.log(
`You are using a ${Tools.rods[profile.rod].name} rod,
and are in the ${profile.getCurrentArea() + 1}th area.
Luck level is: ${chance}`
    );

    for(let grade = 0; grade < 5; grade++)
        if(chance <= Areas.areaChances[profile.getCurrentArea()][grade] - (Tools.rods[profile.rod].luck * Tools.luckBonus)) {
            catchFish(grade, profile.getCurrentArea());
            break;
        }
}

/** sells all fishes in the player's inventory */
function sellAll() {
    profile.deposit(profile.getInventoryValue());
    console.log(`You sold your inventory for \$${profile.getInventoryValue().toFixed(2)}.`);

    profile.clearInventory();
}

/**
 * buys the specified rod (will not buy it if the player cannot afford it)
 * @param {int} rod the rod that will be bought according to the rods array [0-4]
 */
function buyRod(rod) {
    if(Tools.rods[rod].cost <= profile.getBalance()) {
        profile.withdraw(Tools.rods[rod].cost);
        profile.setRod(rod);
        console.log(`You bought the ${Tools.rods[rod].name} rod for \$${Tools.rods[rod].cost}.`);
    } else console.log(`You cannot afford the ${Tools.rods[rod].name} rod.`);
}