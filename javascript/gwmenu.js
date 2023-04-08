//Get elements from html.
let menu = document.getElementById('topmenu')

//Set event Listeners
menu.addEventListener('click', openMenu)
menu.addEventListener('focusout', openMenu)

//Menu section
function openMenu() {//Open and close responsive menu
    if(menu.className === 'topnav') {
        menu.className += ' responsive'
    }else{
        menu.className = 'topnav'
    }
}