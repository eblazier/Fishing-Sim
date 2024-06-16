/** Class for storing the properties of one's profile */
export default class Profile {
    /**
     * @param {double} balance the player's balance
     * @param {int} rod the player's equipped rod
     * @param {int} currentArea the area the player is currently in
     * @param {int} unlocked the player's farthest unlocked area
     * @param {String[]} inventory an array of the player's fishes
     */
    constructor(balance, rod, currentArea, unlocked, inventory) {
        this.balance = balance;
        this.rod = rod;
        this.currentArea = currentArea;
        this.unlocked = unlocked;
        this.inventory = inventory;
    }

    getBalance() {return this.balance;}
    getRod() {return this.rod;}
    getCurrentArea() {return this.currentArea;}
    getUnlocked() {return this.unlocked;}
    getInventory() {return this.inventory;}

    /** @param {int} x */
    setBalance(x) {this.balance = x;}
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
    addToInventory(x) {this.inventory.push(x);}
    clearInventory() {this.inventory = [];}

    // Balance Management
    /** @param {double} x  */
    withdraw(x) {this.balance -= x;}
    /** @param {double} x  */
    deposit(x) {this.balance += x;}
}