/** Fish class for fishies :3333 */
export default class Fish {
    /**
     * @param {String} name the name of the fish
     * @param {int} grade common, rare, legendary, exotic, or endangered [0-4]
     * @param {int} length the length of the fish
     */
    constructor(name, grade, length) {
        this.name = name;
        this.grade = grade;
        this.length = length;
        this.value = ((stats.unlocked + 1) / 2) * length * (
            grade == 0
            ? 1 / (1.05 - areaChances[stats.unlocked > 1 ? 1 : stats.unlocked][0])
            : 1 / (1.05 - areaChances[stats.unlocked][grade])
        );
    }

    /** @return returns the name of the fish */
    getName() {return this.name;}
    /** @return returns the length of the fish */
    getLength() {return this.length;}
    /** @return the selling value of the fish */
    getValue() {return this.value;}
}