//レンダリング
let fragment=document.createDocumentFragment();
let tbl=document.getElementById("board");
let tbo=document.createElement('tbody');
let div=document.createElement("div");
let width=67,height=27;
let table=tbl.appendChild(tbo);

for(let i=0;i<height-2;i++){
    let tr=document.createElement('tr');
    for(let j=0;j<width-2;j++){
        let td=document.createElement('td');
        tr.appendChild(td);
    }
    fragment.appendChild(tr);
}
table.appendChild(fragment);
//下準備
let maze=[],cost=[],v=[0,1,2,3];
let px=2*(getRandomInt((height-5)/2)+1),py=2*(getRandomInt((width-5)/2)+1);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(lendata){
    let a=lendata.length;
    for(let i=0;i<a;i++){
        let j=getRandomInt(a);
        let tmp=lendata[i];
        lendata[i]=lendata[j];
        lendata[j]=tmp;
    }
}

function vec(p){
    return [Math.round(Math.cos(p*Math.PI / 2)),Math.round(Math.sin(p*Math.PI / 2))];
}

function check(x,y){
    for(let i=0;i<4;i++){
        [w,h]=vec(i);
        if(maze[x+2*w][y+2*h]==-1){
            return true;
        }
    }
    return false;
}

function dig(x,y,r){
    [w,h]=vec(r);
    for(let i=0;i<2;i++){
        x+=w;
        y+=h;
        maze[x][y]=0;
    }
    list.push([x,y]);
    return [x,y];
}
//配列初期化
for(let i=0;i<height;i++){
    maze[i]=[];
    cost[i]=[];
}

for(let i=0;i<height;i++){
    for(let j=0;j<width;j++){
        maze[i][j]=0;
        if(0<i&&i<height-1&&0<j&&j<width-1){
            maze[i][j]=-1;
        }
    }
}
//迷路生成
let list=[],vl=[],i=0,j=0;
maze[px][py]=0;
list.push([px,py]);
let k=list.length-1;
while(true){
    while(check(list[k][0],list[k][1])==false && 0<k){
        k--;
        list.pop();
    }
    //ここにシャッフル入れる？
    px=list[k][0];
    py=list[k][1];
    if(i!=0&&k==0){
        break;
    }
    while(check(px,py)==true){
        shuffle(v);
        vl=vec(v[j]);
        while(maze[px+2*vl[0]][py+2*vl[1]]==0 && j<3){
            j++;
            vl=vec(v[j]);
        }
        vl=dig(px,py,v[j]);
        px=vl[0];
        py=vl[1];
        j=0;
        k=list.length-1;
    }
    i++;
}
//ゴールどうするか
let count=0,back_list=[],g_list=[],max=0,gx,gy,sx,sy;
sx=list[0][0];
sy=list[0][1];
maze[sx][sy]=-2;
for(let i=0;i<height;i++){
    for(let j=0;j<width;j++){
        cost[i][j]=maze[i][j];
    }
}

while(true){
    while(search(sx,sy)||count==0){
        for(let i=0;i<4;i++){
            vl=vec(i);
            if(cost[sx+vl[0]][sy+vl[1]]==0 && cost[sx+2*vl[0]][sy+2*vl[1]]==0){
                count+=2;
                sx+=2*vl[0];
                sy+=2*vl[1];
                cost[sx][sy]=count;
                break;
            }
        }
    }
    try {
        vl=back_list.pop();
        sx=vl[0];
        sy=vl[1];
        count=cost[sx][sy];
    } catch (TypeError) {
        break;
    }
}


function search(x,y){
    let l=[],cou=0,b=0;
    for(let i=0;i<4;i++){
        l=vec(i);
        if(cost[x+l[0]][y+l[1]]==-1){
            cou++;
        }
        if(cost[x+l[0]][y+l[1]]==0&&cost[x+2*l[0]][y+2*l[1]]==0){
            b++;
        }
    }
    if(1<b){
        back_list.push([x,y]);
    }
    if(cou==3){
        g_list.push([x,y]);
        return false;
    }else{
        return true;
    }
}
//検討の余地あり
for(let i=0;i<g_list.length-1;i++){
    x=g_list[i][0];
    y=g_list[i][1];
    if(max<cost[x][y]){
        max=cost[x][y];
        gx=x;
        gy=y;
    }
}

//迷路表示,スタート
let n,cl=document.getElementsByTagName('td');
sx=list[0][0];
sy=list[0][1];
w=sx;
h=sy;
maze[sx][sy]=-2;
cl[(width-2)*(sx-1)+(sy-1)].appendChild(div).textContent='S';
cl[(width-2)*(gx-1)+(gy-1)].textContent='G';
//迷路表示
function display_maze(){
    document.getElementsByTagName('div')[2].classList.add("player");
    for(let i=1;i<height-1;i++){
        for(let j=1;j<width-1;j++){
            //スタートからゴールまでのコスト表示
            /*
            if(0<cost[i][j]&&cost[i][j]<max){
                cl[(width-2)*(i-1)+(j-1)].textContent=String(cost[i][j]);
            }
            */
            if(maze[i][j]==-1){
                cl[(width-2)*(i-1)+(j-1)].classList.add("wall");
            }else if(maze[i][j]==0||maze[i][j]==-2){
                cl[(width-2)*(i-1)+(j-1)].classList.add("path");
            }
        }
    }
}
//迷路非表示
function clear_maze(){
    document.getElementsByTagName('div')[2].classList.remove("player");
    for(let i=1;i<height-1;i++){
        for(let j=1;j<width-1;j++){
            if(maze[i][j]==-1){
                cl[(width-2)*(i-1)+(j-1)].classList.remove("wall");
            }else{
                cl[(width-2)*(i-1)+(j-1)].classList.remove("path");
            }
        }
    }
}

//キー操作
function move(){
    let target=document.getElementsByTagName('div')[2];
    maze[w][h]=0;
    t=document.getElementsByTagName('div')[2].textContent;
    target.parentNode.removeChild(target);
    cl[(width-2)*(w-1)+(h-1)].textContent=t;
    div=document.createElement("div");
}
let t;
window.addEventListener('DOMContentLoaded',function(){
    window.addEventListener("keypress",function(e){
        if(event.key==='w'&&maze[w-1][h]>-1&&flg==true){
            maze[w-1][h]=maze[w][h];
            move();
            --w;
        }else if(event.key==='s'&&maze[w+1][h]>-1&&flg==true){
            maze[w+1][h]=maze[w][h];
            move();
            ++w;
        }else if(event.key==='a'&&maze[w][h-1]>-1&&flg==true){
            maze[w][h-1]=maze[w][h];
            move();
            --h;
        }else if(event.key==='d'&&maze[w][h+1]>-1&&flg==true){
            maze[w][h+1]=maze[w][h];
            move();
            ++h;
        }
        if(cl[(width-2)*(w-1)+(h-1)].textContent=='' && maze[w][h]>-1 && flg==true){
            cl[(width-2)*(w-1)+(h-1)].appendChild(div);
            document.getElementsByTagName('div')[2].classList.add("player");
        }else if(flg==true){
            t=cl[(width-2)*(w-1)+(h-1)].textContent
            cl[(width-2)*(w-1)+(h-1)].innerHTML='';
            cl[(width-2)*(w-1)+(h-1)].appendChild(div).textContent=t;
            document.getElementsByTagName('div')[2].classList.add("player");
        }
    });
});

function stop(){
    flg=false;
    document.getElementsByTagName("div")[1].classList.remove("blink");
    clearInterval(timer);
    start_button.disabled = "disabled";
    pause_button.disabled = "disabled";
}

//カウントダウン
let time=document.getElementsByClassName("time"),limit=90000,timer=0,flg=false;
const start_button = document.getElementById("start");
const pause_button = document.getElementById("pause");
function countdown(){
    let min=Math.floor(limit/1000/60);
    let sec=Math.floor(limit/1000)%60;
    let ms=limit%1000;
    time[0].textContent=String(min)+",";
    time[1].textContent=String(sec).padStart(2,"0")+",";    
    time[2].textContent=String(ms).padStart(3,"00");
    if(w==gx&&h==gy){
        stop();
        alert("Clear!");
    }else if(30000>=limit && limit>10000){
        document.getElementsByTagName("div")[1].classList.add("red");
        limit-=100;
    }else if(10000>=limit && limit>0){
        document.getElementsByTagName("div")[1].classList.add("blink");
        limit-=100;
    }else if(limit>30000){
        limit-=100;
    }else if(limit==0){
        stop();
        alert("Game Over!")
    }
}
//ボタン操作
countdown();
document.getElementById('start').onclick=function(){
    flg=true;
    display_maze();
    timer=setInterval(countdown,100);
}
document.getElementById('pause').onclick=function(){
    flg=false;
    clear_maze();
    clearInterval(timer);
}