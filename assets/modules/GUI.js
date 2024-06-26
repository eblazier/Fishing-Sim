/** */
class GUI {
    /* Toggles */
    static toggleSaving() {
        if(document.getElementsByClassName('save-menu')[0].style.left == '-500px')
            document.getElementsByClassName('save-menu')[0].style.left = '0';
        else document.getElementsByClassName('save-menu')[0].style.left = '-500px';
    }
    static toggleShop() {
        if(document.getElementsByClassName('shop-menu')[0].style.right == '-500px')
            document.getElementsByClassName('shop-menu')[0].style.right = '0';
        else document.getElementsByClassName('shop-menu')[0].style.right = '-500px';
    }

    /**
     * alerts the user of a relevant issue that they encountered
     * @param {String} elem element to set as an alert box
     * @param {String} content what to show in the alert
     * @param {String} color color of the text in the alert box
     */
    static alert(elem, content, color) {
        document.getElementById(elem).textContent = content;
        document.getElementById(elem).style.color = color;
        for(let timeout in recentTimeouts) clearTimeout(recentTimeouts[timeout]);
        recentTimeouts = [];
        recentTimeouts.push(setTimeout(() => {
            document.getElementById(elem).textContent = '';
        }, 3500));
    }
}