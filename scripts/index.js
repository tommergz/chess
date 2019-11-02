function drawBoard(){
    let board = document.getElementById("chessboard");
    let color = [
        "#526e52",
        "#dddddd"
    ] 
    let count = 1;  
    for(let i=0; i<8; i++){
        
        let x;
        for(let j=0; j<8; j++){
            if (count%2 === 0) {
                x = 0;
            }
            else {
                x = 1;
            }
            board.rows[i].cells[j].style.backgroundColor = color[x];
            if (j !== 7) {
                count++;
            }
            else {
                count +=2;
            }
        }
    }
}        
drawBoard()       


let chessBoard = document.getElementById("chessboard");
let possibleMoves = [];
let color = true;
let choosenFigure = null;
let check = false;
let allPossibleMoves = [];

let p1White = document.getElementById('p1-white');
p1White.time = 0;
let p2White = document.getElementById('p2-white');
p2White.time = 0;
let p3White = document.getElementById('p3-white');
p3White.time = 0;
let p4White = document.getElementById('p4-white');
p4White.time = 0;
let p5White = document.getElementById('p5-white');
p5White.time = 0;
let p6White = document.getElementById('p6-white');
p6White.time = 0;
let p7White = document.getElementById('p7-white');
p7White.time = 0;
let p8White = document.getElementById('p8-white');
p8White.time = 0;

let p1Black = document.getElementById('p1-black');
p1Black.time = 0;
let p2Black = document.getElementById('p2-black');
p2Black.time = 0;
let p3Black = document.getElementById('p3-black');
p3Black.time = 0;
let p4Black = document.getElementById('p4-black');
p4Black.time = 0;
let p5Black = document.getElementById('p5-black');
p5Black.time = 0;
let p6Black = document.getElementById('p6-black');
p6Black.time = 0;
let p7Black = document.getElementById('p7-black');
p7Black.time = 0;
let p8Black = document.getElementById('p8-black');
p8Black.time = 0;

let r1White = document.getElementById('r1-white');
let r2White = document.getElementById('r2-white');
let r1Black = document.getElementById('r1-black');
let r2Black = document.getElementById('r2-black');

let kn1White = document.getElementById('kn1-white');
let kn2White = document.getElementById('kn2-white');
let kn1Black = document.getElementById('kn1-black');
let kn2Black = document.getElementById('kn2-black');

let b1White = document.getElementById('b1-white');
let b2White = document.getElementById('b2-white');
let b1Black = document.getElementById('b1-black');
let b2Black = document.getElementById('b2-black');

let qWhite = document.getElementById('q-white');
let qBlack = document.getElementById('q-black');

let kWhite = document.getElementById('k-white');
let kBlack = document.getElementById('k-black');

let whiteArr = [
    p1White, p2White, p3White, p4White, p5White, p6White, p7White, p8White,
    r1White, r2White, kn1White, kn2White, b1White, b2White, qWhite, kWhite   
]

let blackArr = [
    p1Black, p2Black, p3Black, p4Black, p5Black, p6Black, p7Black, p8Black,
    r1Black, r2Black, kn1Black, kn2Black, b1Black, b2Black, qBlack, kBlack
]

let pwnsWhite = [p1White, p2White, p3White, p4White, p5White, p6White, p7White, p8White]
////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ (БЕЛЫЕ ПЕШКИ)
pwnsWhite.forEach(p => {
    p.steps = function(i, j, arr) {
        let point = i;
        i-=1;
        if (this.time > 0) {
            point +=1;
        }
        while (i > point-3) {
            let newTarget = chessBoard.rows[i].cells[j];
            let leftTarget = chessBoard.rows[i].cells[j-1];
            let rightTarget = chessBoard.rows[i].cells[j+1];
            if (leftTarget) {
                if (leftTarget.childNodes[0]) {
                    if (leftTarget.childNodes[0].classList[1] !== "white") {
                        arr.push(leftTarget)
                    }
                }
            }
            if (rightTarget) {
                if (rightTarget.childNodes[0]) {
                    if (rightTarget.childNodes[0].classList[1] !== "white") {
                        arr.push(rightTarget)
                    }
                }
            }
            if (this === leftPass) {
                arr.push(chessBoard.rows[leftPass.parentNode.parentNode.rowIndex -1].cells[leftPass.parentNode.cellIndex -1] );
            }
            if (this === rightPass) {
                arr.push(chessBoard.rows[rightPass.parentNode.parentNode.rowIndex -1].cells[rightPass.parentNode.cellIndex +1] );
            }
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    break;
                }
            }
            i--;
        }
    }
    
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ (БЕЛЫЕ ПЕШКИ)

let pwnsBlack = [p1Black, p2Black, p3Black, p4Black, p5Black, p6Black, p7Black, p8Black]

////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ (ЧЕРНЫЕ ПЕШКИ)
pwnsBlack.forEach(p => {
    p.steps = function(i, j, arr) {
        let point = i;
        i+=1;
        if (this.time > 0) {
            point -=1;
        }
        while (i < point+3) {
            let newTarget = chessBoard.rows[i].cells[j];
            let leftTarget = chessBoard.rows[i].cells[j-1];
            let rightTarget = chessBoard.rows[i].cells[j+1];
            if (leftTarget) {
                if (leftTarget.childNodes[0]) {
                    if (leftTarget.childNodes[0].classList[1] !== "black") {
                        arr.push(leftTarget)
                    }
                }
            }
            if (rightTarget) {
                if (rightTarget.childNodes[0]) {
                    if (rightTarget.childNodes[0].classList[1] !== "black") {
                        arr.push(rightTarget)
                    }
                }
            }
            if (this === leftPass) {
                arr.push(chessBoard.rows[leftPass.parentNode.parentNode.rowIndex +1].cells[leftPass.parentNode.cellIndex +1] );
            }
            if (this === rightPass) {
                arr.push(chessBoard.rows[rightPass.parentNode.parentNode.rowIndex +1].cells[rightPass.parentNode.cellIndex -1] );
            }
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    break;
                }
            }

            i++;
        }
    }
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ (ЧЕРНЫЕ ПЕШКИ)

//////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ ЛАДЬИ
let rooks = [r1White, r2White, r1Black, r2Black]
rooks.forEach(el => {
    el.steps = function(i, j, arr) {
        let rememberI = i;
        let rememberJ = j;
        while (i > 0) {
            i-=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                    break;
                } 
            }
        }   
        i = rememberI; 
        while (i < 7) {
            i+=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)                    
                    }
                    break;
                } 
            }
        }
        i = rememberI; 
        while (j > 0) {
            j-=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                    break;
                } 
            }
        }   
        j = rememberJ; 
        while (j < 7) {
            j+=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)                    
                    }
                    break;
                } 
            }
        }
    }
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ ЛАДЬИ
//////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ СЛОНА
let bishops = [b1White, b2White, b1Black, b2Black]
bishops.forEach(el => {
    el.steps = function(i, j, arr) {
        let rememberI = i;
        let rememberJ = j;
        while (i > 0 && j >0) {
            i-=1;
            j-=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                    break;
                } 
            }
        }   
        i = rememberI; 
        j = rememberJ;
        while (i < 7 && j < 7) {
            i+=1;
            j+=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)                    
                    }
                    break;
                } 
            }
        }
        i = rememberI; 
        j = rememberJ;
        while (i < 7 && j > 0) {
            i+=1;
            j-=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                    break;
                } 
            }
        }   
        i = rememberI; 
        j = rememberJ;
        while (i > 0 && j < 7) {
            i-=1;
            j+=1;
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)                    
                    }
                    break;
                } 
            }
        }
    }
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ СЛОНА

//////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ КОРОЛЕВЫ
let queens = [qWhite, qBlack]
queens.forEach(el => {
    el.steps = function(i,j,arr) {
        r1White.steps.call(el, i, j, arr);
        b1White.steps.call(el, i, j, arr);
    } 
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ КОРОЛЕВЫ


//////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ КОНЯ
let knights = [kn1White, kn2White, kn1Black, kn2Black]
knights.forEach(el => {
    el.steps = function(i, j, arr) {
        let rememberI = i; 
        let rememberJ = j;
        i +=2;
        j -=1;

        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
        i = rememberI;
        j = rememberJ;
        i +=2;
        j +=1;
        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
        i = rememberI;
        j = rememberJ;
        i -=2;
        j -=1;
        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
        i = rememberI;
        j = rememberJ;
        i -=2;
        j +=1;
        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
        i = rememberI;
        j = rememberJ;
        i -=1;
        j +=2;

        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            let newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
        i = rememberI;
        j = rememberJ;
        i +=1;
        j +=2;
        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
        i = rememberI;
        j = rememberJ;
        i -=1;
        j -=2;
        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
        i = rememberI;
        j = rememberJ;
        i +=1;
        j -=2;
        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
            newTarget = chessBoard.rows[i].cells[j];
            if (newTarget) {
                if (!newTarget.childNodes.length) {
                    arr.push(newTarget)
                }               
                else {
                    if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {
                        arr.push(newTarget)
                    }
                } 
            }
        }
    } 
    
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ КОНЯ

/////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ КОРОЛЯ
let kings = [kWhite, kBlack]
kings.forEach(el => {
    el.steps = function(i,j, arr) {
        let newTarget;
        let rememberI = i;
        let rememberJ = j;
        i -=1;             
        for (i; i < rememberI + 2; i++) {
            j = rememberJ;
            j -=1;
            for (j; j < rememberJ+ 2; j++) {
                if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
                    newTarget = chessBoard.rows[i].cells[j];
                    if (newTarget) {
                        if (!newTarget.childNodes.length) {
                            arr.push(newTarget)
                        }               
                        else {
                            if (newTarget.firstChild.className.slice(0,12) !== choosenFigure.className.slice(0,12)) {

                                arr.push(newTarget)
                            }
                        } 
                    }
                }
            
            }
            
        }       
    } 
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ КОРОЛЯ

function whiteCheck(figure) {
    let arr;
    color ? arr = whiteArr : arr = blackArr;
    arr.forEach(el => {
        el
    });  
        
}

function turn(color) {
    if (color) {
        chessBoard.classList.add("turn");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                chessBoard.rows[i].cells[j].classList.add("turn");
            }
        }
    }
    else {
        chessBoard.classList.remove("turn");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                chessBoard.rows[i].cells[j].classList.remove("turn");
            }
        }
    }
    
}

let leftPass = 0;
let rightPass = 0;

document.getElementById("chessboard").addEventListener('click', () => {
    let cell = event.target;
///////////////////////ХОДЫ    
    if (color) {
        if (cell.tagName.toLowerCase() === 'td' && choosenFigure) {
            if (choosenFigure.tagName === 'TD') {
                return;
            }
            if (possibleMoves.indexOf(cell) != -1) {
                let passLeft = 0;
                let passRight = 0;
                if (choosenFigure === p1White || choosenFigure === p2White || choosenFigure === p3White || choosenFigure === p4White || choosenFigure === p5White || choosenFigure === p6White || choosenFigure === p7White || choosenFigure === p8White) {
                    if (choosenFigure === leftPass) {
                        passLeft = 1;
                    }
                    if (choosenFigure === rightPass) {
                        passRight = 1;
                    }
                    leftPass = 0;
                    rightPass = 0;
                    if (choosenFigure === p1White || choosenFigure === p2White || choosenFigure === p3White || choosenFigure === p4White || choosenFigure === p5White || choosenFigure === p6White || choosenFigure === p7White || choosenFigure === p8White) {
                        if (choosenFigure.time === 0) {
                            choosenFigure.time = 1;
                        }
                    }
    //////////////////////ВЗЯТИЕ НА ПРОХОДЕ (ПРОВЕРКА ДЛЯ ЧЕРНЫХ)
                    let i = cell.parentNode.rowIndex;
                    let j = cell.cellIndex;
                    if (i - choosenFigure.parentNode.parentNode.rowIndex === -2 && choosenFigure.parentNode.cellIndex !=0) {
                        let firstChild = chessBoard.rows[i].cells[j-1].firstChild;
                        if (firstChild) {
                            if (firstChild.className.slice(7,16) === "black pwn") {
                                leftPass = firstChild;
                            }
                        }
                    }    
                    if (i - choosenFigure.parentNode.parentNode.rowIndex === -2 && choosenFigure.parentNode.cellIndex !=7) {
                        let firstChild = chessBoard.rows[i].cells[j+1].firstChild;
                        if (firstChild) {
                            if (firstChild.className.slice(7,16) === "black pwn") {
                                rightPass = firstChild;
                            }
                        }
                    }   
    //\\\\\\\\\\\\\\\\\\\\\ВЗЯТИЕ НА ПРОХОДЕ (ПРОВЕРКА ДЛЯ ЧЕРНЫХ)
                }   

                cell.appendChild(choosenFigure);
//////////////////////ВЗЯТИЕ НА ПРОХОДЕ (БЕЛЫЕ)
                if (passLeft === 1 || passRight === 1) {
                    let isItPass = chessBoard.rows[cell.parentNode.rowIndex +1].cells[cell.cellIndex] 
                    if (isItPass.firstChild) {
                        if (isItPass.firstChild.className.slice(7,16) === "black pwn") {
                            blackArr = blackArr.filter((el) => el !== isItPass.firstChild);
                            isItPass.removeChild(isItPass.firstChild);                           
                        }
                    }
                }
//////////////////////ВЗЯТИЕ НА ПРОХОДЕ (БЕЛЫЕ)                  
                                  
                setTimeout(turn, 500, color); 
                color = !color;
            }           
        }
        
        if (cell.className.slice(7,12) === 'black' && choosenFigure) {
            cell = cell.parentNode;
            if (choosenFigure.tagName === 'TD') {
                return;
            }
            if (possibleMoves.indexOf(cell) != -1) {
                leftPass = 0;
                rightPass = 0;
                if (choosenFigure === p1White || choosenFigure === p2White || choosenFigure === p3White || choosenFigure === p4White || choosenFigure === p5White || choosenFigure === p6White || choosenFigure === p7White || choosenFigure === p8White) {
                    if (choosenFigure.time === 0) {
                        choosenFigure.time = 1;
                    }
                }              

                blackArr = blackArr.filter((el) => el !== cell.firstChild);
                cell.removeChild(cell.firstChild);
                cell.appendChild(choosenFigure);
                setTimeout(turn, 500, color); 
                color = !color;
            }
        }
    }
    else {
        if (cell.tagName.toLowerCase() === 'td' && choosenFigure) {
            if (choosenFigure.tagName === 'TD') {
                return;
            }
            if (possibleMoves.indexOf(cell) != -1) {
                let passLeft = 0;
                let passRight = 0;
                if (choosenFigure === p1Black || choosenFigure === p2Black || choosenFigure === p3Black || choosenFigure === p4Black || choosenFigure === p5Black || choosenFigure === p6Black || choosenFigure === p7Black || choosenFigure === p8Black) {
                    if (choosenFigure === leftPass) {
                        passLeft = 1;
                    }
                    if (choosenFigure === rightPass) {
                        passRight = 1;
                    }
                    leftPass = 0;
                    rightPass = 0;
                    if (choosenFigure === p1Black || choosenFigure === p2Black || choosenFigure === p3Black || choosenFigure === p4Black || choosenFigure === p5Black || choosenFigure === p6Black || choosenFigure === p7Black || choosenFigure === p8Black) {
                        if (choosenFigure.time === 0) {
                            choosenFigure.time = 1;
                        }
                    }  
    //////////////////////ВЗЯТИЕ НА ПРОХОДЕ (ПРОВЕРКА ДЛЯ БЕЛЫХ)
                    let i = cell.parentNode.rowIndex;
                    let j = cell.cellIndex;
                    if (i - choosenFigure.parentNode.parentNode.rowIndex === 2 && choosenFigure.parentNode.cellIndex !=7) {
                        let firstChild = chessBoard.rows[i].cells[j+1].firstChild;
                        if (firstChild) {
                            if (firstChild.className.slice(7,16) === "white pwn") {
                                leftPass = firstChild;
                            }
                        }
                    }    
                    if (i - choosenFigure.parentNode.parentNode.rowIndex === 2 && choosenFigure.parentNode.cellIndex !=0) {
                        let firstChild = chessBoard.rows[i].cells[j-1].firstChild;
                        if (firstChild) {
                            if (firstChild.className.slice(7,16) === "white pwn") {
                                rightPass = firstChild;
                            }
                        }
                    }   
    //\\\\\\\\\\\\\\\\\\\\\ВЗЯТИЕ НА ПРОХОДЕ (ПРОВЕРКА ДЛЯ БЕЛЫХ)
                }
                
                cell.appendChild(choosenFigure);
//////////////////////ВЗЯТИЕ НА ПРОХОДЕ (ЧЕРНЫЕ)
                if (passLeft === 1 || passRight === 1) {
                    let isItPass = chessBoard.rows[cell.parentNode.rowIndex -1].cells[cell.cellIndex] 
                    if (isItPass.firstChild) {
                        if (isItPass.firstChild.className.slice(7,16) === "white pwn") {
                            whiteArr = whiteArr.filter((el) => el !== isItPass.firstChild);
                            isItPass.removeChild(isItPass.firstChild);
                        }
                    }
                }


//////////////////////ВЗЯТИЕ НА ПРОХОДЕ (ЧЕРНЫЕ)                
                setTimeout(turn, 500, color);
                color = !color;
            }           
        }

        if (cell.className.slice(7,12) === 'white' && choosenFigure) {
            if (choosenFigure.tagName === 'TD') {
                return;
            }
            cell = cell.parentNode;

            if (possibleMoves.indexOf(cell) != -1) {
                leftPass = 0;
                rightPass = 0;                
                if (choosenFigure === p1Black || choosenFigure === p2Black || choosenFigure === p3Black || choosenFigure === p4Black || choosenFigure === p5Black || choosenFigure === p6Black || choosenFigure === p7Black || choosenFigure === p8Black) {
                    if (choosenFigure.time === 0) {
                        choosenFigure.time = 1;
                    }
                }

                whiteArr = whiteArr.filter((el) => el !== cell.firstChild);
                cell.removeChild(cell.firstChild);
                cell.appendChild(choosenFigure);
                setTimeout(turn, 500, color);
                color = !color;
            }
        }
    }
//\\\\\\\\\\\\\\\\\\\\\ХОДЫ  

///////////////////////ВЫБОР ФИГУР 
  if (color) {
    possibleMoves = [];
    choosenFigure = cell;
    let i = cell.parentNode.parentNode.rowIndex;
    let j = cell.parentNode.cellIndex;

    ///////////////////////БЕЛАЯ ПЕШКА
    if (cell === p1White || cell === p2White || cell === p3White || cell === p4White || cell === p5White || cell === p6White || cell === p7White || cell === p8White) {
        cell.steps(i, j, possibleMoves)
    }   
    //\\\\\\\\\\\\\\\\\\\\\БЕЛАЯ ПЕШКА
    ///////////////////////WHITE ROOK
    if (cell === r1White || cell === r2White) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE ROOK
    ///////////////////////WHITE BISHOP
    if (cell === b1White || cell === b2White) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE BISHOP
    ///////////////////////WHITE QUEEN
    if (cell === qWhite) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE QUEEN
    ///////////////////////WHITE KNIGHT
    if (cell === kn1White || cell === kn2White) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE KNIGHT
    ///////////////////////WHITE KING
    if (cell === kWhite) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE KING
  }
  else {
    possibleMoves = [];  
    choosenFigure = cell;
    let i = cell.parentNode.parentNode.rowIndex;
    let j = cell.parentNode.cellIndex;
    
    ///////////////////////ЧЕРНАЯ ПЕШКА
    if (cell === p1Black || cell === p2Black || cell === p3Black || cell === p4Black || cell === p5Black || cell === p6Black || cell === p7Black || cell === p8Black) {
        cell.steps(i, j, possibleMoves)
    }   
    //\\\\\\\\\\\\\\\\\\\\\ЧЕРНАЯ ПЕШКА
    ///////////////////////BLACK ROOK
    if (cell === r1Black || cell === r2Black) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\BLACK ROOK
    ///////////////////////WHITE BISHOP
    if (cell === b1Black || cell === b2Black) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE BISHOP
    ///////////////////////BLACK QUEEN
    if (cell === qBlack) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\BLACK QUEEN
    ///////////////////////BLACK KNIGHT
    if (cell === kn1Black || cell === kn2Black) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\BLACK KNIGHT
    ///////////////////////WHITE KING
    if (cell === kBlack) {
        cell.steps(i, j, possibleMoves)
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE KING
  }
  //\\\\\\\\\\\\\\\\\\\\\\\ВЫБОР ФИГУР 
})
