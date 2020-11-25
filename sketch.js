var monkey , monkey_running, monkeyCollide
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0, bananaCount = 0;
var gameState = "play";
var grouns
var invisibleGround


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyCollide = loadImage('sprite_0.png');
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}


function setup() {
  createCanvas(600,350);

  foodGroup = createGroup();
  obstacleGroup = createGroup();

  ground = createSprite(300,320,600,60);
  ground.shapeColor = "darkgreen";
  
  invisibleGround = createSprite(300,330,600,40);
  invisibleGround.visible=false ;
  
  monkey = createSprite(90,250,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("collide",monkeyCollide)
  monkey.scale = 0.2;  
}


function draw() {
  background("lightblue");
  fill ("black");
  textSize(20);
  textFont("fantasy");
  text("Survival Time: "+score,400,30);
  text("Bananas collected: "+ bananaCount,200,30);
  
  if (gameState === "play")
    {
      score = score + Math.round(getFrameRate()/60);
      
      Banana();
      Obstacle();
      
      if (keyDown('space')&&monkey.y>=235){
        monkey.velocityY = -15;
       }
      
       monkey.velocityY = monkey.velocityY+0.8;
      
      if (monkey.isTouching(foodGroup))
        {
          foodGroup.destroyEach();
          bananaCount = bananaCount+1;
        }
      
      if (monkey.isTouching(obstacleGroup))
        {
          gameState = "end";
        }
    }
  
  if (gameState ==="end")
    {
     monkey.y = 250;
     monkey.changeAnimation("collide", monkeyCollide);
    
     foodGroup.destroyEach();
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
      
     fill("darkred")
     textFont("fantasy");
     stroke("black");
     textSize(40);
     text("GAMEOVER!", 260, 170);
     fill("black");
     textFont("typewriter");
     textSize(25);
     text("Press 'R' to play again.", 240, 200);
    
    if (keyDown("r")){
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaCount = 0;
      gameState = "play"; 
    }
  }
      
  drawSprites();
  
  monkey.collide(invisibleGround);
}
  
  
function Banana() {
  if (frameCount%100 === 0){
    banana = createSprite(610,100,10,10);
    banana.addAnimation("banana",bananaImage);
    banana.scale=0.1;
    banana.velocityX = -(4+score*1.5/100);
    banana.lifetime =150;
    foodGroup.add(banana);
  }
}

  
function Obstacle(){
  if (frameCount % 250 === 0){
    obstacle = createSprite(600,290,10,10);
    obstacle.addAnimation("obst",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacleGroup.add(obstacle);
  }
}