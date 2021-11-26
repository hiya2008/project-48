var balloon , balloon_img ; 
var bg , bg_img ; 
var Bground ;
var Tground ;
var obsTop1 , obsTop2 ;
var obsBot1 , obsBot2 , obsBot3 ; 
var gameState = PLAY ; 
var PLAY = 1 ; 
var END = 0 ;

function preload(){
  bg_img = loadImage("assets/bg.png");
  balloon_img = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");
  obsBot1 = loadImage("assets/obsBottom1.png");
  obsBot2 = loadImage("assets/obsBottom2.png");
  obsBot3 = loadImage("assets/obsBottom3.png");
  gameOver_img = loadImage("assets/gameOver.png");
  restart_img = loadImage("assets/restart.png");
  die_snd = loadSound("assets/die.mp3");
  jump_snd= loadSound("assets/jump.mp3");
}

function setup (){
  createCanvas(400,400);

  topObstaclesGroup = new Group();
  bottomObstaclesGroup = new Group();

  bg = createSprite(165,485,1,1);
  bg.addImage(bg_img);
  bg.scale = 1.3 ;

  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloon_img);
  balloon.scale = 0.2 ;
  balloon.debug = false ;

  Bground = createSprite(200,390,800,20);
  Bground.visible = false ; 

  Tground = createSprite(200,10,800,20);
  Tground.visible = false ;
  
  gameOver = createSprite(2,2,200,200);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false ; 

  restart = createSprite(2,2,220,240);
  restart.addImage(restart_img);
  restart.visible = false ;
}

function draw (){
  background("black");

  if(gameState === PLAY){
  
 if(keyDown("space")){
  balloon.velocityY = -5
  jump_snd.play();
   }

  balloon.velocityY = balloon.velocityY+2
 

 if(topObstaclesGroup.isTouching(balloon)||bottomObstaclesGroup.isTouching(ballon)
  ||balloon.isTouching(Tground)||balloon.isTouching(Bground)) {
    gameState = END ;
    die_snd.play();
  }
 }
 if(gameState === END) {
    gameOver.visible = true ;
    balloon.velocityX = 0;
    balloon.velocityY = 0;
    topObstaclesGroup.setVelocityXEach(0);
    bottomObstaclesGroup.setVelocityXEach(0);
    balloon.y = 200;
    restart.visible = true ;
 }
  spawnObstaclesTop();
  spawnObstaclesBottom();
  drawSprites();

}
function spawnObstaclesTop() {
  if(frameCount % 60 === 0) {
    obstacleTop = createSprite(400,50,40,50);
    obstacleTop.addImage(obsTop1);
    obstacleTop.scale = 0.1 ;
    obstacleTop.velocityX = -4 ;
    obstacleTop.y = Math.round(random(10,100));
    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1 : obstacleTop.addImage(obsTop1);
 
        break;
      case 2 : obstacleTop.addImage(obsTop2);

        break;

      default: 

        break;
    }
     topObstaclesGroup.add(obstacleTop);
  }
}
function spawnObstaclesBottom() {
  if(frameCount % 60 === 0) {
    obstacleBottom = createSprite(400,350,40,50);
    obstacleBottom.addImage(obsBot1);
    obstacleBottom.scale = 0.1 ;
    obstacleBottom.velocityX = -4 ;
   // obstacleBottom.x = Math.round(random(10,100));
    var rand = Math.round(random(1,3));
    switch (rand) {
      case 1 : obstacleBottom.addImage(obsBot1);
 
        break;
      case 2 : obstacleBottom.addImage(obsBot2);

        break;
             
      case 3 : obstacleBottom.addImage(obsBot3);

       break ;

      default: 

        break;
    }
     bottomObstaclesGroup.add(obstacleBottom);
  }
}
