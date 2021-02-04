document.body.style.backgroundColor = getRandomColor() ;

let myInterval = setInterval(()=>{
    document.body.style.backgroundColor =getRandomColor();
},1)

function getRandomNumber(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRandomColor(){
    let r = getRandomNumber(0,255);
    let g  = getRandomNumber(0,255);
    let b = getRandomNumber(0,255);
    return `rgb(${r},${g},${b})`;
}


let mainDiv = document.querySelector(`#main`);
let btn1 = document.querySelector(`#button1`);
let btn2 = document.querySelector(`#button2`);
let image = document.querySelector(`#image`); 
let imgArray = [`https://images.saymedia-content.com/.image/t_share/MTc0MzY1MjUwNzQ3OTAxNTc0/top-system-of-a-down-songs.jpg`,`https://cdn.mos.cms.futurecdn.net/M692FG9ybkKvRxmBARbdbg-1200-80.jpg`,`https://ca-times.brightspotcdn.com/dims4/default/c97d0a4/2147483647/strip/true/crop/500x280+0+0/resize/840x470!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F9c%2Fa0%2Fe19adf0e85d50dc9e47e563d2342%2Flat-system-jsho9nnc20071214154722`,`https://static.billboard.com/files/media/System-Of-A-Down-press-photo-2020-billboard-1548-compressed.jpg`];
image.setAttribute(`src`,imgArray[0]);
let i = 0;
btn2.addEventListener(`click`,function(e){
    if(i == imgArray.length - 1){
    i = 0;
    }else{
        i ++;
    }
    image.setAttribute(`src`,imgArray[i]);

})

btn1.addEventListener(`click`,function(e){
    if(i == 0){
        i = imgArray.length -1;
    }else{
        i --;
    }
    image.setAttribute(`src`,imgArray[i]);

})


function slectImg(){
    let shrjanner = document.querySelectorAll(`.shrjan`);
    let activeImg = document.querySelector(`.active-img`);
    if(activeImg){
        activeImg.classList.remove(`active`);
    }else{
        shrjanner.classList.add(`active-img`);
    }
}

