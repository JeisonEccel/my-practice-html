//Get elements from html.
let strings = document.getElementById('input1')
let rootNote = document.getElementById('input2')
let chord = document.getElementById('input3')
let auxNote = document.getElementById('input4')
let block = document.getElementById('input5')
let menu = document.getElementById('topmenu')

let tuning = document.getElementById('tuning')
let fretboard = document.getElementById('fretboard')
let fretnotes = document.getElementById('fretnotes')
let titleSection = document.getElementById('outputs1')
let outfret = document.getElementById('outputs2')
let outtab = document.getElementById('outputs4')
let intervalsRow = document.getElementById('intervalsRow')
let notesRow = document.getElementById('notesRow')

let stringsName = ''
let rootNoteName = ''
let chordName = ''
let auxiliaryName = ''
let blockName = ''

//Set constants
const space = 21
const fromTop = 14
const leftSpace = 28.85
const color0 = 'rgb(254,255,254)'  //Color for white Background
const color1 = '#E4EAEA' 
const color2 = '#F6F979'     //'#D4E79E' '#D0F079' '#FFDBAF'  Color for root note 
const color3 = '#C6B29B'
const color4 = '#AE621F'
const color5 = '#383508'
const color6 = '#141A13'

//Set arrays
let allNotes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
let allIntervals = ['R','2m','2M','3m','3M','4','5dim','5','6m','6M','7m','7M']
let stringDef = []

//Set event Listeners
strings.addEventListener('change',setStrings)
//rootNote.addEventListener('change',setScaleTable)
//chord.addEventListener('change',setScaleTable)
//pattern.addEventListener('change',setScaleTable)
//block.addEventListener('change',setNotesToFret)
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

//Fretboard section
function setStrings() {//Create the string properties (open string, buttons to change the tune)
    tuning.innerHTML = ''
    findStrings(Number(strings.value))

    for(n = Number(strings.value); n > 0; n--){
        addStr(n)
        addStrUp(n)
        addStrDown(n)
    }
    
    //setScaleTable()
}

function findStrings(string) {//Define setting per string
    switch(string) {
        case 4:
            fretboard.src = 'images/fretboard4.png'
            stringDef = ['G2','D2','A1','E1']
            break
        case 5:
            fretboard.src = 'images/fretboard5.png'
            stringDef = ['G2','D2','A1','E1','B0']
            break
        case 6:
            fretboard.src = 'images/fretboard6.png'
            stringDef = ['E4','B3','G3','D3','A2','E2']
            break
        case 7:
            fretboard.src = 'images/fretboard7.png'
            stringDef = ['E4','B3','G3','D3','A2','E2','B1']
            break
        case 8:
            fretboard.src = 'images/fretboard8.png'
            stringDef = ['E4','B3','G3','D3','A2','E2','B1','F#1']
            break
    }
    stringsName = string
}

function addStr(string) {//Find and creates the open string
    str = document.getElementById(`str${string}`)
    if(str == null){
        let str = document.createElement('p')
        str.setAttribute('id', `str${string}`)
        str.innerHTML = stringDef[string - 1]
        defaultStrColor(str)
        str.style.font = 'normal 8pt Calibri'
        str.style.textAlign = 'center'
        str.style.verticalAlign = 'middle'
        str.style.position = 'absolute'
        str.style.left = '20px'
        str.style.top = `${fromTop + string*space}px`
        str.style.width = '19px'
        str.style.height = '14px'
        str.style.padding = '1px'
        tuning.appendChild(str)
    }
}

function defaultStrColor(str){//Set background color on tuning
    str.style.background = color0
    str.style.color = color3
    str.style.border = `1px solid ${color0}`
    str.addEventListener('mouseenter',function(){strHoverIn(str)})
    str.addEventListener('mouseleave',function(){strHoverOut(str)})
}

function strHoverIn(strId){//Change string box when mouse over
    strId.style.background = color1
}

function strHoverOut(strId) {//Change string box back to default when mouse out
    strId.style.background = color0
}

function addStrUp(string) {//Create the button to tune string Up
    str = document.getElementById(`strUp${string}`)
    if(str == null){
        let str = document.createElement('img')
        str.setAttribute('src','images/icon-sort-up-80-2.png')
        str.setAttribute('id', `strUp${string}`)
        str.style.background = color4
        str.style.position = 'absolute'
        str.style.left = '44px'
        str.style.top = `${fromTop + 11 + string*space}px`
        str.style.width = '10px'
        str.style.height = '10px'
        str.style.padding = '4px 2px 4px 2px'
        str.addEventListener('click',function(){tuneStrUp(string)})
        str.addEventListener('mouseenter',function(){tuneHoverIn('strUp' + string)})
        str.addEventListener('mouseleave',function(){tuneHoverOut('strUp' + string)})
        tuning.appendChild(str)  
    }
}

function addStrDown(string) {//Create the button to tune string Down
    str = document.getElementById(`strDown${string}`)
    if(str == null){
        let str = document.createElement('img')
        str.setAttribute('src','images/icon-sort-down-80-2.png')
        str.setAttribute('id', `strDown${string}`)
        str.style.background = color4
        str.style.position = 'absolute'
        str.style.left = '5px'
        str.style.top = `${fromTop + 11 + string*space}px`
        str.style.width = '10px'
        str.style.height = '10px'
        str.style.padding = '4px 2px 4px 2px'
        str.addEventListener('click', function(){tuneStrDown(string)})
        str.addEventListener('mouseenter', function(){tuneHoverIn(`strDown${string}`)})
        str.addEventListener('mouseleave', function(){tuneHoverOut(`strDown${string}`)})
        tuning.appendChild(str)    
    }
}

function tuneStrUp(tuneToChange) {//Change the open string 1 step Up
    let str = document.getElementById(`str${tuneToChange}`)
    let tune = null
    let pos = null
    let num = null

    tune = str.innerText.split("")
    if(tune.length == 3) {
        pos = allNotes.indexOf(tune[0] + tune[1])
        num = Number(tune[2])
    }else{
        pos = allNotes.indexOf(tune[0])
        num = Number(tune[1])
    }

    if(pos < allNotes.length - 1) {
        pos += 1
    } else {
        pos = 0
        num += 1
    }

    if(num <= 9){
        str.innerText = allNotes[pos] + num
    }
    //setNotesToFret()
}

function tuneStrDown(tuneToChange) {//Change the open string 1 step Down
    let str = document.getElementById(`str${tuneToChange}`)
    let tune = null
    let pos = null
    let num = null

    tune = str.innerText.split("")
    if(tune.length == 3) {
        pos = allNotes.indexOf(tune[0] + tune[1])
        num = Number(tune[2])
    }else{
        pos = allNotes.indexOf(tune[0])
        num = Number(tune[1])
    }

    if(pos != 0) {
        pos -= 1
    } else {
        pos = 11
        num -= 1
    }

    if(num >= 0){
        str.innerText = allNotes[pos] + num
    }
    //setNotesToFret()
}

function tuneHoverIn(btId) {//Change the button color when mouse over
    document.getElementById(btId).style.background = color5   
}

function tuneHoverOut(btId) {//Change the button color back to defaulf when mouse out
    document.getElementById(btId).style.background = color4   
}
