let profile;
window.onload = () => {
    profile = new Profile();
    GUI.setArea(profile.getCurrentArea());
    GUI.setBalance(profile.getBalance());
    GUI.setInventoryValue(profile.getInventoryValue());
}

// Initializations

let recentTimeouts = [];


// Saving/Loading Data

/** saves the current user data to a file named 'save${slot}.js'
 * @param {int} slot the slot to save it in
 * @param {boolean} reset if this command is being used to reset a save file or not
 */
function save(slot, reset) {
    let save = document.createElement('a');
    let url = URL.createObjectURL(new Blob([
        `const save${slot} = new Profile(${reset ? `` : `${profile.getBalance()}, ${profile.getInventoryValue()}, ${profile.getRod()}, ${profile.getUnlocked()}, ${profile.getCurrentArea()}`});`
    ], {type: 'js'}));
    save.href = url;
    save.download = `save${slot}.js`;
    document.body.appendChild(save);
    save.click();
    setTimeout(() => {
        document.body.removeChild(save);
        window.URL.revokeObjectURL(url);  
    }, 0);
    GUI.alert('saving-alert', reset ? `Prompted you to reset slot ${slot}.` : `Prompted you to save to slot ${slot}.`, 'lawngreen');
}

/** resets a save file
 * @param {int} slot the slot to reser
 */
function reset(slot) {
    let save = document.createElement('a');
    let url = URL.createObjectURL(new Blob([
        `const save${slot} = new Profile();`
    ], {type: 'js'}));
    save.href = url;
    save.download = `save${slot}.js`;
    document.body.appendChild(save);
    save.click();
    setTimeout(() => {
        document.body.removeChild(save);
        window.URL.revokeObjectURL(url);  
    }, 0);
    GUI.alert('saving-alert', `Prompted you to reset slot ${slot}.`, 'lawngreen');
}

/** loads a save file, the specific one designated by slot
 * @param {int} slot the save file to load
 */
function load(slot) {
    const saves = [save1, save2, save3];
    if(slot <= saves.length) {
        profile = saves[slot - 1];
        GUI.alert('saving-alert', `Loaded data from slot ${slot}.`, 'lawngreen');
    } else profile = new Profile();
    GUI.setArea(profile.getCurrentArea());
    GUI.setBalance(profile.getBalance());
    GUI.setInventoryValue(profile.getInventoryValue());
}


// Fishing Methods

/** sets the farthest unlocked area to a new area 
 * @param {int} area the area to set it to [0-3]
*/
function unlock(area) {
    if(profile.getBalance() >= Areas.areas[area].cost) {
        if(profile.getUnlocked() < area) {
            profile.setUnlocked(area);
            profile.withdraw(Areas.areas[area].cost);
            GUI.alert('shop-alert', `Unlocked the ${Areas.areas[area].name} area for \$${GUI.localizeStyle(Areas.areas[area].cost)}.`, 'lawngreen');
        } else GUI.alert('shop-alert', `You already have the ${Areas.areas[area].name} area.`, 'red');
    } else GUI.alert('shop-alert', `You cannot afford the ${Areas.areas[area].name} area.`, 'red');
}

/** sets currentArea to a new area 
 * @param {int} area the area to set it to [0-3]
*/
function move(area) {
    if(profile.getUnlocked() >= area) {
        profile.setCurrentArea(area);
        GUI.setArea(area);
        GUI.alert('area-alert', `Moved to the ${Areas.areas[area].name} area.`, 'lawngreen');
    } else GUI.alert('area-alert', `You have not unlocked the ${Areas.areas[area].name} area.`, 'red');
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
Value: \$${GUI.localizeStyle(profile.getInventory()[profile.inventory.length - 1].getValue().toFixed(2))}`
    );
    GUI.setInventoryValue(profile.getInventoryValue());
}

/** casts and catches a fish */
function cast() {
    let chance = Math.random();

    console.log(
`You are using a ${Tools.rods[profile.rod].name} rod,
and are in the ${profile.getCurrentArea() + 1}th area.
Luck level is: ${chance}`
    );

    // TODO: rewrite this shit oh my god
    for(let grade = 0; grade < 5; grade++) {
        if(Areas.areaChances[profile.getCurrentArea()][grade] == undefined) continue;
        if(chance <= Areas.areaChances[profile.getCurrentArea()][grade] - (Tools.rods[profile.rod].luck * Tools.luckBonus)) {
            catchFish(grade, profile.getCurrentArea());
            break;
        }
        if(grade == 4) catchFish(Rand.int(0, 4), profile.getCurrentArea());
    }
}

/** sells all fishes in the player's inventory */
function sellAll() {
    profile.deposit(profile.getInventoryValue());
    console.log(`You sold your inventory for \$${GUI.localizeStyle(profile.getInventoryValue().toFixed(2))}.`);

    profile.clearInventory();
}

/**
 * buys the specified rod (will not buy it if the player cannot afford it)
 * @param {int} rod the rod that will be bought according to the rods array [0-4]
 */
function buyRod(rod) {
    if(rod > profile.getRod()) {
        if(Tools.rods[rod].cost <= profile.getBalance()) {
            profile.withdraw(Tools.rods[rod].cost);
            profile.setRod(rod);
            GUI.alert('shop-alert', `You bought the ${Tools.rods[rod].name} rod for \$${GUI.localizeStyle(Tools.rods[rod].cost)}.`, 'lawngreen');
        } else GUI.alert('shop-alert', `You cannot afford the ${Tools.rods[rod].name} rod.`, 'red');
    } else if(rod == profile.getRod()) GUI.alert('shop-alert', `You already own that rod.`, 'red');
    else GUI.alert('shop-alert', `You already own a better rod.`, 'red');
}