let boxes = document.querySelectorAll(".box");   /*that is acually an ARRAY of all boxes V.V. IMP*/

let turn0 = true; /*that is first turn is of 0 always*/
let winO=0;
let winX=0;

// Initialize scores in localStorage
if (JSON.parse(localStorage.getItem("winX"))) {
    document.getElementById("cross-score").innerHTML=localStorage.getItem('winX');
}

if (JSON.parse(localStorage.getItem("winO"))) {
    document.getElementById("nut-score").innerHTML=localStorage.getItem('winO');
}


const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "o";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        winner();
    })
})
function winner(){
    winningPatterns.forEach((pattern)=>{   /*to array winningPatterns values syntax:winningPatterns[0] and console.log(pattern);=>gives all subarrays od winningpattern
        console.log(pattern[0],pattern[1],pattern[2]);   this will print values inside subarray.
        console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);  innertext gives actual value present inside.*/ 
        pos1=boxes[pattern[0]].innerText;
        pos2=boxes[pattern[1]].innerText;
        pos3=boxes[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("winner");
                document.querySelector(".winner-symbol").innerHTML= pos1;   /*displays values got from JS to html/screen.  */
                document.getElementById("winner-div").style.display="flex";
                document.getElementById("game-board").style.display="none";
                document.getElementById("score-board").style.display="none";
                if(pos1==="X"){
                    winX++;
                    console.log(winX);
                    JSON.stringify(localStorage.setItem("winX",winX));
                    turn0=true;
                }
                else{
                    winO++;
                    console.log(winO);
                    JSON.stringify(localStorage.setItem("winO",winO));
                    turn0=true;
                }
            };
            
        }
        
    })
}
function reset(){
    boxes.forEach((box) => {
        box.innerText="";
        box.disabled=false;
    });
    document.getElementById("winner-div").style.display="none";
    document.getElementById("game-board").style.display="flex";
    document.getElementById("score-board").style.display="flex";
    document.getElementById("cross-score").innerHTML=JSON.parse(localStorage.getItem('winX'));
    document.getElementById("nut-score").innerHTML=JSON.parse(localStorage.getItem('winO'));
}