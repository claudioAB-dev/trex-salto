var trex, trex_running, edges;
var groundImage, spriteGround, groundMov;
var wall;
var floor;
var nube;
var nubesimg;
var cactus, catuses;
var obstacle1, obstacle2, obstacle3, obstacle4;
var play=1, end=0;
var gamestate = play;
var scoore = 0;
var grupoCactus, grupoNubes;
var trexGameO, trexSalto;
var chequer = true;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage ("ground2.png")
  nubesimg = loadImage("cloud.png")
  obstacle1 = loadImage("img/obstacle1.png");
  obstacle2 = loadImage("img/obstacle2.png");
  obstacle3 = loadImage("img/obstacle3.png");
  obstacle4 = loadImage("img/obstacle6.png");
  trexGameO = loadAnimation("trex_collided.png");
  trexSalto = loadAnimation("trex1.png")
} 

function setup(){
  createCanvas(600,200);
  grupoCactus = createGroup();
  grupoNubes = createGroup();  
  spriteGround= createSprite(350,180 ,10,10)
  trex = createSprite(50,160,20,50);
  wall = createSprite(300,50,2000 ,10);
  floor = createSprite(60,190,2000,10);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("gameover", trexGameO);
  trex.addAnimation("salto", trexSalto);
  edges = createEdgeSprites ();
  spriteGround.velocityX= -5;
  spriteGround.addImage("imgground",groundImage)
  //agregar tamaño y posición al Trex
  trex.scale = 0.5; 
  trex.x = 50
  wall.visible =  false;
  floor.visible = false;
  trex.debug = true;
  
} 

function nube(){
  if(frameCount % 80 == 0){
  nubes = createSprite(650,Math.round(random(12, 50)),30,30);
  nubes.velocityX = -9;
  nubes.addImage("imgnube", nubesimg);
  nubes.lifetime= 90;
  grupoNubes.add(nubes)
  }
  }

  function cactus(){
    if(frameCount % 60 ==0){
      cactuse = createSprite(650,160,10,10);
      cactuse.velocityX = -9;
      cactuse.scale = 0.7  
      switch(Math.round(random(1,4))){
      case 1:
        cactuse.addImage("cactus1", obstacle1)

      break;
      case 2:
        cactuse.addImage("cactus2", obstacle2)
      break
      case 3:
        cactuse.addImage("cactus3", obstacle3)
      break;
      case 4:
        cactuse.addImage("cactus4", obstacle4)
      break;

      default:
        break;
      }
      cactuse.lifetime = 90;
      grupoCactus.add(cactuse);
      cactuse.debug=true;
    }
  }
function draw(){ 
 

  
  background("#fffff"); 
  drawSprites();

  textSize(20)
  text(Math.round(scoore), 10, 20);
  


  if(spriteGround.x<0){
     spriteGround.x=300
  }
  if(gamestate == play){

    cactus();
    nube();
    scoore = scoore + 0.1;
    if(trex.collide(floor)){
      if(keyDown("space")){
        //trex.changeAnimation("trexSalto")
        trex.velocityY = -10;
        
      }

    }

    else{
    trex.changeAnimation("trexSalto")   
    chequer = false;
    }
    


    if(keyDown(40)){
      trex.velocityY = trex.velocityY +  5;
    }
    trex.velocityY = trex.velocityY + 0.5;
    
    if(trex.isTouching(grupoCactus)){
      gamestate = end;
    }
  }

  else{
    trex.changeAnimation("gameover")
    spriteGround.velocityX=0
    grupoCactus.setVelocityXEach(0);
    grupoNubes.setVelocityXEach(0);
    trex.velocityY = trex.velocityY + 0.5;
    grupoCactus.setLifetimeEach(-1)
    grupoNubes.setLifetimeEach(-1)
  }



  
  //hacer que el  Trex salte al   presionar la barra espaciadora 

  //evitar que el Trex caiga

  /////Comentar la función nube extra
  //nube()

  ///////Movemos los collides al final de la función draw para darle prioridad al condicional de salto
  trex.collide(wall);
  trex.collide(edges[3]);
  trex.collide(floor);
  
}

