var canvas; // canvas要素(HTMLCanvasElement)
var ctx; // 2Dコンテキスト(CanvasRenderingContext2D)
const W=0,R=1,G=2,B=3; //色指定
let canvasW = 640; // canvas要素の横幅(px)
let canvasH = 740; // canvas要素の縦幅(px)
let mouseX,mouseY; // 最後にクリックされた位置のx座標,最後にクリックされた位置のy座標
let count,limit=5*60*1000; //制限時間指定5*60*1000
let px,py;
let flg=false;
let ans=[],ques=[],he=[],wi=[];

for(let i=0;i<6;i++){
  ans[i]=[];
  ques[i]=[];
}

for(let i=0;i<6;i++){
  for(let j=0;j<6;j++){
    ans[i][j]=0;
    ques[i][j]=0;
  }
  he[i]=i+1;
  wi[i]=i+1;
}

function shuffle(lendata){
  let x,y,a=lendata.length;
  while(a){
    let j=Math.floor(Math.random()*a);
    let t=lendata[--a];
    lendata[a]=lendata[j];
    lendata[j]=t;
  }
}

shuffle(he);
shuffle(wi);
for(let i=0;i<6;i++){
  for(let j=0;j<6;j++){
    if((he[i]*wi[j])%7<4){
      ans[i][j]=(he[i]*wi[j])%7;
    }
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
  for(let i=0;i<6;i++){
  	for(let j=0;j<8;j++){
  	  ctx.strokeRect(80*(i+1),80*j+45,80,80);
  	}
  	ctx.strokeRect(0,80*(i+1)+45,80,80);
	ctx.strokeRect(560,80*(i+1)+45,80,80);
  }
}

function timer(){
  let m,s,mm;
  m=Math.floor(limit/60000);
  s=Math.floor(limit/1000)%60;
  mm=limit%1000;
  limit=limit-100;
  
  ctx.fillStyle = 'black';
  ctx.font = "40px serif";
  ctx.clearRect(0, 0, 300, 40);
  ctx.fillText(m+','+s+','+mm, 0, 30);
  if(s<10){
    ctx.font = "40px serif";
    ctx.clearRect(0, 0, 300, 40);
    ctx.fillText(m+','+0+s+','+mm, 0, 30);
  }
  
  if(mm<100){
    ctx.font = "40px serif";
    ctx.clearRect(0, 0, 300, 40);
    ctx.fillText(m+','+s+','+0+0+mm, 0, 30);
  }
  
  if(s<10&&mm<100){
    ctx.font = "40px serif";
    ctx.clearRect(0, 0, 300, 40);
    ctx.fillText(m+','+0+s+','+0+0+mm, 0, 30);
  }
  
  if(limit<=30000){
    ctx.fillStyle = 'red';
    ctx.font = "40px serif";
    ctx.clearRect(0, 0, 300, 40);
    ctx.fillText(m+','+s+','+mm, 0, 30);
    if(mm<100){
      ctx.font = "40px serif";
      ctx.clearRect(0, 0, 300, 40);
      ctx.fillText(m+','+s+','+0+0+mm, 0, 30);
    }
  }
  if(limit<=10000){
    if(limit%200==0){
      ctx.fillStyle = 'red';
      ctx.font = "40px serif";
      ctx.clearRect(0, 0, 300, 40);
      ctx.fillText(m+','+0+s+','+mm, 0, 30);
    }
    if(limit%200==100){
      ctx.clearRect(0, 0, 300, 40);
    }
  }
  if(limit<=0){
    ctx.fillStyle = 'red';
    ctx.font = "40px serif";
    ctx.clearRect(0, 0, 300, 40);
    ctx.fillText(0+','+0+0+','+0+0+0, 0, 30);
  }
}
 
function start(){
  disp();
  borad();
  question();
  count=setInterval(timer,100);
  return true;
}
function pause(){
  clearInterval(count);
  ctx.fillStyle = 'white';
  ctx.fillRect(0,44,640,685);
  return false;
}

//円の描画
function circ(color,x,y){
  if(color==W){
	ctx.fillStyle="white";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),85+80*(y+1),36,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==R){
	ctx.fillStyle="red";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),85+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==G){
	ctx.fillStyle="green";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),85+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==B){
	ctx.fillStyle="blue";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),85+80*(y+1),35,0,Math.PI*2,false);
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
      if(ques[i][j]==W){
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

function answer(){
  for(let i=0;i<6;i++){
    for(let j=0;j<6;j++){
      if(ans[i][j]!=ques[i][j]){
        return false;
      }
    }
  }
  return true;
}

borad();
timer();

//開発用チート
function cheat(){
  for(let i=0;i<6;i++){
    console.log(ans[0][i],ans[1][i],ans[2][i],ans[3][i],ans[4][i],ans[5][i]);
  }
}
//cheat();

//game start
document.getElementById('start').onclick = function(){
  flg=start();
}
//game pause
document.getElementById('pause').onclick = function(){
  flg=pause();
}
//answer
document.getElementById('answer').onclick = function(){
  const start_button = document.getElementById("start");
  const pause_button = document.getElementById("pause");
  const answer_button = document.getElementById("answer");
  //alertでダイアログ表示
  if(answer()==false){
    alert('不正解');
  }else{
    flg=pause();
    disp();
    borad();
    question();
    start_button.disabled = "disabled";
    pause_button.disabled = "disabled";
    answer_button.disabled = "disabled";
    alert('正解');
  }
}

  // クリックイベントの登録
  canvas.onclick = function(e) {
    // 一度描画をクリア
    //ctx.clearRect(0, 0, canvasW, canvasH);
    // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - Math.floor(rect.left) - 2;
    mouseY = e.clientY - Math.floor(rect.top) - 2;
    px=Math.floor(mouseX/80)-1;
    py=Math.floor((mouseY-100)/80);

    // クリック位置を中心に円を描画
      if(0<=px&&px<=5&&0<=py&&py<=5&&0<limit&&flg==true){
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
        question();
      }
  };
};
