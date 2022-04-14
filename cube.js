var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let d=10,l=5,deg=0,cou=50,sca=50;
let x=new Array(8);
let y=new Array(8);
let z=new Array(8);
let cube=[[1,1,1],
          [-1,1,1],
          [-1,-1,1],
          [1,-1,1],
          [1,1,-1],
          [-1,1,-1],
          [-1,-1,-1],
          [1,-1,-1]];
          
let rot=[[cos(deg),0,sin(deg)],
       [0,1,0],
       [-sin(deg),0,cos(deg)],];

const canvasArea = document.querySelector('myCanvas');

function line(x0,y0,x1,y1){
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.stroke();
}

function cos(n){
  return (Math.cos(Math.PI*n/64));
}

function sin(n){
  return (Math.sin(Math.PI*n/64));
}

function rotate(){
  
  rot=[[cos(deg),0,sin(deg)],
       [0,1,0],
       [-sin(deg),0,cos(deg)],];
       
  ++deg;
       
  for(let i=0;i<8;i++){
    x[i]=rot[0][0]*cube[i][0]+rot[0][1]*cube[i][1]+rot[0][2]*cube[i][2];
    y[i]=rot[1][0]*cube[i][0]+rot[1][1]*cube[i][1]+rot[1][2]*cube[i][2];
    z[i]=rot[2][0]*cube[i][0]+rot[2][1]*cube[i][1]+rot[2][2]*cube[i][2];
  }
}

function disp(){
  ctx.clearRect(0, 0, 800, 800);
  for(let i=0;i<4;i++){
    let j=(i+1)%4;
    line(x[i],y[i],x[j],y[j]);
    line(x[i+4],y[i+4],x[j+4],y[j+4]);
    line(x[i],y[i],x[i+4],y[i+4]);
  }
}

function start(){
  rotate();
  for(let i=0;i<8;i++){
    x[i]*=d/(l-z[i]);
    y[i]*=d/(l-z[i]);
    x[i]=sca*x[i]+300;
    y[i]=sca*y[i]+300;
  }
  disp();
}

setInterval(start,cou);
