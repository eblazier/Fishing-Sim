/** Object class for fish objects */
class Fish {
    /**
     * @param {String} name the name of the fish
     * @param {int} grade common, rare, legendary, exotic, or endangered [0-4]
     * @param {int} length the length of the fish
     */
    constructor(name, grade, length, unlocked) {
        this.name = name;
        this.grade = grade;
        this.length = length;
        this.value = ((unlocked + 1) / 2) * length * (
            grade == 0
            ? 1 / (1.05 - Areas.areaChances[unlocked > 1 ? 1 : unlocked][0])
            : 1 / (1.05 - Areas.areaChances[unlocked][grade])
        );
    }

    /** @return returns the name of the fish */
    getName() {return this.name;}
    /** @return returns the length of the fish */
    getLength() {return this.length;}
    /** @return the selling value of the fish */
    getValue() {return this.value;}
}