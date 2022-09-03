const selectBox = document.querySelector(".select-box"),
selectSBtn = selectBox.querySelector(".playerS"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelectorAll(".players"),
resultBox = document.querySelectorAll(".result-box"),
wonText = resultBox.querySelectorAll(".won-text"),
replayBtn = resultBox.querySelectorAll("button");


window.onload =()=>{
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clikedBox(this)");
    }
    selectSBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    };
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    };

}
let playerSIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign="S";
let runBot=true;

function clickedBox(element){
   if(players.classList.contains("player")){

    element.innerHTML = `<i class="${playerOIcon}></i>`;
    players.classList.remove("active");
    playerSign="O";
    element.setAttribute("id",playerSign);
   }
   else{
    element.innerHTML = `<i class="${playerSIcon}></i>`;
    players.classList.add("active");
    element.setAttribute("id",playerSign);
   }
   selectWinner();
   playBoard.style.pointerEvents="none";
   element.style.pointerEvents="none";
   let randomDelayTime=((Math.random()*1000)+200).toFixed();
   setTimeout(()=>{
     bot(runBot);
   }, randomDelayTime);
}
function bot(runBot){
    let array=[];
    if(runBot){
        playerSign="O";
    for(let i=0;i< allBox.length;i++){
        if(allBox[i].childElementCount==0){
            array.push(i);
            
        }
    }
    let randomBox=array[Math.floor(Math.random()* array.length)];
    if(array.length>0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<i class="${playerSIcon}></i>`;
            players.classList.add("active");
            playerSign="S";
            allBox[randomBox].setAttribute("id",playerSign);
           }else{
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}></i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",playerSign);
           }
           selectWinner();
    }
    
   allBox[randomBox].style.pointerEvents="none";
   playBoard.style.pointerEvents="auto";
   playerSign="S";
}
}
function getIdVal(classname){
    return document.querySelector(".box"+ idname).id;
}
function checkIdSign(val1,val2,val3,sign){
    if(getIdVal(val1)== sign && getIdVal(val2)== sign && getIdVal(val3)== sign){
       return true;
    }
}
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6,playerSign) || checkIdSign(6,7,8,playerSign) ||checkIdSign(1,4,7,playerSign )||checkIdSign(2,5,8,playerSign)|| checkIdSign(3,6,9,playerSign)||checkIdSign(1,5,9,playerSign)||checkIdSign(3,5,7,playerSign)) {
        runBot= false;
        bot(runBot);
        setTİmeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700);
        wonText.innerHTML=`Player <p>${playerSign}</p> won the game!`;

    }else{
        if(getIdVal(1)!=""&& getIdVal(2)!=""&& getIdVal(2)!=""&& getIdVal(3)!=""&&getIdVal(4)!=""&&getIdVal(5)!=""&&getIdVal(6)!=""&&getIdVal(7)!=""&&getIdVal(8)!=""&&getIdVal(9)!=""){
            runBot= false;
        bot(runBot);
        setTİmeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700);
        wonText.textContent=`Match has been drawn!`;

        }
    }
}
replayBtn.onclick=()=>{
 window.location.reload();
}