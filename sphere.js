var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let d=10,l=5,deg=0,cou=200,sca=0,ver=16;
let x=new Array(ver*(ver/2+1));
let y=new Array(ver*(ver/2+1));
let z=new Array(ver*(ver/2+1));
let sphere = [];

for(let i=0;i<ver*(ver/2+1);i++){
  let j=Math.floor(i/ver);
  sphere[i] = [];
  sphere[i][0]=sin(j)*cos(i);
  sphere[i][1]=cos(j);
  sphere[i][2]=sin(j)*sin(i);
}

const canvasArea = document.querySelector('myCanvas');

function line(x0,y0,x1,y1){
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.stroke();
}

function cos(n){
  let v=ver/2;
  return (Math.cos(Math.PI*n/v));
}

function sin(n){
  let v=ver/2;
  return (Math.sin(Math.PI*n/v));
}

function cos0(n){
  return (Math.cos(Math.PI*n/ver));
}

function sin0(n){
  return (Math.sin(Math.PI*n/ver));
}

function rotate(){
  
let rot=[[cos0(deg),0,sin0(deg)],
       [0,1,0],
       [-sin0(deg),0,cos0(deg)],];
       
  deg++;
  
  for(let i=0;i<ver*(ver/2+1);i++){
    x[i]=rot[0][0]*sphere[i][0]+rot[0][1]*sphere[i][1]+rot[0][2]*sphere[i][2];
    y[i]=rot[1][0]*sphere[i][0]+rot[1][1]*sphere[i][1]+rot[1][2]*sphere[i][2];
    z[i]=rot[2][0]*sphere[i][0]+rot[2][1]*sphere[i][1]+rot[2][2]*sphere[i][2];
  }
}

function disp(){
  ctx.clearRect(0, 0, 800, 800);
  for(let i=0;i<ver*(ver/2+1);i++){
    let j=(i+1)%ver;
    let k=Math.floor(i/ver);
    line(x[i],y[i],x[j+k*ver],y[j+k*ver]);
    line(x[(i%ver)+k*ver],y[(i%ver)+k*ver],x[(i%ver)+(k+1)*ver],y[(i%ver)+(k+1)*ver]);
  }
}

function start(){
  rotate();
  for(let i=0;i<ver*(ver/2+1);i++){
    x[i]*=d/(l-z[i]);
    y[i]*=d/(l-z[i]);
    x[i]=sca*x[i]+300;
    y[i]=sca*y[i]+300;
  }
  disp();
}

setInterval(start,cou);
