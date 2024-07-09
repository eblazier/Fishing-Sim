/** Static class for controlling the on-screen GUI */
class GUI {
    /**
     * changes the style of a number to include commas every 3 numbers before the decimal place
     * @param {Number} x the number to add commas to
     * @return the inputted number as a String with commas included
     */
    static localizeStyle(x) {
        return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    /** x and y values of each fishing location in vw */
    static fishingLocations = [
        {x: 38, y: 8.5},
        {x: 68, y: 44},
        {x: 43.7, y: 99},
        {x: 49.5, y: 151}
    ];

    /**
     * sets the location of the player element to a new x and y value
     * @param {vw} x the x value to set the location of the player to
     * @param {vw} y the y value to set the location of the player to
     */
    static setLocation(x, y) {
        document.getElementById('player').style.marginLeft = x + "vw";
        document.getElementById('player').style.marginTop = y + "vw";
    }


    /* Toggles */

    static toggleSaving() {
        if(document.getElementById('saving-menu').style.left == '-500px')
            document.getElementById('saving-menu').style.left = '0';
        else document.getElementById('saving-menu').style.left = '-500px';
    }
    static toggleShop() {
        if(document.getElementById('shop-menu').style.right == '-500px')
            document.getElementById('shop-menu').style.right = '0';
        else document.getElementById('shop-menu').style.right = '-500px';
    }


    /* Setters */

    /** @param {double} x */
    static setInventoryValue(x) {
        document.getElementById('invValue').textContent = 'Inventory Value: $' + GUI.localizeStyle(x.toFixed(2));
    }
    /** @param {double} x */
    static setBalance(x) {
        document.getElementById('balance').textContent = 'Balance: $' + GUI.localizeStyle(x.toFixed(2));
    }
    /** @param {int} area the area to set it to [0-3] */
    static setArea(area) {
        document.getElementById('area').textContent = 'Area: ' + Areas.areas[area].name;
        GUI.setLocation(GUI.fishingLocations[area].x, GUI.fishingLocations[area].y);
    }

    /**
     * alerts the user of a relevant issue/action that they encountered/activated
     * @param {String} elem element to set as an alert box
     * @param {String} content what to show in the alert
     * @param {String} color color of the text in the alert box
     */
    static alert(elem, content, color) {
        if(elem == 'area-alert') document.getElementById('shop-menu').style.top = '126px';
        document.getElementById(elem).textContent = content;
        document.getElementById(elem).style.color = color;
        for(let timeout in recentTimeouts) clearTimeout(recentTimeouts[timeout]);
        recentTimeouts = [];
        recentTimeouts.push(setTimeout(() => {
            document.getElementById(elem).textContent = '';
            if(elem == 'area-alert') document.getElementById('shop-menu').style.top = '108px';
        }, 3500));
    }
}