/** Class for storing the properties of one's profile */
class Profile {
    /**
     * @param {double} balance the player's balance
     * @param {double} inventoryValue the value of the player's fishes
     * @param {int} rod the player's equipped rod
     * @param {int} currentArea the area the player is currently in
     * @param {int} unlocked the player's farthest unlocked area
     */
    constructor(balance, inventoryValue, rod, currentArea, unlocked) {
        this.balance = balance;
        this.inventoryValue = inventoryValue;
        this.rod = rod;
        this.currentArea = currentArea;
        this.unlocked = unlocked;
        this.inventory = [];
    }

    getBalance() {return this.balance;}
    getRod() {return this.rod;}
    getCurrentArea() {return this.currentArea;}
    getUnlocked() {return this.unlocked;}
    getInventory() {return this.inventory;}

    /** @param {int} x */
    setRod(x) {this.rod = x;}
    /** @param {int} x */
    setCurrentArea(x) {this.currentArea = x;}
    /** @param {int} x */
    setUnlocked(x) {this.unlocked = x;}
    /** @param {String[]} x */
    setInventory(x) {this.inventory = x;}

    // Inventory Management
    /** @param {String} x */
    addToInventory(x) {
        this.inventory.push(x);
        this.inventoryValue += x.getValue();
    }
    clearInventory() {
        this.inventory = [];
        this.inventoryValue = 0;
        Profile.setInventoryValue(0);
    }

    getInventoryValue() {return this.inventoryValue;}

    /** @param {double} x */
    static setInventoryValue(x) {
        document.getElementById('invValue').textContent = 'Inv. Value: $' + x.toFixed(2);
    }

    // Balance Management
    /** @param {double} x  */
    withdraw(x) {
        this.balance -= x;
        Profile.setBalance(this.balance);
    }
    /** @param {double} x  */
    deposit(x) {
        this.balance += x;
        Profile.setBalance(this.balance);
    }
    /** @param {double} x */
    static setBalance(x) {
        document.getElementById('balance').textContent = 'Balance: $' + x.toFixed(2);
    }
}