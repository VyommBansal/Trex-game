var trexCollided,trex,trexRunning,ground,groundImg,invisGround,cloud,cloudImg,o1,o2,o3,o4,o5,o6,gameOver,restart,gameOImg,resImg,score ;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
score=0;

 var ObstaclesGroup, CloudsGroup, Died,CheckPoint,jump
   
function preload(){
trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  trexCollided=loadAnimation("trex_collided.png");

 groundImg=loadImage("ground2.png") 
  cloudImg=loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
   o2=loadImage("obstacle2.png")
   o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
  gameOImg=loadImage("gameOver.png")
  resImg=loadImage("restart.png")
  Died=loadSound("die.mp3")
  CheckPoint=loadSound("checkPoint.mp3")
 jump=loadSound("jump.mp3")
}

function setup() {
  createCanvas(800,300);
  trex=createSprite(80,280);
  trex.addAnimation("running",trexRunning)
  trex.addAnimation("hit",trexCollided)

  trex.scale=0.5;
  
  ground=createSprite(400,280,800,10)
  ground.addImage(groundImg)
  
  gameOver=createSprite(400,80)
  gameOver.addImage(gameOImg)
  gameOver.scale=0.5;
  
  
  restart=createSprite(400,140)
  restart.addImage(resImg)
  restart.scale=0.5;
 
invisGround=createSprite(400,285,800,2)
 invisGround.visible=false 
  
  ObstaclesGroup=new Group();
  CloudsGroup=new Group();

}


function draw() {
  
  background(255);
  text("score= "+score,100,100)
  if(gameState===PLAY){
  ground.velocityX=-(6 + 3*score/100);;
  if(ground.x<0){
  ground.x=ground.width/2
  }
     if(keyDown("space") && trex.y >= 260){
      trex.velocityY = -12 ;
       jump.play();
       
   }
    
    if (score>0 && score%100 === 0){
      CheckPoint.play(); 
    }
    
      trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    spawnObstacles();
    
    gameOver.visible=false;
     restart.visible=false;
    
    score = score + Math.round(getFrameRate()/60);
    
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      Died.play();
    }
    
  }else if(gameState===END){
  ground.velocityX=0
     trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
 
    trex.changeAnimation("hit",trexCollided)
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    
gameOver.visible=true;
restart.visible=true;
    
    if(mousePressedOver(restart)){
    gameState=PLAY;
    ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
    
    trex.changeAnimation("running",trexRunning)
    score=0;
    
    }
    
  }
  
  
 trex.collide(invisGround)
  
  
  
  drawSprites();
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(800,320,40,10);
    cloud.y = random(180,220);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 267;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
    //cloud.velocityX = -(6+count*3 /100);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,265,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand =Math.round(random(1,6)) ;
    console.log(rand)
    // obstacle.setAnimation("obstacle" + rand);
    switch(rand){
      case 1: obstacle.addImage(o1 );
        break;
         case 2: obstacle.addImage(o2 );
        break;
         case 3: obstacle.addImage(o3 );
        break;
         case 4: obstacle.addImage(o4 );
        break;
         case 5: obstacle.addImage(o5 );
        break;
         case 6: obstacle.addImage(o6 );
        break;
        default:break; 
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 134 ;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
    
    
  }     
}
 
 

