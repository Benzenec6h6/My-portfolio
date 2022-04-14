//wingdingsフォント
//console.log("Loading");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const canvasArea = document.querySelector('myCanvas');
let x=0,y=0,c=1;
const B=1,W=-1,WA=2;

//初期化
let board = new Array(10);
let reverse = new Array(10);
let vec = new Array(10);
for(let i = 0; i < 10; i++){
  board[i] = new Array(10);
  reverse[i] = new Array(10);
  vec[i] = new Array(10);
  for(let j = 0; j < 10; j++){
    board[i][j] = 0;
    vec[i][j] = 0;
    reverse[i][j] = false;
  }
}

for(let i=0;i<10;i++){
  board[0][i]=WA;
  board[i][0]=WA;
  board[i][9]=WA;
  board[9][i]=WA;
}

board[4][5]=B;
board[5][4]=B;
board[4][4]=W;
board[5][5]=W;

gameboard();
reversible(c);
disp();
turn();

//ゲームボード
//描画
function gameboard(){
  ctx.beginPath();
  ctx.rect(0,0,649,649);
  ctx.fillStyle ="rgb(0,0,0)";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      ctx.rect(81*i+1,81*j+1, 80, 80);
      ctx.fillStyle ="rgb(0,255,0)";
      ctx.fill();
    }
  }
  ctx.closePath();
}

//駒
function koma(x,y,c){
  if(c==B){
    ctx.beginPath();
    ctx.arc(81*x+41,81*y+41, 38, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
    ctx.fillStyle = "rgb(0,0,0)" ;
    ctx.closePath();
    ctx.fill() ;
  }
  if(c==W){
    ctx.beginPath();
    ctx.arc(81*x+41,81*y+41,38,0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
    ctx.fillStyle = "rgb(255,255,255)" ;
    ctx.closePath();
    ctx.fill();
  }
}

//マウス操作
let element = document.getElementById("myCanvas");
//ｸﾘｯｸで座標取得
element.onmousedown = function (e){
  x=e.clientX;
  y=e.clientY;
  x=Math.floor(x/80)+1;
  y=Math.floor((y-82)/80)+1;
  if(board[x][y]==0&&reverse[x][y]==true&&skip(c)==c){
    board[x][y]=c;
    rev(x,y);
    c*=-1;
    reset();
    reversible(c);
    gameboard();  
    disp();
    turn();
  }
  if(skip(c)!=c){
    c*=-1;
    reset();
    reversible(c);
    gameboard();  
    disp();
    turn();
  }
};

//ゲーム盤表示
function disp(){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(board[i+1][j+1]==W){
        koma(i,j,W);
      }
      if(board[i+1][j+1]==B){
        koma(i,j,B);
      }
      if(reverse[i+1][j+1]==true){
        ctx.beginPath();
        ctx.rect(81*i+1,81*j+1, 80, 80);
        ctx.fillStyle ="rgba(0,0,255,0.5)";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//探す
//k=0,右 K=1,右上 K=2,上
function reversible(t){
  let m=0,n=0;
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(board[i+1][j+1]==t){
        for(let k=0;k<8;k++){
          m=i+1+xvec(k);
          n=j+1+yvec(k);
          while(board[m][n]==t*-1){
            m+=xvec(k);
            n+=yvec(k);
            if(board[m][n]==0){
              reverse[m][n]=true;
              //8段目のときvecが入力されていない。
              vec[m][n]|=2**((k+4)%8);
              break;
            }
            if(board[m][n]==t||board[m][n]==2){
              break;
            }
          }
        }
      } 
    }
  }
}

//ひっくり返す
function rev(px,py){
  let m,n,l,dir=vec[px][py];
  for(i=0;i<8;i++){
    l=2**i&dir;
    if(l==2**i){
      console.log(2**i&dir);
      m=px+xvec(i);
      n=py+yvec(i);
      while(board[m][n]==c*-1){
        board[m][n]*=-1;
        m+=xvec(i);
        n+=yvec(i);
        if(board[m][n]!=c*-1){
          break;
        }
      }
    }
  }
}

function xvec(n){
  return (Math.round(Math.cos(Math.PI*n/4)));
}
function yvec(n){
  return (Math.round(Math.sin(Math.PI*n/4)));
}

function skip(t){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(reverse[i][j]==true){
        return t;
      }
    }
  }
  reset();
  t*=-1;
  reversible(t);
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(reverse[i][j]==true){
        return t;
      }
    }
  }
  return false;
}

function end(){
  
}

//黒番と白番の動作
function turn(){
  if(c==1){
    ctx.fillStyle='black';
    ctx.font = "40px serif";
    ctx.clearRect(650, 0, 300, 40);
    ctx.fillText('黒のターン',650, 35);
  }else{
    ctx.fillStyle='black';
    ctx.font = "40px serif";
    ctx.clearRect(650, 0, 300, 40);
    ctx.fillText('白のターン',650, 35);
  }
}

function reset(){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      vec[i+1][j+1] = 0;
      reverse[i+1][j+1] = false; 
    }
  }  
}
