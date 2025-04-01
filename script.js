let statusText = document.querySelector("#status");
let restartBtn = document.querySelector("#restart");
let newStartBtn = document.querySelector("#newstart");
let boxes = document.querySelectorAll(".box");
let childOfX = document.querySelectorAll(".childX");
let childOfO = document.querySelectorAll(".childO");
let turnO = true;
let countO = 1;
let countX = 1;
let winnerStatus = document.querySelectorAll(".winner-animate");
const winnigPatter = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

boxes.forEach((box)=> {

    box.addEventListener("click" , () => {
        if (turnO) 
        {
                box.textContent = "O";
                statusText.innerText = "Player X'S Turn";
                turnO = false;    
            }
            else{ 
                box.textContent = "X";
                statusText.innerText = "Player O'S Turn";
                turnO = true;
        }
        box.classList.add('disabled');
        box.style.pointerEvents = 'none';

        checkWinner();
    });
});

const disableBox = () => {
    for(let box of boxes)
    {
        box.add = 'disabled';
        box.style.pointerEvents = "none";
    }
};

const enabled = () => {
    for(let box of boxes)
    {
        box.textContent = "";
            box.style.pointerEvents = "auto";
    }
};

const checkWinner= () => {

    for(let pattern of winnigPatter)
    {
        let pos1Vlaue = boxes[pattern[0]].innerText;
        let pos2Vlaue = boxes[pattern[1]].innerText;
        let pos3Vlaue = boxes[pattern[2]].innerText;

        if(pos1Vlaue != "" && pos2Vlaue != "" && pos3Vlaue != "")
        {
            if (pos1Vlaue === pos2Vlaue && pos2Vlaue === pos3Vlaue) 
            {
                    statusText.innerText = `${pos1Vlaue}'s Player Get +1 point.`;
                    statusText.style.textShadow = "0 0 15px #ff0044";
                    statusText.style.fontStyle = "italic";
                    
                    disableBox();
                    // console.log(pos1Vlaue);

                    if (pos1Vlaue === "O") 
                    {
                            turnO = true;    
                    } else {
                        turnO = false;    
                        
                    }
                    pointInput(pos1Vlaue);
                    
            }
        }

    }
};
const reset = () => {
    enabled();
    statusText.innerText = turnO ? "Player O'S Turn" : "Player X'S Turn";
}
restartBtn.addEventListener("click" , reset);
newStartBtn.addEventListener("click", () => {
    reset(); 
    countO = 1;
    countX = 1;

   
    childOfO.forEach((child) => {
        child.innerText = "";
        child.style.width = "50px";  
        child.style.fontSize = "1rem";
        child.style.opacity = "0.5"; 
        child.classList.add(".zoom");
    });

    childOfX.forEach((child) => {
        child.innerText = "";
        child.style.width = "50px";  
        child.style.fontSize = "1rem";
        child.style.opacity = "0.5"; 
        child.classList.add(".zoom");

    });

    restartBtn.disabled = false;
    restartBtn.style.opacity = "1";
    statusText.classList.remove("winner-animate");

});



const pointInput =(check) => {

    if (check === 'O') 
    {
                childOfO[5 - countO].innerText = 'O';
                childOfO[5 - countO].style.width = "100px";
                childOfO[5 - countO].style.fontSize = "8rem";
                childOfO[5 - countO].style.opacity = "1";
                countO++;
                if (countO === 6) 
                {
                        statusText.innerText = "🎉 Player O Wins!";
                        statusText.classList.add("winner-animate");

                        disableBox();
                        restartBtn.disabled = true;
                        restartBtn.style.opacity = "0.2";
                }  
    } else {

                childOfX[5 - countX].innerText = 'X';
                childOfX[5 - countX].style.width = "100px";
                childOfX[5 - countX].style.opacity = "1";
                countX++;

                if (countX === 6) 
                {
                        statusText.innerText = "🎉 Player X Wins!";
                        statusText.classList.add("winner-animate");
                        
                        disableBox();
                        restartBtn.disabled = true;
                        restartBtn.style.opacity = "0.2";
                }
        
    }
}