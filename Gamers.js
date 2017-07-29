window.onload=init;

var map;
var Ctxmap;
var gameWidth = 1200;
var gameHight = 600;

var bg=new Image();
bg.src="bg.jpg"
var bg1=new Image();
bg1.src="bg.jpg"
var mapX=0;
var mapX1=gameWidth;

var pl;
var plCtx;
var plaer=new Image();
plaer.src="Player1.png"
var player; 
var health=4000;


var mouse;
var mouseCtx;
var mouseq=new Image();
mouseq.src="Player1.png"
var mousee;

var enemy;
var enemyCtx;
var enemies=[];
var enem=new Image();
enem.src="Картинки/Enemy.png"

var spawnInterval;
var spawnTime=9000;
var spawnAmount=5;

var stats;
var ctxStats;

var mouseX;
var mouseY;

var requestAnimFrame= window.requestAnimationFrame||
                       window.webkitRequestAnimationFrame||
                       window.mozRequestAnimationFrame||
                       window.oRequestAnimationFrame||
                       window.msRequestAnimationFrame;

var isPlaing;

function init()
 {	
	map=document.getElementById("Map");
	Ctxmap = map.getContext("2d");
	map.width = gameWidth;
	map.height = gameHight;

	pl=document.getElementById("Player");
	plCtx=pl.getContext("2d"); 
	player= new Player();
	pl.width=gameWidth;
	pl.height=gameHight;

	mouse=document.getElementById("Mouse");
    mouseCtx=mouse.getContext("2d"); 
	mousee= new Mouse();
	mouse.width=gameWidth;
    mouse.height=gameHight;

    enemy=document.getElementById("Enemy");
	enemyCtx=enemy.getContext("2d");
	enemy.width=gameWidth;
	enemy.height=gameHight;

	stats=document.getElementById("stats");
	ctxStats=stats.getContext("2d");
	stats.width=gameWidth;
	stats.height=gameHight;
	ctxStats.fillStyle="green";
	ctxStats.font="bold 15pt TimesNewRoman";

    startloop();

    document.addEventListener("mousemove", MoseMove, false);
    document.addEventListener("click", MouseClick, false);

 }

function loop()
 {
 if(isPlaing)
 {
	Draw();
	update();
	requestAnimFrame(loop);
 }
 }

function startloop()
 {
 isPlaing=true;
 loop();
 startCreatingEnimies();
 }

function stoploop() 
 {
	isPlaing=false;
 }

function update()
 {
	
	moveBg();
    player.update();

 for(var i=0; i<enemies.length;i++)
   {
   	 enemies[i].update();
   }
    updateStats();
    mousee.update();
 }

function moveBg()
 {
 	DrawBg();
	speedBg=4;
	mapX-=speedBg;
	mapX1-=speedBg;

	if(mapX+gameWidth<0){mapX=gameWidth-speedBg;}
	if(mapX1+gameWidth<0){mapX1=gameWidth-speedBg;}
 }



function Mouse()
 {
    this.srcX=0;
	this.srcY=0;
	this.drawX=500;
	this.drawY=220;
	this.width=10;
	this.height=10;
	
 }

Mouse.prototype.draw=function()
 {
 mouseCtx.clearRect(0, 0, gameWidth, gameHight);
 mouseCtx.drawImage(plaer, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
 }

Mouse.prototype.update=function()
 {
 
 if(this.drawX<-20){ this.drawX=-20;}
 if(this.drawY<0){ this.drawY=0;}
 if(this.drawX>gameWidth-this.width){ this.drawX=gameWidth-this.width;}
 if(this.drawY>gameHight-this.height){ this.drawY=gameHight-this.height;}
 this.Collision();
 }

Mouse.prototype.Collision=function()
 {
  for(var i=0; i<enemies.length;i++)
  {
   	 if(this.drawX >= enemies[i].drawX &&
   	 this.drawY >=enemies[i].drawY &&
   	 this.drawX <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY <= enemies[i].drawY+enemies[i].height )
   	 {
   	 	for(var j=1; j<4;j++)
   	 	{
         enemies[i].drawX=enemies[i].drawX-j;
         enemies[i].drawY=enemies[i].drawY-j;
         enemies[i].draw();
   	 	}
   	 }


   	 if(this.drawX+this.width >= enemies[i].drawX &&
   	 this.drawY+this.height >=enemies[i].drawY &&
   	 this.drawX+this.width  <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY+this.height <= enemies[i].drawY+enemies[i].height )
   	 {
   	 	 	for(var j=1; j<4;j++)
   	 	{
         enemies[i].drawX=enemies[i].drawX+j;
         enemies[i].drawY=enemies[i].drawY+j;
         enemies[i].draw();
     }
   	 
   	 }



   	 if(this.drawX+this.width >= enemies[i].drawX &&
   	 this.drawY>=enemies[i].drawY &&
   	 this.drawX+this.width  <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY <= enemies[i].drawY+enemies[i].height )
   	 {
   	 		for(var j=1; j<4;j++)
   	 	{
         enemies[i].drawX=enemies[i].drawX+j;
         enemies[i].draw();
     }
   	
   	 }



   	 if(this.drawX >= enemies[i].drawX &&
   	 this.drawY+this.height >=enemies[i].drawY &&
   	 this.drawX  <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY+this.height <= enemies[i].drawY+enemies[i].height )
   	 {

   	 		for(var j=1; j<4;j++)
   	 	{
         
         enemies[i].drawY=enemies[i].drawY+j;
         enemies[i].draw();
     }
   	 	

   	 }
 }
 }

   

function Player()
 {
    this.srcX=0;
	this.srcY=0;
	this.drawX=500;
	this.drawY=220;
	this.width=100;
	this.height=89;
	this.speed=5;
 }
Player.prototype.update=function()
 {
 
 if(this.drawX<-20){ this.drawX=-20;}
 if(this.drawY<0){ this.drawY=0;}
 if(this.drawX>gameWidth-this.width){ this.drawX=gameWidth-this.width;}
 if(this.drawY>gameHight-this.height){ this.drawY=gameHight-this.height;}
 this.Collision();
   }
Player.prototype.draw=function()
 {
 plCtx.clearRect(0, 0, gameWidth, gameHight);
 plCtx.drawImage(plaer, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
 }

Player.prototype.update=function()
 {
 
 if(this.drawX<-20){ this.drawX=-20;}
 if(this.drawY<0){ this.drawY=0;}
 if(this.drawX>gameWidth-this.width){ this.drawX=gameWidth-this.width;}
 if(this.drawY>gameHight-this.height){ this.drawY=gameHight-this.height;}
 this.Collision();
   }

Player.prototype.Collision=function()
 {
  for(var i=0; i<enemies.length;i++)
  {
   	 if(this.drawX >= enemies[i].drawX &&
   	 this.drawY >=enemies[i].drawY &&
   	 this.drawX <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY <= enemies[i].drawY+enemies[i].height )
   	 {
   	 	
   	  health--;
   	 }


   	 if(this.drawX+this.width >= enemies[i].drawX &&
   	 this.drawY+this.height >=enemies[i].drawY &&
   	 this.drawX+this.width  <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY+this.height <= enemies[i].drawY+enemies[i].height )
   	 {
   	
   	 	health--;
   	 }



   	 if(this.drawX+this.width >= enemies[i].drawX &&
   	 this.drawY>=enemies[i].drawY &&
   	 this.drawX+this.width  <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY <= enemies[i].drawY+enemies[i].height )
   	 {
   	 
   	 	health--;
   	 }



   	 if(this.drawX >= enemies[i].drawX &&
   	 this.drawY+this.height >=enemies[i].drawY &&
   	 this.drawX  <= enemies[i].drawX+enemies[i].width &&
   	 this.drawY+this.height <= enemies[i].drawY+enemies[i].height )
   	 {

   	 
   	 	health--;

   	 }

   	 	if(health<0)
 { 
 document.getElementById("pagename").innerHTML="Проигрыш";
 stoploop();	
 }

  
 }
 }


 


function Enemy()
 {
	this.srcX=0;
	this.SrcY=0;
	this.drawX=Math.floor(Math.random()*gameWidth)+gameWidth;
	this.drawY=Math.floor(Math.random()*gameHight);
	this.width=100;
	this.height=90;
    this.speed=5;
 }

Enemy.prototype.draw=function()
 {	
   enemyCtx.drawImage(enem, this.srcX, this.SrcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
 }

Enemy.prototype.update=function()
 {
	this.drawX-=this.speed;
	if(this.drawX+this.width<0)
	{
     this.destroy();
	}
	if(this.drawY>gameHight-this.height){this.drawY=gameHight-this.height;}	
 }



 
Enemy.prototype.destroy=function()
 {
	enemies.splice(enemies.indexOf(this), 1);
 }

function spawnEnemies(count)
 {
 for(var i =0; i<count; i++)
 {
   enemies[i]=new Enemy();
 }
 }

function startCreatingEnimies()
 {
 stopCreatingEnimies();
 spawnInterval=setInterval(function(){spawnEnemies(spawnAmount);},spawnTime);
 }

function stopCreatingEnimies()
 {
 clearInterval(spawnInterval);
 } 

function DrawBg()
 {  Ctxmap.clearRect(0, 0, gameWidth, gameHight);
	Ctxmap.drawImage(bg, 0, 0, 1200, 600, mapX, 0, 1200, 600);
	Ctxmap.drawImage(bg1, 0, 0, 1200, 600, mapX1, 0, 1200, 600);
 }

function Draw()
 {
   player.draw();
   enemyCtx.clearRect(0, 0, gameWidth, gameHight);
   for(var i=0; i<enemies.length;i++)
   {
   	 enemies[i].draw();
   }
   mousee.draw();
 }
	
function updateStats()
 {
		ctxStats.clearRect(0, 0, gameWidth, gameHight);
		ctxStats.fillText("Здоровье: "+((health/4000)*100).toFixed(2).toString()+"%", 10, 15);
 }

function MoseMove(e)
 {
    mouseX=e.pageX-map.offsetLeft;
    mouseY=e.pageY-map.offsetTop;
    mousee.drawX=mouseX-(mousee.width/2 );
 mousee.drawY=mouseY-(mousee.height/2 );
 }

function MouseClick(e)
 {
mousee.drawX=mouseX-(mousee.width/2 );
 mousee.drawY=mouseY-(mousee.height/2 );
 }
