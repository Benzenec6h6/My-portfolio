document.write("<p>読み込みテスト</p>");

const cs = document.createElement('canvas');
const ctx = cs.getContext('2d');

cs.width ='650';
cs.height='700';

document.body.appendChild(cs);

const W=0,R=1,G=2,B=3;
let posx=-1,posy=-1;
let ans=[],r=[],g=[],b=[];

for(let i=0;i<6;i++){
  ans[i]=[];
}

for(let i=0;i<6;i++){
  for(let j=0;j<6;j++){
    ans[i][j]=0;
  }
  r[i]=i;
  g[i]=i;
  b[i]=i;
}

function borad(){
  ctx.strokeStyle = 'black';

  for(let i=0;i<6;i++){
  	for(let j=0;j<8;j++){
  	  ctx.strokeRect(80*(i+1),80*j,80,80);
  	}
  	ctx.strokeRect(0,80*(i+1),80,80);
	ctx.strokeRect(560,80*(i+1),80,80);
  }
}
  
function circ(color,x,y){
  if(color==R){
	ctx.fillStyle="red";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),40+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==G){
	ctx.fillStyle="green";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),40+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
  if(color==B){
	ctx.fillStyle="blue";
	ctx.beginPath();
	ctx.arc(40+80*(x+1),40+80*(y+1),35,0,Math.PI*2,false);
	ctx.fill();
  }
}

function answer(){
  for(let i=0;i<6;i++){
    for(let j=0;j<6;j++){
      if(ans[i][j]==R){
        circ(R,i,j);
      }
      if(ans[i][j]==G){
        circ(G,i,j);
      }
      if(ans[i][j]==B){
        circ(B,i,j);
      }
    }
  }
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

function check(){
  let n=0;
  for(let i=0;i<6;i++){
    for(let j=0;j<6;j++){
      n+=ans[i][j];
    }
  }
  if(n==36){
    return true;
  }else{
    return false;
  }
}

borad();
//shuffle();
//answer();
//disp();


