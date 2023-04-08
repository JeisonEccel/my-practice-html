//Get elements from html.
let strings = document.getElementById('input1')
let rootNote = document.getElementById('input2')
let scale = document.getElementById('input3')
let pattern = document.getElementById('input4')
let block = document.getElementById('input5')
let menu = document.getElementById('topmenu')

let tuning = document.getElementById('tuning')
let fretboard = document.getElementById('fretboard')
let fretnotes = document.getElementById('fretnotes')
let titleSection = document.getElementById('outputs1')
let outfret = document.getElementById('outputs2')
let outtab = document.getElementById('outputs4')
let outpart = document.getElementById('outputs5')
let intervalsRow = document.getElementById('intervalsRow')
let notesRow = document.getElementById('notesRow')

let stringsName = ''
let rootNoteName = ''
let scaleName = ''
let patternName = ''
let blockName = ''

//Set constants
const space = 21
const fromTop = 14
const leftSpace = 28.85
const tabLimit = 28
const partLimit = 20
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
let fullScale = findFullScale() //full chromatic scale with numbers
let fullPartiture = findFullPartiture() //full chromatic scale without accidents, with numbers
let fullRange = []  //range of notes in the fretboard with numbers
let scaleNotes = [] //scale as shown in the table
let scaleIntervals = [] //intervals of the chosen scale
let stringDef = []  //defaul note for open strings
let intervalDef = []  //defaul intervals for each scale

//Set event Listeners
strings.addEventListener('change',setStrings)
rootNote.addEventListener('change',setScaleTable)
scale.addEventListener('change',setScaleTable)
pattern.addEventListener('change',setScaleTable)
block.addEventListener('change',setNotesToFret)
menu.addEventListener('click', openMenu)

//Menu section
function openMenu() {//Open and close responsive menu
    if(menu.className === 'topnav') {
        menu.className += ' responsive'
    }else{
        menu.className = 'topnav'
    }
}

//Strings section
function setStrings() {//Create the string properties (open string, buttons to change the tune)
    tuning.innerHTML = ''
    findStrings(Number(strings.value))

    for(n = Number(strings.value); n > 0; n--){
        addStr(n)
        addStrUp(n)
        addStrDown(n)
    }
    
    setScaleTable()
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
    setNotesToFret()
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
    setNotesToFret()
}

function tuneHoverIn(btId) {//Change the button color when mouse over
    document.getElementById(btId).style.background = color5   
}

function tuneHoverOut(btId) {//Change the button color back to defaulf when mouse out
    document.getElementById(btId).style.background = color4   
}

//Table section
function setScaleTable() {//Create the table with the scale
    let noteIndex = Number(rootNote.value)
    let scaleIntervals = findScaleIntervals()
    let intervalIndex = 0

    intervalsRow.innerHTML = ''
    notesRow.innerHTML = ''
    scaleNotes = []

    for(let n = 0; n < scaleIntervals.length; n++) {
        intervalIndex += scaleIntervals[n]
        addIntervalToTable(intervalIndex)

        noteIndex += scaleIntervals[n]
        if(noteIndex > 11){ 
            noteIndex -= 12
        }
        addNoteToTable(noteIndex)
        scaleNotes.push(allNotes[noteIndex])
    }
    
    rootNoteName = scaleNotes[0]
    setBlocks()
}

function findScaleIntervals() { //Define the sequecy of intervals in each scale
    switch(Number(scale.value)) {
        case 1: //Major
            intervalDef = [0,2,2,1,2,2,2]
            scaleName = 'Major'
            break
        case 2: //Minor
            intervalDef = [0,2,1,2,2,1,2]
            scaleName = 'Minor'
            break
        case 3: //Major Pentatonic
            intervalDef = [0,2,2,3,2]
            scaleName = 'Major Pentatonic'
            break
        case 4: //Minor Pentatonic
            intervalDef = [0,3,2,2,3]
            scaleName = 'Minor Pentatonic'
            break
        case 5: //Pentatonic Blues
            intervalDef = [0,3,2,1,1,3]
            scaleName = 'Pentatonic Blues'
            break
        case 6: //Harmonic Minor
            intervalDef = [0,2,1,2,2,1,3]
            scaleName = 'Harmonic Minor'
            break
        case 7: //Melodic Minor
            intervalDef = [0,2,1,2,2,2,2]
            scaleName = 'Melodic Minor'
            break
        case 8: //Diminished
            intervalDef = [0,2,1,2,1,2,1,2]
            scaleName = 'Diminished'
            break
    }
    return intervalDef
}

function addIntervalToTable(note) {//Add the intervals to the table
    interval = document.getElementById(`tableInt${note}`)
    if(interval == null){
        let interval = document.createElement('td')
        interval.setAttribute('id', `tableInt${note}`)
        interval.innerText = allIntervals[note]
        interval.style.background = color4
        interval.style.border = `1px solid ${color6}`
        interval.style.borderSpacing = '1px'
        interval.style.font = 'bold 10pt Calibri'
        interval.style.textAlign = 'center'
        interval.style.verticalAlign = 'middle'
        interval.style.top = '10px'
        interval.style.width = '75px'
        interval.style.height = '20px'
        interval.style.margin = '0px -2px 0px -2px'
        interval.style.padding = '5px'
        intervalsRow.appendChild(interval)
    }

}

function addNoteToTable(note) {//Add the notes to the table
    interval = document.getElementById(`tableNote${note}`)
    if(interval == null){
        let interval = document.createElement('td')
        interval.setAttribute('id', `tableNote${note}`)
        interval.innerText = allNotes[note]
        interval.style.background = color3
        interval.style.border = `1px solid ${color6}`
        interval.style.borderSpacing = '1px'
        interval.style.font = 'bold 10pt Calibri'
        interval.style.textAlign = 'center'
        interval.style.verticalAlign = 'middle'
        interval.style.top = '10px'
        interval.style.width = '75px'
        interval.style.height = '20px'
        interval.style.margin = '0px -2px 0px -2px'
        interval.style.padding = '5px'
        notesRow.appendChild(interval)
    }
}

//Update block options
function setBlocks(){//Populate block options
    block.innerHTML = ''
    let blocklabel = document.getElementById('labelinput5')
    iblocks = 0

    if(Number(pattern.value) > 1) {
        block.style.display = 'block'
        blocklabel.style.display = 'block'
        let str = document.getElementById(`str${Number(strings.value)}`)
        let openString = fullScale.indexOf(str.innerText)

        for(c = 0; c <= 22; c++) {
            let tune = null
            note = fullScale[openString + c]
            tune = note.split("")

            if(tune.length == 3) {
                findNote = tune[0] + tune[1]
            }else{
                findNote = tune[0]
            }
            
            findNote = scaleNotes.indexOf(findNote)
            
            if(findNote != -1) {
                addBlocks(note)
                iblocks++
            }
        }
        
    }else{
        block.style.display = 'none'
        blocklabel.style.display = 'none'
    }

    setNotesToFret()
}

function addBlocks(note) {//Add new block option
    let blockOpt = document.createElement('option')
    blockOpt.setAttribute('value', note)
    blockOpt.innerHTML = note
    block.appendChild(blockOpt)
}

//Fretboard notes
function setNotesToFret() {//Create pattern on fretboard
    fretnotes.innerHTML = ''
    let openString = ''
    let note = ''
    let findNote = ''
    let inputFret = false
    let openNote = block.value
    let newStr = ''
    let firstFret = 0

    for(n = Number(strings.value); n > 0; n--){
        str = document.getElementById(`str${n}`)
        defaultStrColor(str)
        openString = fullScale.indexOf(str.innerText)
        
        for(c = firstFret; c <= 30; c++) {
            let tune = null
            note = fullScale[openString + c]
            tune = note.split("")

            if(tune.length == 3) {
                findNote = tune[0] + tune[1]
            }else{
                findNote = tune[0]
            }
            
            findNote = scaleNotes.indexOf(findNote)
            if(findNote != -1) {
                switch(Number(pattern.value)) {
                    case 1:
                        addNewNote(note, n, c, findNote)
                        break
                    case 2:
                        if(openNote == note) {
                            inputFret = true
                            lastFret = c + 3
                            firstFret = c - 3
                        }

                        if(inputFret == true && c <= lastFret) {
                            addNewNote(note, n, c, findNote)
                            openNote = note
                        }else if(inputFret == true && n > 1) {
                            openNote = note                            
                            newStr = document.getElementById(`str${n - 1}`)
                            newStr = newStr.innerHTML
                            
                            if(fullScale.indexOf(openNote) >= fullScale.indexOf(newStr)){
                                inputFret = false
                            }else{
                                addNewNote(note, n, c, findNote)
                                lastFret++
                            }
                            newStr = ''
                        }else{
                            lastFret++
                        }
                        break
                    case 3:
                        if(openNote == note) {
                            inputFret = true
                            lastFret = 1
                            firstFret = 0
                        }

                        if(inputFret == true && lastFret <= 3) {
                            addNewNote(note, n, c, findNote)
                            openNote = note
                            lastFret++
                        }else{
                            if(inputFret==true) {
                                openNote = note
                                inputFret = false
                            }
                        }
                        break
                    case 4:
                        if(openNote == note) {
                            inputFret = true
                            lastFret = 1
                            firstFret = 0
                        }

                        if(inputFret == true && lastFret <= 4) {
                            addNewNote(note, n, c, findNote)
                            openNote = note
                            lastFret++
                        }else{
                            if(inputFret==true) {
                                openNote = note
                                inputFret = false
                            }
                        }
                        break
                }
            }
        }
    }
    
    setTab()
}

function addNewNote(note, str, fret, root) {//Add new not to fretboard

    if(fret > 0 && fret <= 24) {
        findStrings(Number(strings.value))
        newNote = document.getElementById(`fretNote${str}${fret}`)
        
        if(newNote == null){
            let newNote = document.createElement('p')
            newNote.setAttribute('id', `fretNote${str}${fret}`)
            newNote.innerHTML = note
            if(root == 0) {
                newNote.style.background = color2
            }else{
                newNote.style.background = color1
            }
            newNote.style.border = `1px solid ${color6}`
            newNote.style.borderRadius = '8px'
            newNote.style.font = 'bold 8pt Calibri'
            newNote.style.textAlign = 'center'
            newNote.style.verticalAlign = 'middle'
            newNote.style.position = 'absolute'
            newNote.style.left = `${46 + leftSpace*fret}px`
            newNote.style.top = `${fromTop + str*space}px`
            newNote.style.width = '14px'
            newNote.style.height = '14px'
            newNote.style.padding = '1px'
            newNote.style.transition = '0.2s'
            newNote.addEventListener('mouseenter', function(){fretHoverIn(`${str}${fret}`)})
            newNote.addEventListener('mouseleave', function(){fretHoverOut(`${str}${fret}`, root)})
            newNote.addEventListener('click', function(){fretClick(`${str}${fret}`)})
            fretnotes.appendChild(newNote)
        }
    }else if(fret <= 24) {
        let openStr = document.getElementById(`str${str}`)
        if(root == 0) {
            openStr.style.background = color2
        }else{
            openStr.style.background = color1
        }
        openStr.addEventListener('mouseenter',function(){fretHoverIn(str)})
        openStr.addEventListener('mouseleave',function(){fretHoverOut(str, root)})
        openStr.addEventListener('click',function(){fretClick(str)})
        openStr.style.color = 'black'
        openStr.style.border = `1px solid ${color6}`
    }
}

function fretHoverIn(fretId){//Change color of note on fret when mouse over
    if(Number(fretId) < 10) {
        document.getElementById(`str${fretId}`).style.background = color4
        document.getElementById(`tabnoteUp${fretId}0`).style.background = color2
        document.getElementById(`tabnoteDown${fretId}0`).style.background = color2
    }else{
        document.getElementById(`fretNote${fretId}`).style.background = color4
        document.getElementById(`tabnoteUp${fretId}`).style.background = color2
        document.getElementById(`tabnoteDown${fretId}`).style.background = color2
    }
}

function fretHoverOut(fretId, root) {//Change color of note on fret back to default 
    if(Number(fretId) < 10) {
        if(root == 0) {
            document.getElementById(`str${fretId}`).style.background = color2
        }else{
            document.getElementById(`str${fretId}`).style.background = color1
        }
        document.getElementById(`tabnoteUp${fretId}0`).style = ''
        document.getElementById(`tabnoteDown${fretId}0`).style = ''
    }else{
        if(root == 0) {
            document.getElementById(`fretNote${fretId}`).style.background = color2
        }else{
            document.getElementById(`fretNote${fretId}`).style.background = color1
        }
        document.getElementById(`tabnoteUp${fretId}`).style = ''
        document.getElementById(`tabnoteDown${fretId}`).style = ''
    }

}

function fretClick(fretId){//Will reproduce the sound of the note
    note = document.getElementById(fretId)
    note = note.innerHTML
    let noteSound = new Audio(`sounds/${note}.mid`)
    //alert('note play ' + `sounds/${note}.mid`)
    noteSound.play()
}

function findFullScale() {//Return array with full scale (including number)
    let fullScale = []
    for(n = 0; n < 10; n++){
        for(i in allNotes) {
            fullScale.push(allNotes[i] + n)
        }
    }
    return fullScale
}

//Tablature section
function setTab() {//Create the tab with the Pattern
    let countTab = 1
    let tabId = 1

    if(Number(pattern.value) > 1) {
        outtab.style.display = 'block'
        outtab.innerHTML = '<p>Ascending</p>'

        addTabBlock(tabId) 

        for(n = Number(strings.value); n > 0; n--) {
            let note = document.getElementById(`str${n}`)

            if(note.style.color == 'black') {
                c = 0
                addTabNote(n, c, tabId, 'Up')
                countTab++
            }

            for(c = 1; c <= 24; c++) {
                
                note = document.getElementById(`fretNote${n}${c}`)
                if(note != null) {
                    if(countTab > tabLimit) {
                        outtab.innerHTML += '<p></p>'
                        countTab = 1 
                        tabId++
                        addTabBlock(tabId) 
                    }

                    addTabNote(n, c, tabId, 'Up')
                    countTab++
                }
            }
        }

        outtab.innerHTML += '<p>Descending</p>'
        countTab = 1 
        tabId++
        addTabBlock(tabId) 

        for(n = 1; n <= Number(strings.value); n++) {
            let note = document.getElementById(`str${n}`)

            if(note.style.color == 'black') {
                c = 0
                addTabNote(n, c, tabId, 'Down')
                countTab++
            }

            for(c = 24; c >= 0; c--) {

                note = document.getElementById(`fretNote${n}${c}`)
                if(note != null) {
                    if(countTab > tabLimit) {
                        outtab.innerHTML += '<p></p>'
                        countTab = 1 
                        tabId++
                        addTabBlock(tabId) 
                    }

                    addTabNote(n, c, tabId, 'Down')
                    countTab++
                }
                
            }
        }
    }else {
        outtab.innerHTML = '<p>All notes on the fretboard.</p>'
        outtab.style.display = 'none'
    }
    setPartiture()
}

function addTabBlock(tabId){//Add new block of tab
    for(i = 1; i <= Number(strings.value); i++) {
        let line = document.createElement('p')
        line.setAttribute('id', `tabline${i}${tabId}`)
        line.innerHTML = '|<span class = "tabline">&#x2500&#x2500&#x2500</span>'
        line.style.font = 'normal 8pt calibri'
        line.style.margin = '-5px 0px 0px 0px'
        line.style.padding = '0px'
        outtab.appendChild(line)
    }
}

function addTabNote(string, fret, tabId, tabType) {//Add notes to tab
    for(i=1; i <= Number(strings.value); i++) {
        let tabline = document.getElementById(`tabline${i}${tabId}`)
        if(i == string) {
            if(fret > 9) {
                tabline.innerHTML += `<span class="tabnote" id="tabnote${tabType}${string}${fret}"><strong>${fret}</strong></span><span class = "tabline">&#x2500&#x2500</span>`
            }else {
                tabline.innerHTML += `<span class="tabnote" id="tabnote${tabType}${string}${fret}"><strong>${fret}</strong></span><span class = "tabline">&#x2500&#x2500&#x2500</span>`
            }
        }else{
            tabline.innerHTML += '<span class = "tabline">&#x2500&#x2500&#x2500&#x2500&#x2500</span>'
        }
    }
    let newNote = document.getElementById(`tabnote${tabType}${string}${fret}`)
    newNote.addEventListener('mouseenter', function(){fretHoverIn(`${string}${fret}`)})
    newNote.addEventListener('mouseleave', function(){fretHoverOut(`${string}${fret}`)})
    newNote.addEventListener('click', function(){fretClick(`${string}${fret}`)})

}

//Partiture Section
function setPartiture() {//Create the tab with the Pattern
    let countTab = 1
    let tabId = 1

    outpart.innerHTML = '<p>Partiture:</p>'

    addPartitureBlock(tabId) 
    
    for(n = Number(strings.value); n > 0; n--) {
        let note = document.getElementById(`str${n}`)

        if(note.style.color == 'black') {
            countTab = addPartitureNote(countTab, note.innerHTML, tabId)
        }
        
        for(c = 1; c <= 24; c++) {
            note = document.getElementById(`fretNote${n}${c}`)
            if(note != null) {
                if(countTab > partLimit) {
                    outpart.innerHTML += '<p></p>'
                    countTab = 1 
                    tabId++
                    addPartitureBlock(tabId) 
                }

                countTab = addPartitureNote(countTab, note.innerHTML, tabId)
            }
        }
    }
    setScaleTitle()
}

function addPartitureBlock(tabId){//Add new block of tab
    let upperLines = 0
    let lowerLines = 0
    let maxLines = 0
    let minLines = 0
    
    fullRange = findNotesRange()

    //Count upper lines required
    for(i = (tabId - 1) * partLimit; i <= partLimit*tabId; i++ ){
        note = fullRange[i]
        indexNote = fullPartiture.indexOf(note)
        if(indexNote > 31 && indexNote != -1){
            if(indexNote > maxLines){
                upperLines = (indexNote - 31) / 2
                maxLines = indexNote
            }
        }
    }

    //Add upper lines
    for(i = 0; i <= upperLines; i++) {
        let line = document.createElement('p')
        line.setAttribute('id', `upperline${tabId}${i}`)
        line.setAttribute('class', 'tabline')
        line.style.font = 'normal 8pt calibri'
        line.style.margin = '-5px 0px 0px 0px'
        line.style.padding = '0px'
        line.style.height = '13px'
        outpart.appendChild(line)
    }

    //Add tab block
    for(i = 1; i <= 5; i++) {
        let line = document.createElement('p')
        line.setAttribute('id', `partitureline${i}${tabId}`)
        line.setAttribute('class', 'tabline')
        line.innerHTML = '<span class="firstline">|</span>&#x2500&#x2500&#x2500&#x2500'
        line.style.font = 'normal 8pt calibri'
        line.style.margin = '-5px 0px 0px 0px'
        line.style.padding = '0px'
        outpart.appendChild(line)
    }

    //Count lower lines required
    for(i = (tabId - 1) * partLimit; i <= partLimit*tabId; i++ ){
        note = fullRange[i]
        indexNote = fullPartiture.indexOf(note)
        if(indexNote < 23 && indexNote != -1){
            if(23 - indexNote > minLines) {
                lowerLines = (23 - indexNote) / 2
                minLines = indexNote
            }
        }
    }  
    //Add lower lines
    for(i = 0; i <= lowerLines; i++) {
        let line = document.createElement('p')
        line.setAttribute('id', `lowerline${i}${tabId}`)
        line.setAttribute('class', 'tabline')
        line.style.font = 'normal 8pt calibri'
        line.style.margin = '-5px 0px 0px 0px'
        line.style.padding = '0px'
        line.style.height = '13px'
        outpart.appendChild(line)
    }
    
    //Add clef symbol
    let clef = document.createElement('img')
    clef.setAttribute('id',`clef${tabId}`)
    clef.style.position = 'absolute'
    
    if(Number(strings.value) < 6) {
        clef.src = 'images/notes-clef-F.png'
        clef.style.width = '25px'
        clef.style.height = '30px'
        clef.style.top = `${tabId*71.5 - 28 + upperLines*13}px`
        clef.style.left = '15px'
    }else{
        clef.src = 'images/notes-clef-G.png'
        clef.style.width = '35px'
        clef.style.height = '60px'
        clef.style.top = `${tabId*72 - 33 + upperLines*13}px`
        clef.style.left = '10px'
    }
    outpart.appendChild(clef)
}

function addPartitureNote(countTab, note, tabId) {//Add notes to tab
    noteId = fullPartiture.indexOf(note)

    if(noteId == -1) {
        newNote = note.split("")
        newNote = `${note[0]}${note[2]}`
        noteId = fullPartiture.indexOf(newNote)
        addSharpNote(note, tabId, noteId, countTab)
    }
    
    let noteObj = document.getElementById(`partiture${note}`)
    if(noteObj == null) {
        noteObj = document.createElement('img')
        noteObj.setAttribute('id',`partiture${note}`)
        noteObj.src = 'images/notes-whole.png'
        noteObj.style.width = '20px'
        noteObj.style.height = '10px'
        noteObj.style.position = 'absolute'
        noteObj.style.top = `${164*tabId - noteId*4}px`
        noteObj.style.left = `${30 + countTab*33}px`
        outpart.appendChild(noteObj)

        //alert(countTab + ' ' + note + ' ' + tabId + ' ' + noteId)
        countTab++
    
        for(i = 1; i <= 5; i++) {
            let line = document.getElementById(`partitureline${i}${tabId}`)
            for(j = 0; j <6; j++) {
                line.innerHTML += '&#x2500'
            }
        }
    
    }
    
    /*
    for(i = 1; i <= Number(strings.value); i++) {
        let tabnote = document.getElementById(`tabnote${i}${tabId}`)
        if(i == string) {
            tabnote.innerHTML += `<span class = "notevalue">${fret}</span><span class = "tabnote">`
        }else{
            if(fret > 9) {
                tabnote.innerHTML += '<span class = "tablong">'
            }else{
                tabnote.innerHTML += '<span class = "tabshort">'
            }
        }
        let line = document.getElementById(`tabline${i}${tabId}TEST`)
        line.style.width = `${30 + fret*35}px`
    }
    */
   
   return countTab
}

function addSharpNote(note, tabId, noteId, countTab) {
    let sharpObj = document.getElementById(`sharpNote${note}`)
        if(sharpObj == null) {
            sharpObj = document.createElement('img')
            sharpObj.setAttribute('id',`sharpNote${note}`)
            sharpObj.src = 'images/notes-sharp.png'
            sharpObj.style.width = '7px'
            sharpObj.style.height = '16px'
            sharpObj.style.position = 'absolute'
            sharpObj.style.top = `${162*tabId - noteId*4}px`
            sharpObj.style.left = `${27 + countTab*33}px`
            outpart.appendChild(sharpObj)
        }
}

function findNotesRange() {
    let fullRange = []
    
    for(n = Number(strings.value); n > 0; n--) {
        let note = document.getElementById(`str${n}`)

        if(note.style.color == 'black' && fullRange.indexOf(note.innerHTML) == -1) {
            fullRange.push(note.innerHTML)
        }
        
        for(c = 1; c <= 24; c++) {
            note = document.getElementById(`fretNote${n}${c}`)
            if(note != null && fullRange.indexOf(note.innerHTML) == -1) {
                fullRange.push(note.innerHTML)
            }
        }
    }
    return fullRange
}

function findFullPartiture() {
    let fullPartiture = []
    for(n = 0; n < 10; n++){
        for(i in allNotes) {
            let tune = null
            note = allNotes[i]
            tune = note.split("")
            if(tune.length < 2) {
                fullPartiture.push(allNotes[i] + n)
            }
        }
    }
    return fullPartiture
}

//Title section
function setScaleTitle() {
    titleSection.innerHTML = `${rootNoteName} ${scaleName} in ${stringsName} strings.`
}