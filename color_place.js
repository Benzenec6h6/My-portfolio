var canvas; // canvas要素(HTMLCanvasElement)
var ctx; // 2Dコンテキスト(CanvasRenderingContext2D)
const W=0,R=1,G=2,B=3; //色指定
let canvasW = 640; // canvas要素の横幅(px)
let canvasH = 740; // canvas要素の縦幅(px)
let mouseX,mouseY; // 最後にクリックされた位置のx座標,最後にクリックされた位置のy座標

let px,py;
let ans=[],ques=[],r=[],g=[],b=[];

for(let i=0;i<6;i++){
  ans[i]=[];
  ques[i]=[];
}

for(let i=0;i<6;i++){
  for(let j=0;j<6;j++){
    ans[i][j]=0;
    ques[i][j]=0;
  }
  r[i]=i;
  g[i]=i;
  b[i]=i;
}

function shuffle(){
//red
  let x,y,a=r.length;
  while(a){
    let j=Math.floor(Math.random()*a);
    let t=r[--a];
    r[a]=r[j];
    r[j]=t;
  }
  for(let i=0;i<6;i++){
   y=r[i];
   ans[i][y]=R;
  }
 
//green
  a=g.length;
  while(a){
    let j=Math.floor(Math.random()*a);
    let t=g[--a];
    g[a]=g[j];
    g[j]=t;
  }
  
  while(true){
    for(let i=0;i<6;++i){
      if(r[i]==g[i]&&i<5){
        x=g[i];
        g[i]=g[i+1];
        g[i+1]=x;
      }
      if(r[i]==g[i]&&i==5){
        x=g[5];
        g[5]=g[0];
        g[0]=x;
      }
    }
    if(list(0)==true){
      break;
    }
  }
  
  for(let j=0;j<6;j++){
    y=g[j];
    ans[j][y]=G;
  }
  
//blue
  a=b.length;
  while(a){
    let j=Math.floor(Math.random()*a);
    let t=b[--a];
    b[a]=b[j];
    b[j]=t;
  }
  
  while(true){
    for(let i=0;i<6;i++){
      if((r[i]==b[i]||g[i]==b[i])&&i<5){
        x=b[i];
        b[i]=b[i+1];
        b[i+1]=x;
      }
      if((r[i]==b[i]||g[i]==b[i])&&i==5){
        x=b[5];
        b[5]=b[0];
        b[0]=x;
      }
    }
    if(list(1)==true){
      break;
    }
  }
  for(let j=0;j<6;j++){
    y=b[j];
    ans[j][y]=B;
  }
}

function list(d){
  if(d==0){  
    for(let i=0;i<6;i++){
      if(r[i]==g[i]){
        return false;
      }
    }
    return true;
  }
  if(d==1){
    for(let i=0;i<6;i++){
      if(r[i]==b[i]||g[i]==b[i]){
        return false;
      }
    }
    return true;
  }
}

let c;
window.addEventListener('DOMContentLoaded',function(){
  window.addEventListener("keypress",function(e){
    if(e.key=='w'){
      c=W;
    }
    if(e.key=='r'){
      c=R;
    }
    if(e.key=='g'){
      c=G;
    }
    if(e.key=='b'){
      c=B;
    }
  });
});

window.onload = function() {
  // canvas要素を取得し、サイズ設定
  canvas = document.getElementById('axisCanvas');
  canvas.width = canvasW;
  canvas.height = canvasH;

  // 描画のために2Dコンテキスト取得
  ctx = canvas.getContext('2d');
  
function borad(){
  ctx.strokeStyle = 'black';

  ctx.font = "40px serif";
  ctx.fillText('start', 5, 30);
  ctx.strokeRect(0,0,90,40);
  
  for(let i=0;i<6;i++){
  	for(let j=0;j<8;j++){
  	  ctx.strokeRect(80*(i+1),80*j+100,80,80);
  	}
  	ctx.strokeRect(0,80*(i+1)+100,80,80);
	ctx.strokeRect(560,80*(i+1)+100,80,80);
  }
}

function timer(){
  let m=5*60*1000;
  let now=new Date();
  let rest = m - now.getTime();
  let sec = Math.floor(rest/1000);
  
  ctx.strokeStyle = 'black';
  ctx.font = "40px serif";
  ctx.fillText(sec, 100, 30);
  ctx.strokeRect(100,0,100,40);
  ctx.clearRect(100, 0, 100, 40);
}
  
function circ(color,x,y){
  if(color==W){
	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),140+80*(y+1),36,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==R){
	ctx.fillStyle="red";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),140+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==G){
	ctx.fillStyle="green";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),140+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==B){
	ctx.fillStyle="blue";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),140+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
}

function disp(){
  for(let i=0;i<6;i++){
    let j=0;
    while(j<6){
      if(ans[i][j]==R){
        circ(R,i,-1);
        break;
      }
      if(ans[i][j]==G){
        circ(G,i,-1);
        break;
      }
      if(ans[i][j]==B){
        circ(B,i,-1);
        break;
      }
      j+=1;
    }
  }
  for(let i=0;i<6;i++){
    let j=5;
    while(j>=0){
      if(ans[i][j]==R){
        circ(R,i,6);
        break;
      }
      if(ans[i][j]==G){
        circ(G,i,6);
        break;
      }
      if(ans[i][j]==B){
        circ(B,i,6);
        break;
      }
      j-=1;
    }
  }
  for(let i=0;i<6;i++){
    let j=0;
    while(j<6){
      if(ans[j][i]==R){
        circ(R,-1,i);
        break;
      }
      if(ans[j][i]==G){
        circ(G,-1,i);
        break;
      }
      if(ans[j][i]==B){
        circ(B,-1,i);
        break;
      }
      j+=1;
    }
  }
  for(let i=0;i<6;i++){
    let j=5;
    while(j>=0){
      if(ans[j][i]==R){
        circ(R,6,i);
        break;
      }
      if(ans[j][i]==G){
        circ(G,6,i);
        break;
      }
      if(ans[j][i]==B){
        circ(B,6,i);
        break;
      }
      j-=1;
    }
  }
}

function question(){
  for(let i=0;i<6;i++){
    for(let j=0;j<6;j++){
      if(ques[i][j]==W){r
        circ(W,i,j);
      }
      if(ques[i][j]==R){
        circ(R,i,j);
      }
      if(ques[i][j]==G){
        circ(G,i,j);
      }
      if(ques[i][j]==B){
        circ(B,i,j);
      }
    }
  }
}
   

shuffle();
borad();
timer();
//disp();
  
  // クリックイベントの登録
  canvas.onclick = function(e) {
    // 一度描画をクリア
    //ctx.clearRect(0, 0, canvasW, canvasH);
      
    // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - Math.floor(rect.left) - 2;
    mouseY = e.clientY - Math.floor(rect.top) - 2;
    px=Math.floor(mouseX/80)-1;
    py=Math.floor((mouseY-100)/80)-1;

    // クリック位置を中心に円を描画
    if(0<mouseX&&mouseX<90&&0<mouseY&&mouseY<40){
      disp();
    }
    if(0<=px&&px<=5&&0<=py&&py<=5){
      if(c==W){
        ques[px][py]=W;
      }
      if(c==R){
        ques[px][py]=R;
      }
      if(c==G){
        ques[px][py]=G;
      }
      if(c==B){
        ques[px][py]=B;
      }
    }
    question();

    // 座標の表示テキストを描画
    /*let maxWidth = 100;
    ctx.textAlign = 'right';
    ctx.fillText('( ' + mouseX + ', ' + mouseY + ' )', canvasW - 20, canvasH - 20, maxWidth);*/
  };
  //borad();
};
