/** Static class setting variables for in-game tools */
class Tools {
    /** amount of which the requirement for each grade drops depending on the luck that the player's rod has */
    static luckBonus = 0.005;

    /** array of objects containing the name, luck level, and cost of each rod */
    static rods = [
        {name: "Basic", luck: 0, cost: 0},
        {name: "Novice", luck: 1, cost: 1500},
        {name: "Reinforced", luck: 3, cost: 8000},
        {name: "Golden", luck: 5, cost: 25000},
        {name: "God", luck: 999, cost: 99999}
    ];
}