var Rex, RexCorrendo;

function preload(){
  RexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");

}

function setup(){
  createCanvas(600,200);
  Rex = createSprite(50, 160, 20, 50);
  Rex.addAnimation("correndo", RexCorrendo);
  Rex.scale = 0.5;
  borda = createEdgeSprites();
}

function draw(){
  background("white");
  
  if(keyDown("space")){
    Rex.velocityY = -10;
  }
  Rex.velocityY += 1;

  Rex.collide(borda[3]);
  drawSprites();
}
