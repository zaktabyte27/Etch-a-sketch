//canvas
const canvas= document.querySelector(".canvas")
canvas.style.width = "640px";
canvas.style.height = "640px"
//Colour selector
const colourSelector = document.getElementById("colorpicker")
//Text size bar
const textSizeBar = document.querySelector(".canvasSizeText")
//paint boolean
let paint = false

//if the mouse is down paint is true but it also for a few milliseconds while the mouse is down allows individual pixels to be coloured in instead of having to drag
function mouseDown(event){
    paint = true
    if (paint){
        colorChange(event)
    }
}
//when the mouse goes up paint becomes false
function mouseUp(hit){
    paint = false
}
//Color change function for when a pixel is pressed with the mouse
function colorChange(hit){
    pauseEvent(hit)
    if (paint){
        color = colourSelector.value
        hit.target.style.backgroundColor = color
    }
}
//prevents propagation on the canvas which would mess up the code as dragging the mouse would cause it to "grab" the divs
function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}
//Grid lines being shown or not
gridLines = document.querySelector("#ShowLines")
gridLines.addEventListener("click",toggleLines)
gridLineToggle = false;

//Toggles lines to true or false when button pressed
function toggleLines(){
    if (gridLineToggle == false){
        gridLineToggle = true
        showLines()
    }
    else{
        gridLineToggle = false
        showLines()
    }
}
//Shows grid lines by adding classes as defined in the styles.css file
function showLines(){
    pixels = document.querySelectorAll(".pixel")
    if (gridLineToggle == false){
        pixels.forEach((pixel)=>pixel.classList.add("gridLinesTrue"))
    }
    else {
        pixels.forEach((pixel)=>pixel.classList.remove("gridLinesTrue"))
    }
}

clearButton = document.querySelector("#Clear") 
clearButton.addEventListener("click",erase)
//Eraser function
function erase(){
    pixels = document.querySelectorAll(".pixel")
    pixels.forEach((pixel)=>pixel.style.backgroundColor="white")
}

//so that if the mouse goes outside the canvas and then goes up the user will not be able to paint as opposed to this only existing for pixel divs
window.addEventListener("mouseup",mouseUp)

//creates new canvas as per slide
function sizeChanger(size){
    canvas.replaceChildren();
    textSizeBar.textContent = (size+" x "+size);
    //default canvas size is 640x640px
    length = (640/size)+"px"
    for (let row = 0; row < size; row++) {
        //create row template
        rowContainer= document.createElement("div")
        rowContainer.style.width = "640px"
        rowContainer.style.height = length
        rowContainer.classList.add("row")
        //
        for (let row = 0; row < size; row++) {
            //create pixel template
            pixel = document.createElement("div")
            pixel.style.width =length
            pixel.style.height =length
            pixel.classList.add("pixel")
            pixel.addEventListener("mousedown",(e)=>mouseDown(e))
            pixel.addEventListener("mousemove",(e)=>colorChange(e))
            rowContainer.appendChild(pixel)
        }
        canvas.appendChild(rowContainer)
    }
    showLines()
}
//When the canvas slider is change the above function is called to create a new canvas
const canvasSelector = document.getElementById("canvasSelector")
canvasSelector.addEventListener("change",(e)=> sizeChanger(e.target.value))