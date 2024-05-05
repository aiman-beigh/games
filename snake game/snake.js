const gameboard=document.querySelector(".container")
const context=gameboard.getContext('2d')
let scoreTxt=document.querySelector(".score")
const resetbtn=document.querySelector(".reset")
let score=0;
const unitSize=10;
let xVelocity=unitSize;
let yVelocity=0;
let snake=[
    {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
{x:0,y:0}

]
let running=false;
window.addEventListener('keydown',movement);
resetbtn.addEventListener('click',resetGame)


let foodX;
let foodY;
gameStart();

function gameStart(){
running=true;
scoreTxt.textContent=score;
createFood()
drawFood()

next()
}
function next(){
if(running){
    setTimeout(()=>{
       clear();
       
       drawFood();
       
       moveSnake() 
       drawSnake();
       checkGameOver()
       next();
    },75)
}
else
displayGameOver()
}
function clear(){
context.fillStyle='white'
context.fillRect(0,0,gameboard.width,gameboard.height)
}
function createFood(){
    function foodRandom(min,max){
    let randomnumber=Math.round((Math.random()*(max))/unitSize)*unitSize
    console.log(randomnumber)
    return randomnumber}
    foodX=foodRandom(0,200-unitSize)
    foodY=foodRandom(0,100-unitSize)
}
function drawFood(){
    context.fillStyle='red';
    context.fillRect(foodX,foodY,unitSize,unitSize)
}
function moveSnake(){
          const head ={x:snake[0].x +xVelocity,
            y:snake[0].y+yVelocity}
            
snake.unshift(head);
            //if food is eaten
   if(snake[0].x==foodX && snake[0].y==foodY ){
    score+=1;
    scoreTxt.textContent=score;
    createFood();
            }
   else{
              snake.pop();  
            }
}
function drawSnake(){
    context.fillStyle='lightgreen'
    context.strokeStyle='black'
    snake.forEach(snakepart=>{
           context.fillRect(snakepart.x,snakepart.y,unitSize,unitSize)
           context.strokeRect(snakepart.x,snakepart.y,unitSize,unitSize)
    })
 
}
function movement(event){
    const keyPress =event.keyCode;    //code of key
    const LEFT=37
    const UP=38
    const RIGHT=39
    const DOWN=40


    const goUp=(yVelocity==-unitSize)
    const goDown=(yVelocity==unitSize)

    const goRight=(xVelocity==unitSize)
    const goLeft=(xVelocity==-unitSize)


    switch(true){
        case(keyPress==LEFT && !goRight):
        xVelocity = -unitSize;
        yVelocity=0
        break;
        case(keyPress==UP && !goDown):
        xVelocity = 0;
        yVelocity=-unitSize
        break;
    
    case(keyPress==RIGHT && !goLeft):
    xVelocity = unitSize;
    yVelocity=0
    break;
    case(keyPress==DOWN && !goUp):
    xVelocity = 0;
    yVelocity=unitSize
    break;
}}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x>gameboard.width):
        running=false;
        break;
        case(snake[0].y<0):
        running=false;
        break;
        case(snake[0].y>gameboard.height):
        running=false;
        break;
    
    }
    //touch
    for(let i=1;i<snake.length;i++)
        {
            if(snake[i].x==snake[0].x && snake[i].y==snake[0].y ){
running=false;
            }
        }
}
function displayGameOver(){
   context.font ='50px Arial'
   context.fillStyle='black'
   context.textAlign ='center'
   context.fillText('GAME OVER',(gameboard.width)/2,(gameboard.height)/2)
   running=false
}
function resetGame(){
score=0;
xVelocity=unitSize;
yVelocity=0;
 snake=[
    {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
{x:0,y:0}

]
gameStart();
}