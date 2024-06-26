/** */
class GUI {
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
}