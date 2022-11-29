

const canvas=document.getElementById("canvas");
canvas.width=window.innerWidth-20;
canvas.height=window.innerHeight-200;
let context=canvas.getContext("2d");

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth-20;
    canvas.height=window.innerHeight-400;
})

let start_backgroung_color="white";

context.fillStyle=start_backgroung_color;
context.fillRect(0,0,canvas.width,canvas.height);

let is_drawing=false;
let draw_color="black";
let line_width="2";
let restore_array=[];
let index=-1;

const colors=document.querySelectorAll("#colors");
const color=document.querySelector("#color");
const range=document.querySelector("#range");
const clear=document.querySelector("#clear");
const undo=document.querySelector("#undo");

color.addEventListener("input",()=>{
    draw_color=color.value;
});

range.addEventListener("input",()=>{
    line_width=range.value;
})

colors.forEach((color)=>{
    color.addEventListener("click",()=>{
        draw_color=color.innerText;
    })
});

function change_color(element){
    draw_color=element.style.background; 
}

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown", start,false);
canvas.addEventListener("mousemove", draw,false);
canvas.addEventListener("mouseup", stop,false);
canvas.addEventListener("mouseout", stop,false);

function start(event){
  is_drawing=true; 
  context.beginPath();
  context.moveTo(event.clientX-canvas.offsetLeft, event.clientY-canvas.offsetTop);
  event.preventDefault();
}
function draw(event){
    if(is_drawing){
        context.lineTo(event.clientX-canvas.offsetLeft, event.clientY-canvas.offsetTop);
        context.strokeStyle=draw_color;
        context.lineWidth=line_width;
        context.lineCap="round";
        context.lineJoin="round";
        context.stroke();
    }
    event.preventDefault();
}

function stop(event){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    event.preventDefault();

    if(event.type != 'mouseout'){
        restore_array.push(context.getImageData(0,0,canvas.width,canvas.height));
        index+=1;
    }
    console.log(restore_array);
}

const clearDrawing=()=>{
    context.fillStyle=start_backgroung_color;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);
    restore_array=[];
    index=-1;
}

clear.addEventListener("click",()=>{
    clearDrawing();
})

undo.addEventListener("click",()=>{
    if(index<=0){
        clearDrawing();
    }else{
        index-=1;
        restore_array.pop();
        context.putImageData(restore_array[index],0,0);
    }
});

