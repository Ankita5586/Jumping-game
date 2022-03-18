var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play",state=0;
var score = 0;
var jframe=0;


function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  
  frog = createSprite(280,220,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  //frog.debug=true;
  
  //create coin group and climber group
  coinGroup=new Group();
  climberGroup=new Group();
  
}

function draw(){
  background(0);
  drawSprites();
  textSize(30);
  textStyle("bold");
  fill("Red");
  text("Score:"+score,400,30);
  if(state==0){
    frog.velocityX=0;
    frog.velocityY=0;
    textSize(50);
    text("Press Enter", 150,155);
    if(keyDown("Enter"))
    {
      state=1;
    }
  }
  if(state==1)
  {
  if (gameState === "play") 
  
  {
    ocean.velocityY = 4;
    if(ocean.y>300)
    {
      ocean.y=170;
    }
    if(keyDown("space"))
  { frog.y-=5;
    jframe=frameCount+10 ;

    //frog.y+=-20;  
  }
  if(frameCount<jframe&&frog.y>30)
  {
    frog.velocityY=-12;
  }
  else {
    
      frog.velocityY=7;
    }
  if(coinGroup.isTouching(frog))
      {     
        score +=1;
        coinGroup.destroyEach();
      } 
  
  if(keyDown("left")&& frog.x>25)
  { 
    frog.x-=5;
  }
  if(keyDown("right"))
  { 
    frog.x+=5;
  }
  frog.collide(climberGroup);
}
spawnCoin();
if(frog.y>=450)
{
  gameState="end";
}
  if (gameState === "end"){
    coinGroup.destroyEach();
    climberGroup.destroyEach();
    frog.destroy();
    textSize(50);
    text("Game Over", 200,155);
    ocean.velocityY=0;

 
  }
  
}}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 150 === 0) {
    //make the x position of the coin and climber the same
      var climber = createSprite(Math.round(random(50, 350)),40, 10, 10);
      climber.addImage(climberImg);
      climber.scale=0.25;  
      climber.velocityY = 3;
      climber.lifetime = 200;
      climber.setCollider("rectangle", 0, 20, 300, 10)
      climberGroup.add(climber);

      var coin = createSprite(climber.x,climber.y-50, 10, 10);
      coin.addImage(coinImg);
      coin.scale=0.1;
      coin.velocityY = 3;
      coin.lifetime=200;
      coinGroup.add(coin);
  }
  

 } 


