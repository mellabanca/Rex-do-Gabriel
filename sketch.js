var Rex, RexCorrendo;
var chao;
var chao2;
var grama;
var nuvem;
var nuvemImagem;
var I1,I2,I3,I4,I5,I6;
var placar=0;
var grupoInimigos;
var grupoNuvens;
var JOGANDO = 1;
var ACABOU = 0;
var estado = JOGANDO;
var morreu;
var restart;
var imagemRestart;
var gameover;
var imagemGameover;
var pular;
var derrota;
var checkpoint;

function preload(){
RexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
grama= loadImage('ground2.png');
nuvemImagem=loadImage('cloud.png');
I1=loadImage('obstacle1.png');
I2=loadImage('obstacle2.png');
I3=loadImage('obstacle3.png');
I4=loadImage('obstacle4.png');
I5=loadImage('obstacle5.png');
I6=loadImage('obstacle6.png');
morreu=loadAnimation('trex_collided.png');
imagemRestart=loadImage('restart.png');
imagemGameover=loadImage('gameOver.png');
pular=loadSound('jump.mp3');
derrota=loadSound('die.mp3');
checkpoint=loadSound('checkPoint.mp3');
}

function setup(){
createCanvas(600,200);
Rex = createSprite(50, 160, 20, 50);
Rex.addAnimation("correndo", RexCorrendo);
Rex.addAnimation('morreu',morreu);
Rex.scale = 0.5;

borda = createEdgeSprites();

chao=createSprite(200,180,400,20);
chao.addImage('grama',grama);
chao.x=chao.width/2;

chao2=createSprite(200,190,400,10);
chao2.visible=false;

var numero = Math.round(random(1, 100));
console.log(numero);

grupoInimigos = new Group();
grupoNuvens = new Group();

//Rex.debug = true;
Rex.setCollider("circle",0,0,40);

/*gameover=createSprite(300,100);
gameover.addImage(imagemGameover);
restart=createSprite(300,150);
restart.addImage(imagemRestart);
restart.scale=0.8;*/


}

function draw(){
background("white");
//console.log(Rex.y);
console.log("estado do jogo:"+estado);

if(estado === JOGANDO){
    chao.velocityX=-2;
    if(keyDown("space")&&Rex.y>=155){
        Rex.velocityY = -12;
        pular.play();
    }
if(chao.x<0){
    chao.x=chao.width/2;
}
Rex.velocityY += 1;
placar+=Math.round(frameCount/60);
nuvens();
inimigos();
if(grupoInimigos.isTouching(Rex)){
    estado=ACABOU;
    derrota.play();
}
if(placar > 0 && placar % 100 === 0){
    checkpoint.play();
}




    
} else if (estado === ACABOU){
    Rex.changeAnimation("morreu");
chao.velocityX=0;
Rex.velocityY=0;
grupoInimigos.setVelocityXEach(0);
grupoNuvens.setVelocityXEach(0);
grupoInimigos.setLifetimeEach(-1);
grupoNuvens.setLifetimeEach(-1);
}






Rex.collide(chao2);



drawSprites();
textSize(15);
textFont('Courier New');
text(placar,500,50);



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

        grupoNuvens.add(nuvem);
    }
 
}
function inimigos(){
    if(frameCount%60===0){
        var inimigo=createSprite(600,165,10,40);
        inimigo.velocityX=-6;
        var x=Math.round(random(1,6));
        switch(x){
            case 1:inimigo.addImage(I1);
            break;
            case 2:inimigo.addImage(I2);
            break;
            case 3:inimigo.addImage(I3);
            break;
            case 4:inimigo.addImage(I4);
            break;
            case 5:inimigo.addImage(I5);
            break;
            case 6:inimigo.addImage(I6);
            break;
            default:break;
        }
        inimigo.scale=0.5;
        inimigo.lifetime=300;

        grupoInimigos.add(inimigo);
    }
}