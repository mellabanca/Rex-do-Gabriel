var Rex, RexCorrendo;
var chao;
var chao2;
var grama;
var nuvem;
var nuvemImagem;

function preload(){
RexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
grama= loadImage('ground2.png');
nuvemImagem=loadImage('cloud.png');
}

function setup(){
createCanvas(600,200);
Rex = createSprite(50, 160, 20, 50);
Rex.addAnimation("correndo", RexCorrendo);
Rex.scale = 0.5;

borda = createEdgeSprites();

chao=createSprite(200,180,400,20);
chao.addImage('grama',grama);
chao.x=chao.width/2;

chao2=createSprite(200,190,400,10);
chao2.visible=false;

var numero = Math.round(random(1, 100));
console.log(numero);
}

function draw(){
background("white");
//console.log(Rex.y);

chao.velocityX=-2;
if(chao.x<0){
chao.x=chao.width/2;
}

if(keyDown("space")&&Rex.y>=150){
Rex.velocityY = -10;
}
Rex.velocityY += 1;
Rex.collide(chao2);

nuvens();

drawSprites();
}

function nuvens(){
    if(frameCount%60===0){
        nuvem=createSprite(600,100,40,10);
        nuvem.addImage(nuvemImagem);
        nuvem.y=Math.round(random(1,120));
        nuvem.scale=0.6
        nuvem.velocityX=-3;

        nuvem.lifetime = 250;

        nuvem.depth=Rex.depth;
        Rex.depth+=1;
    }
 
}