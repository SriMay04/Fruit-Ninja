var swordImage, monsterImage, fruit1Image, fruit2Image, fruit3Image, fruit4Image, gameOverImage;
var sword;
var fruitGroup;
var enemyGroup;
var score;
var monster;
var PLAY=1;
var END=0;
var gameState=1
function preload(){
  swordImage=loadImage("sword.png")
  monsterImage=loadAnimation("alien1.png","alien2.png")
  
  //fruit images
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  
  gameOverImage=loadImage("gameover.png")
 
}

function setup(){
  
  sword=createSprite(200,200,10,10)
  sword.addImage(swordImage)
  sword.scale=0.7
  
  fruitGroup= new Group();
  enemyGroup= new Group();
  
  score=0;
}

function draw(){
 
  background("#84D6F4") 
  
  //moving the sword
  sword.x=mouseX
  sword.y=mouseY
  
  fruits();
  
  Enemy();
  
    

   if(gameState===PLAY){
      if(sword.isTouching(enemyGroup)){
        fruitGroup.setLifetimeEach(-1)
        gameOver=createSprite(200,200,20,20);
        gameOver.addImage(gameOverImage);
        gameState=END;
        sword.visible=false
      }
     
     //earning points
    if(sword.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      score=score+1
  }
    }
  
  if(gameState===END){
     enemyGroup.destroyEach();
     fruitGroup.destroyEach();
     enemyGroup.setVelocityXEach(0);
     fruitGroup.setVelocityXEach(0);
     sword.visible=false
     }
  
  //displaying score
  text("Score:"+score,300,50)
  

  
  drawSprites();
}


//function for displaying the fruits
function fruits(){
//producing fruits when frameCount is divisible by 80
  if(World.frameCount%80===0){
    var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2
    //displaying random fruits
    r=Math.round(random(1,4))
    if (r===1){
      fruit.addImage(fruit1); 
    } else if(r===2){
      fruit.addImage(fruit2)
    } else if(r===3){
      fruit.addImage(fruit3)
    } else if(r===4){
      fruit.addImage(fruit4)
    }
    
    //random position of fruits
    fruit.y=Math.round(random(50,340));
    
    //speed of fruits
    fruit.velocityX=-9;
    fruit.setLifetime=100;
  
    fruitGroup.add(fruit);
  }
}

//displaing the monster
function Enemy(){
  //producing a monster when frameCount is divisible by 200 
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    
    //random position for monster
    monster.y=Math.round(random(100,300));
    
    //speed for montster
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
  
}