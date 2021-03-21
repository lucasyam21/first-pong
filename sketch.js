function preload(){
  backgroundSound = loadSound("trilha.mp3");
  pointSound = loadSound("ponto.mp3");
  hitSound = loadSound("raquetada.mp3");
}

//Variáveis bola
let xBall = 300;
let yBall = 200;
let dBall = 14;
let rBall = dBall/2;

//Velocidade da bola
let Velx = 5;
let Vely = 5;

//Variáveis da Raquete
let xRaq = 2;
let yRaq = 150;
let wRaq = 10;
let hRaq = 90;

//Variáveis da Raquete Oponente
let xOpRaq = 580;
let yOpRaq = 150;
let yVelOp;

let hit = false;

let Points = 0;
let OpPoints = 0;
let Miss = 0;

//Criar o background
function setup() {
  createCanvas(600, 400);
  backgroundSound.loop();
}
//Mostra o que foi criado nas funções
function draw() {
  background(0);
  showBall();
  moveBall();
  Colision();
  showRaq(xRaq, yRaq);
  showRaq(xOpRaq, yOpRaq);
  moveRaq();
  //colRaq();
  hitRaq(xRaq, yRaq);
  hitRaq(xOpRaq, yOpRaq);
  moveOpRaq();
  scoreboard();
  score();
  
  //Sons do Jogo
  let hitSound;
  let pointSound;
  let backgroundSound;
  
  
}
//Desenha a bola no cenário
function showBall(){
  circle(xBall,yBall,dBall);
  }

//Movimenta a Bola
function moveBall(){
  xBall += Velx
  yBall += Vely
}

//Calcula a colisão da bola com as bordas
function Colision(){
  if (xBall + rBall > width ||
     xBall - rBall < 0){
    Velx *= -1;
  }
  
  if (yBall + rBall > height ||
     yBall - rBall <0){
    Vely *= -1;
  }
}

function showRaq(x,y){
  
  rect(x, y,wRaq,hRaq)
  
}

//Chance do Oponente Errar
function MissChance() {
  if (OpPoints >= Points) {
    Miss += 1
    if (MissChance >= 39){
    Miss = 40
    }
  } else {
    Miss -= 1
    if (MissChance <= 35){
    Miss = 35
    }
  }
}

//Movimenta a Raquete
function moveRaq(){
  
  if (keyIsDown(UP_ARROW)){
      yRaq -= 10;
      }
  
  if (keyIsDown(DOWN_ARROW)){
    
      yRaq += 10;
      }
}

function moveOpRaq(){
  yVelOp = yBall - yOpRaq - wRaq /2 - 50;
  yOpRaq += yVelOp + Miss
  MissChance();
  
}


//Colisão da Bola na Raquete
function colRaq(){
    if (xBall - rBall < xRaq + wRaq && yBall - rBall < yRaq + hRaq && yBall + rBall > yRaq){
    Velx *= -1
      hitSound.play();
  }
}


function hitRaq (x, y){
  hit = collideRectCircle(x, y, wRaq, hRaq, xBall, yBall, rBall);
  if (hit){
    Velx *= -1
    hitSound.play();
  }
}

function scoreboard(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150,10,40,20);
  fill(255);
  text(Points, 170, 26);
  fill(color(255, 140, 0));
  rect(450,10,40,20);
  fill(255);
  text(OpPoints, 470, 26)
}

function score(){
  if (xBall > 590){
    Points += 1;
    pointSound.play();
  }
  if (xBall < 10){
    OpPoints += 1;
    pointSound.play();
  }
}
