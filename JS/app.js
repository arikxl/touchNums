'use strict'

var gNums = [];
var gCurrNum;
var gNextNum;
var gSize = 9;
var gInterval;
var gCurrentTime = 0;


var elNextNumTxt = document.querySelector('.next-num');
var elNextNum = document.querySelector('.next-num span');
var elWinMsg = document.querySelector('.win-msg');
var elTimer = document.querySelector('.timer');
var elTimer = document.querySelector('.timer');

function init() {
    gNextNum = 1;
    renderBoard();
    getNums(gSize);
    clearInterval(gInterval);
}

function playGame(size) {
    gSize = size;
    gCurrentTime = 0
    init();
    elTimer.innerHTML = '0.00';
    elWinMsg.style.display = 'none';
    elNextNumTxt.style.display = 'block';
    elNextNum.innerHTML = gNextNum;
    clearInterval(gInterval);
}

function getNums(gSize) {
    var nums = []
    for (var i = 0; i < gSize; i++) {
        nums.push(i + 1)
    }
    nums.sort(() => Math.random() - 0.5);
    gNums = nums;
    gCurrNum = 1;
    gNextNum = 1;
    renderBoard(gSize)
}

function renderBoard() {
    var strCell = '';
    var length = Math.sqrt(gNums.length);
    for (var i = 0; i < length; i++) {
        strCell += '<tr>';
        for (var j = 0; j < length; j++) {
            strCell += `<td class="cell" data-i="${i}" data-j="${j}" 
        onclick="clickOnNum(this,gSize)"> ${gNums.pop()}
        </td>`;
        }
        strCell += `</tr>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strCell;
}

function clickOnNum(elBtn, gSize) {
    var currCell = +(elBtn.innerText);
    if (currCell === gNextNum) {
        if (currCell === 1) {
            startTimer()
        }
        elBtn.style.backgroundColor = ' dodgerblue';
        elBtn.style.color = 'white';
        gNextNum += 1;
        elNextNum.innerHTML = gNextNum;
    }
    if (gNextNum === gSize + 1) {
        gameOver()
    }
}

function startTimer() {
    gInterval = setInterval(function () {
        gCurrentTime = gCurrentTime + 1;
        elTimer.innerHTML = (gCurrentTime / 100);
    }, 10)

}

function gameOver() {
    elNextNumTxt.style.display = 'none';
    elWinMsg.style.display = 'block';
    clearInterval(gInterval);
}