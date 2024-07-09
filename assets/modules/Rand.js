/** Static class for getting random values */
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
        return this.int(0, 1) == 1;
    }
}