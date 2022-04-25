var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let d=5,l=5,deg=0,cou=50,sca=60;
let x=new Array(16);
let y=new Array(16);
let z=new Array(16);
let w=new Array(16);
let x0=new Array(16);
let y0=new Array(16);
let z0=new Array(16);
let w0=new Array(16);
let cube=[[1,1,1,1],
          [-1,1,1,1],
          [-1,-1,1,1],
          [1,-1,1,1],
          [1,1,-1,1],
          [-1,1,-1,1],
          [-1,-1,-1,1],
          [1,-1,-1,1],
          [1,1,1,-1],
          [-1,1,1,-1],
          [-1,-1,1,-1],
          [1,-1,1,-1],
          [1,1,-1,-1],
          [-1,1,-1,-1],
          [-1,-1,-1,-1],
          [1,-1,-1,-1]];

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
  
let rotxy=[[1,0,0,0],
           [0,1,0,0],
           [0,0,cos(deg),-sin(deg)],
           [0,0,sin(deg),cos(deg)]];
       
let rotyz=[[cos(44),0,0,-sin(44)],
           [0,1,0,0],
           [0,0,1,0],
           [sin(44),0,0,cos(44)]];
       
  ++deg;
       
  for(let i=0;i<16;i++){
    x0[i]=rotyz[0][0]*cube[i][0]+rotyz[0][1]*cube[i][1]+rotyz[0][2]*cube[i][2]+rotyz[0][3]*cube[i][3];
    y0[i]=rotyz[1][0]*cube[i][0]+rotyz[1][1]*cube[i][1]+rotyz[1][2]*cube[i][2]+rotyz[1][3]*cube[i][3];
    z0[i]=rotyz[2][0]*cube[i][0]+rotyz[2][1]*cube[i][1]+rotyz[2][2]*cube[i][2]+rotyz[2][3]*cube[i][3];
    w0[i]=rotyz[3][0]*cube[i][0]+rotyz[3][1]*cube[i][1]+rotyz[3][2]*cube[i][2]+rotyz[3][3]*cube[i][3];
  }
  
  for(let i=0;i<16;i++){
    x[i]=rotxy[0][0]*x0[i]+rotxy[0][1]*y0[i]+rotxy[0][2]*z0[i]+rotxy[0][3]*w0[i];
    y[i]=rotxy[1][0]*x0[i]+rotxy[1][1]*y0[i]+rotxy[1][2]*z0[i]+rotxy[1][3]*w0[i];
    z[i]=rotxy[2][0]*x0[i]+rotxy[2][1]*y0[i]+rotxy[2][2]*z0[i]+rotxy[2][3]*w0[i];
    w[i]=rotxy[3][0]*x0[i]+rotxy[3][1]*y0[i]+rotxy[3][2]*z0[i]+rotxy[3][3]*w0[i];
  }
  
}

function disp(){
  ctx.clearRect(0, 0, 800, 800);
  for(let i=0;i<4;i++){
    let j=(i+1)%4;
    line(x[i],y[i],x[j],y[j]);
    line(x[i+4],y[i+4],x[j+4],y[j+4]);
    line(x[i],y[i],x[i+4],y[i+4]);
    line(x[i+8],y[i+8],x[j+8],y[j+8]);
    line(x[i+12],y[i+12],x[j+12],y[j+12]);
    line(x[i+8],y[i+8],x[i+12],y[i+12]);
    line(x[i],y[i],x[i+8],y[i+8]);
    line(x[i+4],y[i+4],x[i+12],y[i+12]);
  }
}

function start(){
  rotate();
  for(let i=0;i<16;i++){
    x[i]*=d/(l-w[i]);
    y[i]*=d/(l-w[i]);
    z[i]*=d/(l-w[i]);
    
    x[i]*=d/(l-z[i]);
    y[i]*=d/(l-z[i]);
    x[i]=sca*x[i]+300;
    y[i]=sca*y[i]+300;
  }
  disp();
}

setInterval(start,cou);
