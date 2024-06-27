/** Static class setting variables for each area */
class Areas {
    /** array of objects containing the name and cost of each area */
    static areas = [
        {name: "LAKE",  cost: 0},
        {name: "RIVER", cost: 5000},
        {name: "BEACH", cost: 25000},
        {name: "OCEAN", cost: 50000}
    ];

    /** array of objects containing the names of each fish that can be found in a given area with their respective grades */
    static areaFish = [
        /* Lake  Fish */ {common: ["c"], rare: ["r"], legendary: ["l"]},
        /* River Fish */ {common: ["c"], rare: ["r"], legendary: ["l"]},
        /* Beach Fish */ {common: ["c"], rare: ["r"], legendary: ["l"], exotic: ["ex"]},
        /* Ocean Fish */ {common: ["c"], rare: ["r"], legendary: ["l"], exotic: ["ex"], endangered: ["en"]}
    ];

    /** array of the chances one may find a certain grade of fish in a given area */
    static areaChances = [
        [(0.70), 0.70 + (0.25), 0.95 + (0.05)], //                    c70, r25, l5
        [(0.50), 0.50 + (0.35), 0.85 + (0.15)], //                    c50, r35, l15
        [(0), (0.65), 0.65 + (0.30), 0.95 + (0.05)], //               c0 r65, l30, e5
        [(0), (0.50), 0.50 + (0.25), 0.75 + (0.20), 0.95 + (0.05)] // c0 r50, l25, e15, ed5
    ];
}