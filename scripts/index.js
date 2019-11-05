function drawBoard(){
    let board = document.getElementById("chessboard");
    let color = [
        "rgb(105, 140, 194)",
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
let previousCell;
let previousFigure;
let currentCell;
let currentFigure;
let figureTime = 1;
let leftPass = 0;
let rightPass = 0;

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
r1White.time = 0;
let r2White = document.getElementById('r2-white');
r2White.time = 0;
let r1Black = document.getElementById('r1-black');
r1Black.time = 0;
let r2Black = document.getElementById('r2-black');
r2Black.time = 0;

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
kWhite.time = 0;
let kBlack = document.getElementById('k-black');
kBlack.time = 0;


let whiteArr = [
    p1White, p2White, p3White, p4White, p5White, p6White, p7White, p8White,
    r1White, r2White, kn1White, kn2White, b1White, b2White, qWhite, kWhite   
]

let blackArr = [
    p1Black, p2Black, p3Black, p4Black, p5Black, p6Black, p7Black, p8Black,
    r1Black, r2Black, kn1Black, kn2Black, b1Black, b2Black, qBlack, kBlack
]

let extraWhiteFigures = document.querySelector(".extra-white-figures");
let extraBlackFigures = document.querySelector(".extra-black-figures");

let qWhiteButton = document.getElementById('q-white-button');
let qBlackButton = document.getElementById('q-black-button');

let rWhiteButton = document.getElementById('r-white-button');
let rBlackButton = document.getElementById('r-black-button');

let knWhiteButton = document.getElementById('kn-white-button');
let knBlackButton = document.getElementById('kn-black-button');

let bWhiteButton = document.getElementById('b-white-button');
let bBlackButton = document.getElementById('b-black-button');

let qWhiteClick = {
    count: 0,
};
let qBlackClick = {
    count: 0,
};

let rWhiteClick = {
    count: 0,
};

let rBlackClick = {
    count: 0,
};

let knWhiteClick = {
    count: 0,
};

let knBlackClick = {
    count: 0,
};

let bWhiteClick = {
    count: 0,
};

let bBlackClick = {
    count: 0,
};

let extraWhiteQueens = [];
let extraBlackQueens = [];
let extraWhiteRooks = [];
let extraBlackRooks = [];
let extraWhiteKnights = [];
let extraBlackKnights = [];
let extraWhiteBishops = [];
let extraBlackBishops = [];

function addExtraFigures(arrFigures, name, color) {
    for (i=0; i < 8; i++) {
        arrFigures[i] = document.createElement('div');
        arrFigures[i].innerHTML = name;
        arrFigures[i].classList.add("figure");
        arrFigures[i].classList.add(color);
    }
}

addExtraFigures(extraWhiteQueens,'&#9813;', "white");
addExtraFigures(extraBlackQueens,'&#9819;', "black");
addExtraFigures(extraWhiteRooks,'&#9814;', "white");
addExtraFigures(extraBlackRooks,'&#9820;', "black");
addExtraFigures(extraWhiteKnights,'&#9816;', "white");
addExtraFigures(extraBlackKnights,'&#9822;', "black");
addExtraFigures(extraWhiteBishops,'&#9815;', "white");
addExtraFigures(extraBlackBishops,'&#9821;', "black");

function chooseExtraFigure(extraBlock, extraFigures, colorArr, counter) {
    extraBlock.style.display = 'none'; 
    let newCell = previousFigure;
    colorArr.remove(previousFigure.firstChild);
    colorArr.push(extraFigures[counter.count]);
    newCell.removeChild(newCell.firstChild);
    newCell.appendChild(extraFigures[counter.count]);
    counter.count +=1;
    setTimeout(() => {
        chessBoard.style.pointerEvents = 'auto';
    }, 500);
    setTimeout(turn, 500, color); 
    color = !color;
}

qWhiteButton.addEventListener('click', () => {  
    chooseExtraFigure(extraWhiteFigures, extraWhiteQueens, whiteArr, qWhiteClick)
})

qBlackButton.addEventListener('click', () => {    
    chooseExtraFigure(extraBlackFigures, extraBlackQueens, blackArr, qBlackClick)
})

rWhiteButton.addEventListener('click', () => {    
    chooseExtraFigure(extraWhiteFigures, extraWhiteRooks, whiteArr, rWhiteClick)
})

rBlackButton.addEventListener('click', () => {    
    chooseExtraFigure(extraBlackFigures, extraBlackRooks, blackArr, rBlackClick)
})

knWhiteButton.addEventListener('click', () => {    
    chooseExtraFigure(extraWhiteFigures, extraWhiteKnights, whiteArr, knWhiteClick)
})

knBlackButton.addEventListener('click', () => {    
    chooseExtraFigure(extraBlackFigures, extraBlackKnights, blackArr, knBlackClick)
})

bWhiteButton.addEventListener('click', () => {    
    chooseExtraFigure(extraWhiteFigures, extraWhiteBishops, whiteArr, bWhiteClick)
})

bBlackButton.addEventListener('click', () => {    
    chooseExtraFigure(extraBlackFigures, extraBlackBishops, blackArr, bBlackClick)
})

let pwnsWhite = [p1White, p2White, p3White, p4White, p5White, p6White, p7White, p8White]
////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ (БЕЛЫЕ ПЕШКИ)
pwnsWhite.forEach(p => {
    p.steps = function(arr) {
        let i = this.parentNode.parentNode.rowIndex;
        let j = this.parentNode.cellIndex;
        let point = i;
        let beat = i - 1;
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
                    if (leftTarget.childNodes[0].classList[1] !== "white" && i === beat) {
                        arr.push(leftTarget)
                    }
                    
                }
            }
            if (rightTarget) {
                if (rightTarget.childNodes[0]) {
                    if (rightTarget.childNodes[0].classList[1] !== "white" && i === beat) {
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
    p.steps = function(arr) {
        let i = this.parentNode.parentNode.rowIndex;
        let j = this.parentNode.cellIndex;
        let point = i;
        let beat = i + 1;
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
                    if (leftTarget.childNodes[0].classList[1] !== "black" && i === beat) {
                        arr.push(leftTarget)
                    }
                }
            }
            if (rightTarget) {
                if (rightTarget.childNodes[0]) {
                    if (rightTarget.childNodes[0].classList[1] !== "black" && i === beat) {
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
let rooks = [
    r1White, r2White, r1Black, r2Black, extraWhiteRooks[0], extraWhiteRooks[1], extraWhiteRooks[2], 
    extraWhiteRooks[3], extraWhiteRooks[4], extraWhiteRooks[5], extraWhiteRooks[6], extraWhiteRooks[7], 
    extraBlackRooks[0], extraBlackRooks[1], extraBlackRooks[2], extraBlackRooks[3],
    extraBlackRooks[4], extraBlackRooks[5], extraBlackRooks[6], extraBlackRooks[7]    
]
rooks.forEach(el => {
    el.steps = function(arr) {
        let i = this.parentNode.parentNode.rowIndex;
        let j = this.parentNode.cellIndex;
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
let bishops = [
    b1White, b2White, b1Black, b2Black, extraWhiteBishops[0], extraWhiteBishops[1], extraWhiteBishops[2], 
    extraWhiteBishops[3], extraWhiteBishops[4], extraWhiteBishops[5], extraWhiteBishops[6], extraWhiteBishops[7], 
    extraBlackBishops[0], extraBlackBishops[1], extraBlackBishops[2], extraBlackBishops[3],
    extraBlackBishops[4], extraBlackBishops[5], extraBlackBishops[6], extraBlackBishops[7]
]
bishops.forEach(el => {
    el.steps = function(arr) {
        let i = this.parentNode.parentNode.rowIndex;
        let j = this.parentNode.cellIndex;
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
let queens = [
    qWhite, qBlack, extraWhiteQueens[0], extraWhiteQueens[1], extraWhiteQueens[2], extraWhiteQueens[3],
    extraWhiteQueens[4], extraWhiteQueens[5], extraWhiteQueens[6], extraWhiteQueens[7], 
    extraBlackQueens[0], extraBlackQueens[1], extraBlackQueens[2], extraBlackQueens[3],
    extraBlackQueens[4], extraBlackQueens[5], extraBlackQueens[6], extraBlackQueens[7]
]
queens.forEach(el => {
    el.steps = function(arr) {
        r1White.steps.call(el, arr);
        b1White.steps.call(el, arr);
    } 
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ КОРОЛЕВЫ


//////////////////////////////////МЕТОД ДЛЯ ПОИСКА ХОДОВ КОНЯ
let knights = [
    kn1White, kn2White, kn1Black, kn2Black, extraWhiteKnights[0], extraWhiteKnights[1], extraWhiteKnights[2], 
    extraWhiteKnights[3], extraWhiteKnights[4], extraWhiteKnights[5], extraWhiteKnights[6], extraWhiteKnights[7], 
    extraBlackKnights[0], extraBlackKnights[1], extraBlackKnights[2], extraBlackKnights[3],
    extraBlackKnights[4], extraBlackKnights[5], extraBlackKnights[6], extraBlackKnights[7]
]
knights.forEach(el => {
    el.steps = function(arr) {
        let i = this.parentNode.parentNode.rowIndex;
        let j = this.parentNode.cellIndex;
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
    el.steps = function(arr) {
        let i = this.parentNode.parentNode.rowIndex;
        let j = this.parentNode.cellIndex;
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
                                cover(newTarget, arr)
                            }
                        } 
                    }
                }
            
            }            
        }       

        i = this.parentNode.parentNode.rowIndex;
        j = this.parentNode.cellIndex - 1;
        newTarget = chessBoard.rows[i].cells[j];
        color ? rook = r1White : r1Black;
        if (!newTarget.childNodes.length && this.time === 0 && rook.time === 0) {
            if (cover(newTarget, possibleMoves)) {
                j-=1;
                newTarget = chessBoard.rows[i].cells[j];
                if (!newTarget.childNodes.length) { 
                    cover(newTarget, possibleMoves);
                }  
            }
           
        } 
        i = this.parentNode.parentNode.rowIndex;
        j = this.parentNode.cellIndex + 1;
        newTarget = chessBoard.rows[i].cells[j];
        color ? rook = r2White : r2Black;
        if (!newTarget.childNodes.length && this.time === 0 && rook.time === 0) {
            if (cover(newTarget, possibleMoves)) {
                j+=1; 
                newTarget = chessBoard.rows[i].cells[j];
                if (!newTarget.childNodes.length && this.time === 0) {
                    cover(newTarget, possibleMoves);
                }  
            }          
        } 

        color ? king = kBlack : king = kWhite;
        i = king.parentNode.parentNode.rowIndex;
        j = king.parentNode.cellIndex;
        rememberI = i;
        rememberJ = j;
        i -=1;        
        for (i; i < rememberI + 2; i++) {
            j = rememberJ;
            j -=1;
            for (j; j < rememberJ+ 2; j++) {
                if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
                    newTarget = chessBoard.rows[i].cells[j];
                    if (newTarget) {
                        if (!newTarget.childNodes.length) {
                            arr.remove(newTarget)
                        }               
                    }
                }
            
            }
            
        }  
    } 
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\МЕТОД ДЛЯ ПОИСКА ХОДОВ КОРОЛЯ

function cover(figure, massive) {
    allPossibleMoves = [];
    let arr;
    let king;
    color ? arr = blackArr : arr = whiteArr;
    color ? king = kBlack : king = kWhite;
    arr.remove(king);
    arr.forEach(el => {
        el.steps(allPossibleMoves);
    });  
    arr.push(king);      
    if (allPossibleMoves.indexOf(figure) === -1) {
        if (massive.indexOf(figure) === -1) {
            massive.push(figure)
        }     
        return true;
    }
    return false;
}

Array.prototype.remove = function(value) {
    let i = this.indexOf(value);
    if (i != -1) {
        return this.splice(i,1);
    }
}
function checks() {
    allPossibleMoves = [];
    let king;
    color ? king = kWhite : king = kBlack;
    color ? arr = blackArr : arr = whiteArr;
    color ? choosenFigure = kBlack : choosenFigure = kWhite;
    arr.forEach(el => {
        el.steps(allPossibleMoves);
    }); 
    if (allPossibleMoves.indexOf(king.parentNode) === -1) {
        choosenFigure = null;         
        return false;
    }
    else {
        choosenFigure = null; 
        return true;
    }
}

function errorStep() {
    let king;
    color ? king = kWhite : king = kBlack;
    king.style.color = 'red';
    setTimeout(() => {
        king.style.color = 'black'; 
    }, 1000);
}

let upLetters = document.querySelector(".up-letters")
let bottomLetters = document.querySelector(".bottom-letters")
function turn(color) {
    if (color) {
        chessBoard.classList.add("turn");
        upLetters.classList.add("turn");
        bottomLetters.classList.add("turn");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                chessBoard.rows[i].cells[j].classList.add("turn");
            }
        }
        for (let i = 0; i < 8; i++) {           
            upLetters.children[0].children[i].classList.add("turn");
            bottomLetters.children[0].children[i].classList.add("turn");
        }
    }
    else {
        chessBoard.classList.remove("turn");
        upLetters.classList.remove("turn");
        bottomLetters.classList.remove("turn");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                chessBoard.rows[i].cells[j].classList.remove("turn");
            }
        }
        for (let i = 0; i < 8; i++) {           
            upLetters.children[0].children[i].classList.remove("turn");
            bottomLetters.children[0].children[i].classList.remove("turn");
        }
    }
    
}

document.getElementById("chessboard").addEventListener('click', () => {
    let cell = event.target;
    
///////////////////////MOVES////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    if (color) {

        figureTime = 1;
        let whiteArrReserve = whiteArr;
        let blackArrReserve = blackArr; 
        currentFigure = cell;
        if (currentFigure.tagName === 'DIV') {
            currentCell = currentFigure.parentNode;
        }

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
                let isItPass = null;
                let isPass = null;
                if (passLeft === 1 || passRight === 1) {
                    isItPass = chessBoard.rows[cell.parentNode.rowIndex +1].cells[cell.cellIndex] 
                    if (isItPass.firstChild) {
                        isPass = isItPass.firstChild;
                        if (isItPass.firstChild.className.slice(7,16) === "black pwn") {
                            blackArr = blackArr.filter((el) => el !== isItPass.firstChild);
                            isItPass.removeChild(isItPass.firstChild);                           
                        }
                    }
                }
//////////////////////ВЗЯТИЕ НА ПРОХОДЕ (БЕЛЫЕ) 

                if (choosenFigure === r1White || choosenFigure === r2White || choosenFigure === kWhite) {  
                    if (choosenFigure.time === 0) { figureTime = 0} // figureTime = 0 если шаг или рокировка потом                
                    choosenFigure.time = 1;
                }
                                  
                if (checks()) {
                    lightenOff();
                    if (previousFigure.className.slice(7,16) === 'white pwn' && previousCell.parentNode.rowIndex === 6) {
                        previousFigure.time = 0;
                    }
                    else if (previousFigure.time && previousFigure.className.slice(13,16) !== 'pwn') {
                        previousFigure.time = figureTime;
                        figureTime = 1;
                    }
                    
                    errorStep();

                    whiteArr = whiteArrReserve;
                    blackArr = blackArrReserve;                  
                    previousCell.appendChild(previousFigure);
                    if (currentFigure.tagName === 'DIV') {
                        currentCell.appendChild(currentFigure);
                    }
                    if (isItPass) {
                        isItPass.appendChild(isPass);
                    }
                    return;
                }

//////////////////////////////////CASTLING

                    if (cell.firstChild === kWhite && currentFigure.cellIndex - previousCell.cellIndex === 2
                         && figureTime === 0 && whiteArr.indexOf(r2White) !== -1 && r2White.time === 0) {
                        chessBoard.rows[7].cells[5].appendChild(r2White)
                    }
                    if (cell.firstChild === kWhite && currentFigure.cellIndex - previousCell.cellIndex === -2
                        && figureTime === 0 && whiteArr.indexOf(r1White) !== -1 && r1White.time === 0) {
                       chessBoard.rows[7].cells[3].appendChild(r1White)
                    }

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\CASTLING

                if (previousFigure.parentNode.parentNode.rowIndex === 0 && previousFigure.className.slice(7,16) === 'white pwn') {
                    chessBoard.style.pointerEvents = 'none';
                    extraWhiteFigures.style.display = 'flex';
                }              
                else {
                    setTimeout(turn, 500, color); 
                    color = !color;
                }
            }           
            else {
                lightenOff();
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

                if (choosenFigure === r1White || choosenFigure === r2White || choosenFigure === kWhite) {  
                    if (choosenFigure.time === 0) { figureTime = 0 }  // figureTime = 0 если шаг или рокировка потом              
                    choosenFigure.time = 1;
                }

                if (checks()) {
                    lightenOff();

                    if (previousFigure.className.slice(7,16) === 'white pwn' && previousCell.parentNode.rowIndex === 6) {
                        previousFigure.time = 0;
                    }
                    else if (previousFigure.time && previousFigure.className.slice(13,16) !== 'pwn') {
                        previousFigure.time = figureTime;
                        figureTime = 1;
                    }

                    errorStep();

                    whiteArr = whiteArrReserve;
                    blackArr = blackArrReserve;           
                    previousCell.appendChild(previousFigure);
                    if (currentFigure.tagName === 'DIV') {
                        currentCell.appendChild(currentFigure);
                    }
                    return;
                }

                if (previousFigure.parentNode.parentNode.rowIndex === 0 && previousFigure.className.slice(7,16) === 'white pwn') {
                    chessBoard.style.pointerEvents = 'none';
                    extraWhiteFigures.style.display = 'flex';
                }
                else {
                    setTimeout(turn, 500, color); 
                    color = !color;
                }
            }
            else {
                lightenOff();
            }
        }
    }
    else {

        figureTime = 1;
        let whiteArrReserve = whiteArr;
        let blackArrReserve = blackArr; 
        currentFigure = cell;
        if (currentFigure.tagName === 'DIV') {
            currentCell = currentFigure.parentNode;
        }

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
                let isItPass = null;
                let isPass = null;
                if (passLeft === 1 || passRight === 1) {
                    isItPass = chessBoard.rows[cell.parentNode.rowIndex -1].cells[cell.cellIndex] 
                    if (isItPass.firstChild) {
                        isPass = isItPass.firstChild;
                        if (isItPass.firstChild.className.slice(7,16) === "white pwn") {
                            whiteArr = whiteArr.filter((el) => el !== isItPass.firstChild);
                            isItPass.removeChild(isItPass.firstChild);
                        }
                    }
                }
//////////////////////ВЗЯТИЕ НА ПРОХОДЕ (ЧЕРНЫЕ)     

                if (choosenFigure === r1Black || choosenFigure === r2Black || choosenFigure === kBlack) {  
                    if (choosenFigure.time === 0) { figureTime = 0}                
                    choosenFigure.time = 1;
                }

                if (checks()) {
                    lightenOff();
                    
                    
                    if (previousFigure.className.slice(7,16) === 'black pwn' && previousCell.parentNode.rowIndex === 1) {
                        previousFigure.time = 0;
                    }
                    else if (previousFigure.time && previousFigure.className.slice(13,16) !== 'pwn') {
                        previousFigure.time = figureTime;
                        figureTime = 1;
                    }

                    errorStep();

                    whiteArr = whiteArrReserve;
                    blackArr = blackArrReserve;
                    previousCell.appendChild(previousFigure);
                    if (currentFigure.tagName === 'DIV') {
                        currentCell.appendChild(currentFigure);
                    }
                    if (isItPass) {
                        isItPass.appendChild(isPass);
                    }
                    return;
                }

                

//////////////////////////////////CASTLING

                if (cell.firstChild === kBlack && currentFigure.cellIndex - previousCell.cellIndex === -2
                    && figureTime === 0 && blackArr.indexOf(r1Black) !== -1 && r1Black.time === 0) {
                chessBoard.rows[0].cells[3].appendChild(r1Black)
                }
                if (cell.firstChild === kBlack && currentFigure.cellIndex - previousCell.cellIndex === 2
                && figureTime === 0 && blackArr.indexOf(r2Black) !== -1 && r2Black.time === 0) {
                chessBoard.rows[0].cells[5].appendChild(r2Black)
                }

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\CASTLING


                if (previousFigure.parentNode.parentNode.rowIndex === 7 && previousFigure.className.slice(7,16) === 'black pwn') {
                    chessBoard.style.pointerEvents = 'none';
                    extraBlackFigures.style.display = 'flex';
                }              
                else {
                    setTimeout(turn, 500, color); 
                    color = !color;
                }
            }           
            else {
                lightenOff();
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

                if (choosenFigure === r1Black || choosenFigure === r2Black || choosenFigure === kBlack) {  
                    if (choosenFigure.time === 0) { figureTime = 0}                
                    choosenFigure.time = 1;
                }

                if (checks()) {
                    lightenOff();
                    if (previousFigure.className.slice(7,16) === 'black pwn' && previousCell.parentNode.rowIndex === 1) {
                        previousFigure.time = 0;
                    }
                    else if (previousFigure.time && previousFigure.className.slice(13,16) !== 'pwn') {
                        previousFigure.time = figureTime;
                        figureTime = 1;
                    }

                    errorStep();

                    whiteArr = whiteArrReserve;
                    blackArr = blackArrReserve;                    
                    previousCell.appendChild(previousFigure);
                    if (currentFigure.tagName === 'DIV') {
                        currentCell.appendChild(currentFigure);
                    }
                    return;
                }

                if (previousFigure.parentNode.parentNode.rowIndex === 7 && previousFigure.className.slice(7,16) === 'black pwn') {
                    chessBoard.style.pointerEvents = 'none';
                    extraBlackFigures.style.display = 'flex';
                }              
                else {
                    setTimeout(turn, 500, color); 
                    color = !color;
                }
            }
            else {
                lightenOff();
            }
        }

    }
//\\\\\\\\\\\\\\\\\\\\\MOVES  
function lighten() {
    whiteArr.forEach(el => {
  
        el.classList.remove("background");
    });
    blackArr.forEach(el => {
  
        el.classList.remove("background");
    });

    cell.classList.add("background");
}   

function lightenOff() {
    whiteArr.forEach(el => {

        el.classList.remove("background");
    });
    blackArr.forEach(el => {

        el.classList.remove("background");
    });
}

///////////////////////ВЫБОР ФИГУР 
  if (color) {
    possibleMoves = [];
    choosenFigure = cell;
    previousCell = cell.parentNode;
    previousFigure = cell;

    ///////////////////////БЕЛАЯ ПЕШКА
    if (
        cell === p1White || cell === p2White || cell === p3White || cell === p4White || 
        cell === p5White || cell === p6White || cell === p7White || cell === p8White
        ) {
        cell.steps(possibleMoves)
        lighten()
    }   
    //\\\\\\\\\\\\\\\\\\\\\БЕЛАЯ ПЕШКА
    ///////////////////////WHITE ROOK
    if (
        cell === r1White || cell === r2White ||
        cell === extraWhiteRooks[0] || cell === extraWhiteRooks[1] || cell === extraWhiteRooks[2] ||
        cell === extraWhiteRooks[3] || cell === extraWhiteRooks[4] || cell === extraWhiteRooks[5] || 
        cell === extraWhiteRooks[6] || cell === extraWhiteRooks[7]
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE ROOK
    ///////////////////////WHITE BISHOP
    if (
        cell === b1White || cell === b2White ||
        cell === extraWhiteBishops[0] || cell === extraWhiteBishops[1] || cell === extraWhiteBishops[2] ||
        cell === extraWhiteBishops[3] || cell === extraWhiteBishops[4] || cell === extraWhiteBishops[5] || 
        cell === extraWhiteBishops[6] || cell === extraWhiteBishops[7]
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE BISHOP
    ///////////////////////WHITE QUEEN
    if (
        cell === qWhite ||
        cell === extraWhiteQueens[0] || cell === extraWhiteQueens[1] || cell === extraWhiteQueens[2] ||
        cell === extraWhiteQueens[3] || cell === extraWhiteQueens[4] || cell === extraWhiteQueens[5] || 
        cell === extraWhiteQueens[6] || cell === extraWhiteQueens[7]
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE QUEEN
    ///////////////////////WHITE KNIGHT
    if (
        cell === kn1White || cell === kn2White ||
        cell === extraWhiteKnights[0] || cell === extraWhiteKnights[1] || cell === extraWhiteKnights[2] ||
        cell === extraWhiteKnights[3] || cell === extraWhiteKnights[4] || cell === extraWhiteKnights[5] || 
        cell === extraWhiteKnights[6] || cell === extraWhiteKnights[7] 
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE KNIGHT
    ///////////////////////WHITE KING
    if (cell === kWhite) {
        if (checks()) {
            cell.time = 1;
        }
        choosenFigure = cell;
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE KING
    
  }
  else {
    
    possibleMoves = [];  
    choosenFigure = cell;
    previousCell = cell.parentNode;
    previousFigure = cell;
    
    ///////////////////////ЧЕРНАЯ ПЕШКА
    if (
        cell === p1Black || cell === p2Black || cell === p3Black || cell === p4Black || 
        cell === p5Black || cell === p6Black || cell === p7Black || cell === p8Black
        ) {
        cell.steps(possibleMoves)
        lighten()
    }   
    //\\\\\\\\\\\\\\\\\\\\\ЧЕРНАЯ ПЕШКА
    ///////////////////////BLACK ROOK
    if (
        cell === r1Black || cell === r2Black ||
        cell === extraBlackRooks[0] || cell === extraBlackRooks[1] || cell === extraBlackRooks[2] ||
        cell === extraBlackRooks[3] || cell === extraBlackRooks[4] || cell === extraBlackRooks[5] || 
        cell === extraBlackRooks[6] || cell === extraBlackRooks[7]
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\BLACK ROOK
    ///////////////////////WHITE BISHOP
    if (
        cell === b1Black || cell === b2Black ||
        cell === extraBlackBishops[0] || cell === extraBlackBishops[1] || cell === extraBlackBishops[2] ||
        cell === extraBlackBishops[3] || cell === extraBlackBishops[4] || cell === extraBlackBishops[5] || 
        cell === extraBlackBishops[6] || cell === extraBlackBishops[7]
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE BISHOP
    ///////////////////////BLACK QUEEN
    if (
        cell === qBlack || 
        cell === extraBlackQueens[0] || cell === extraBlackQueens[1] || cell === extraBlackQueens[2] || 
        cell === extraBlackQueens[3] || cell === extraBlackQueens[4] || cell === extraBlackQueens[5] || 
        cell === extraBlackQueens[6] || cell === extraBlackQueens[7]
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\BLACK QUEEN
    ///////////////////////BLACK KNIGHT
    if (
        cell === kn1Black || cell === kn2Black ||
        cell === extraBlackKnights[0] || cell === extraBlackKnights[1] || cell === extraBlackKnights[2] ||
        cell === extraBlackKnights[3] || cell === extraBlackKnights[4] || cell === extraBlackKnights[5] || 
        cell === extraBlackKnights[6] || cell === extraBlackKnights[7]
        ) {
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\BLACK KNIGHT
    ///////////////////////WHITE KING
    if (cell === kBlack) {
        if (checks()) {
            cell.time = 1;
        }
        choosenFigure = cell;
        cell.steps(possibleMoves)
        lighten()
    }
    //\\\\\\\\\\\\\\\\\\\\\WHITE KING
    
  }
  //\\\\\\\\\\\\\\\\\\\\\\\ВЫБОР ФИГУР 

})
