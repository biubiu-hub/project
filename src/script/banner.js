const oBanner = document.querySelector('.banner');
const pic = document.querySelectorAll('.banner ul li');
const btn = document.querySelectorAll('.banner ol li');
const leftBn = document.querySelector('.leftBn');
const rightBn = document.querySelector('.rightBn');

let index = 0
for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
        index = i;
        cirswitch();
    }
}

leftBn.onclick = function () {
    index--;
    if (index < 0) {
        index = btn.length - 1;
    }
    cirswitch();
}
rightBn.onclick = function () {
    index++;
    if (index > btn.length - 1) {
        index = 0;
    }
    cirswitch();
}

let timer = setInterval(function () {
    rightBn.onclick();
}, 3000)
oBanner.onmouseover = function () {
    clearInterval(timer);
}
oBanner.onmouseout = function () {
    timer=setInterval(function () {
        rightBn.onclick();
    }, 3000)
}

function cirswitch() {
    for (let j = 0; j < btn.length; j++) {
        btn[j].className = '';
        bufferMove(pic[j], { opacity: 0 });
    }
    btn[index].className = 'active';
    bufferMove(pic[index], { opacity: 100 });
}