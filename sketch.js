/*

Game Project.

This is my Game project and using javascript and the p5 library we have built this game project, It was an extremely valuable experience. 
I learnt the basics of programming, along with some advanced concepts like factory patterns and dynamically adding and removing elements in an array. The tutorials that were provided by the course team were extremely helpful, The basic structure of the game was not very difficult to develop but the extensions were challenging, I have added two out of three extensions as instructed in the submission guidelines. I have added the sound effects as well as the platforms. The factory pattern used to add platforms was difficult to grasp but after a lot of practice, I was able to complete it. Also, I used online resources to add sound effects to my projects for various sounds.

*/

  




// Character position and state variables
var gameChar_x;
var gameChar_y;
var floorPosition_y;
var scrollPos;
var gameChar_world_x;
var game_score;
var lives;

// Character movement flags
var isLeft;
var isRight;
var isFalling;
var isPlummeting;


// Sound effects
var jumpSound;
var collectableSound;
var flagpoleSound;
var falling;
var backgroundSound;
var plateforms;




// Game elements
var cloudObjects;
var mountainObjects;
var treeObjects;
var canyonObjects; 
var collectableObjects;
var flagPole;

var playing;

/*
  Preloading Assets:
  ------------------
  The preload function is responsible for loading sound assets before the game starts.
  This ensures that the game runs smoothly without delays caused by loading times during gameplay.
*/

function preload()
{
     soundFormats("mp3", "wav");
     jumpSound = loadSound("assets/jump.wav");
     collectableSound = loadSound("assets/collectable.wav");
     flagpoleSound = loadSound("assets/flagpoleSound.wav");
     falling = loadSound("assets/falling.mp3");
     backgroundSound = loadSound("back.mp3");

}


/*
  Setup Function:
  ---------------
  The setup function initializes the canvas, sets initial game states,
  and starts the game by calling the startGame function.
*/

function setup()
{
	createCanvas(1024, 576);
    lives = 3;
    jumpSound.setVolume(0.2);
    collectableSound.setVolume(0.2);
    flagpoleSound.setVolume(0.2);
    falling.setVolume(0.2);
    collectableSound.setVolume(0.2);
    playing = false;
    startGame();
 
}

/*
  Start Game Function:
  --------------------
  This function sets the initial state for the game, including character position,
  game score, and initializes game elements like platforms and obstacles.
*/

function startGame()
{
    floorPosition_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPosition_y-40;
    game_score = 0;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

// Initialize scenery objects arrays
    
        treeObjects = [-400, 
                       80,
                       300,
                       500,
                       1000,
                       1200,
                       1400,
                       1600,
                       2000,
                       2250,
                       2400,
                
                       2750,
                       3250,
                       3530
                       
                       
                       
                      ];
        
        cloudObjects = [{spot_x:-300 , spot_y:150}, 
                        {spot_x:-180 , spot_y:400}, 
                        {spot_x:100 , spot_y:200},
                        {spot_x:400 , spot_y:100},
                        {spot_x:800 , spot_y:200},
                        {spot_x:1000 , spot_y:250}, 
                        {spot_x:1370 , spot_y:150}, 
                        {spot_x:1600 , spot_y:40}, 
                        {spot_x:1250 , spot_y:100},
                       {spot_x:1850 , spot_y:180},
                       {spot_x:2250 , spot_y:100},
                       {spot_x:2450 , spot_y:140},
                       {spot_x:2750 , spot_y:100},
                       {spot_x:2900 , spot_y:160},
                       {spot_x:3250 , spot_y:140},
                       {spot_x:3500 , spot_y:150}];
        
        mountainObjects = [{spot_x: -300 , height: 400},
                           {spot_x:100 , height:200}, 
                           {spot_x:190 , height:250}, 
                           {spot_x:300 , height:300}, 
                           {spot_x:600 , height:400}, 
                           {spot_x:1200 , height:300}, 
                           {spot_x:1400 , height:150},
                           {spot_x:1620 , height:350},
                          {spot_x:2220 , height:350},
                           {spot_x:2440 , height:150},
                           {spot_x:2600 , height:200},
                           {spot_x:3400 , height:250},
                           {spot_x:3600 , height:300},
                           {spot_x:3800 , height:250}
                           
                          
                          
                          
                          ];
    
        canyonObjects = [{canyonSpot_x:-75, canyonWidth: 50, canyonHeight:height * 3/4},
                        {canyonSpot_x:900, canyonWidth: 50, canyonHeight:height * 3/4},
                         {canyonSpot_x:1900, canyonWidth: 50, canyonHeight:height * 3/4},
                         {canyonSpot_x:2910, canyonWidth: 50, canyonHeight:height * 3/4},
                         {canyonSpot_x:3010, canyonWidth: 50, canyonHeight:height * 3/4},
                         {canyonSpot_x:2710, canyonWidth: 50, canyonHeight:height * 3/4},
                         {canyonSpot_x:3210, canyonWidth: 50, canyonHeight:height * 3/4}
                        ];



        //initialize array of objects 
        collectableObjects = [  {base:-200, isFound:false, height:floorPosition_y-90}, 
                                {base:110, isFound:false, height:floorPosition_y-110} , 
                                {base:240, isFound:false, height:floorPosition_y-190} , 
                                {base:340, isFound:false, height:floorPosition_y-30} , 
                                {base:600, isFound:false, height:floorPosition_y-30} , 
                                {base:730, isFound:false, height:floorPosition_y-115} , 
                                {base:880, isFound:false, height:floorPosition_y-130} , 
                                 
                                {base:970, isFound:false, height:floorPosition_y-30} ,  
                                {base:1200, isFound:false, height:floorPosition_y-230},     
                                
                                {base:1600, isFound:false, height:floorPosition_y-160},     
                                
                                {base:1900, isFound:false, height:floorPosition_y-200},
                              {base:2200, isFound:false, height:floorPosition_y-200},
                              {base:2400, isFound:false, height:floorPosition_y-180},
                              {base:2600, isFound:false, height:floorPosition_y-230},
                              {base:2800, isFound:false, height:floorPosition_y-240},
                              {base:2800, isFound:false, height:floorPosition_y-30},
                              {base:3000, isFound:false, height:floorPosition_y-240},
                              {base:2990, isFound:false, height:floorPosition_y-30},
                              {base:3220, isFound:false, height:floorPosition_y-240},
                              {base:3320, isFound:false, height:floorPosition_y-230},
                              {base:3300, isFound:false, height:floorPosition_y-240},{base:3260, isFound:false, height:floorPosition_y-240},{base:3280, isFound:false, height:floorPosition_y-240}
                              
                              
                              
                              
                             ];
    
    
    // Initialize platforms and the flagpole
    
    plateforms = [];
    plateforms.push(createPlateforms(100,floorPosition_y-80,100));
    plateforms.push(createPlateforms(180,floorPosition_y-160,100));
    plateforms.push(createPlateforms(700,floorPosition_y-80,100));
    plateforms.push(createPlateforms(950,floorPosition_y-80,100));
    plateforms.push(createPlateforms(1050,floorPosition_y-150,100));
    plateforms.push(createPlateforms(1150,floorPosition_y-190,100));
    plateforms.push(createPlateforms(1350,floorPosition_y-80,100));
    plateforms.push(createPlateforms(1550,floorPosition_y-130,100));
    plateforms.push(createPlateforms(1850,floorPosition_y-80,100));
    plateforms.push(createPlateforms(2070,floorPosition_y-120,100));
    plateforms.push(createPlateforms(2290,floorPosition_y-140,100));
    
     plateforms.push(createPlateforms(2490,floorPosition_y-80,100));
     plateforms.push(createPlateforms(2690,floorPosition_y-120,100));
     
     plateforms.push(createPlateforms(2840,floorPosition_y-180,100));
    
    plateforms.push(createPlateforms(3040,floorPosition_y-200,100));
    

flagPole = {isReached:false , xPose: 3500};




}

/*
  Draw Function:
  --------------
  The core game loop function. It is called repeatedly and is responsible for
  drawing the game frame by frame. It updates game elements and checks for game events.
*/


function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPosition_y, width, height/4); // draw some green ground
    
    push();   
    translate(scrollPos,0);   // Translating the scene for scroll effect
    
	// Drawing game elements
    
    drawClouds();  // Draw clouds.
    
    drawMountain();  // Draw mountains.

    drawTrees();  // Draw trees.
    
    // Drawing and checking platforms and canyons
    
    for(var i = 0 ; i < plateforms.length ; i++)
        {
            plateforms[i].draw();
        }

	// Draw canyons.
    for(var i = 0 ; i<canyonObjects.length ; i++)
    {
        
       drawCanyon(canyonObjects[i]);
       checkCanyon(canyonObjects[i]); 
    }
    

	// Drawing and checking collectable items
    
    for(var i = 0 ; i<collectableObjects.length ; i++)
        {
            if(collectableObjects[i].isFound == false)
                {
            drawCollectable(collectableObjects[i]);
            checkCollectable(collectableObjects[i]);
                }
        }
    
    // Additional game element functions
    renderFlagpole();
    pop();

	// Draw game character.
	
	drawGameChar();
    
    // Displaying game score and lives
    
    fill(255);
    noStroke();
    textSize(26);
    text("Game Score: "+game_score,20,25);  //Game Score
    
    //Lives
    fill(255);
    noStroke();
    textSize(26);
    text("Lives: ", 280,25);
    if(lives == 3)
        {
            fill(220,20,60);
            ellipse(380, 16 , 23 );
            
            fill(255,255,0);
            ellipse(410, 16 , 23 );
            
            fill(0,128,0);
            ellipse(440, 16 , 23 );

            
        } if(lives == 2 )
            {
                
                fill(220,20,60);
                ellipse(380, 16 , 23 );
                
                fill(255,255,0);
                ellipse(410, 16 , 23 );
                
            } if(lives == 1 ){
                fill(220,20,60);
                ellipse(380, 16 , 23 );
                     
                     }
    
    //Handling lives display and checking game over conditions
    
    if(lives< 1)     //Check if you have run out of lives
        {
    fill(255);
    noStroke();
    textSize(26);
    text("GAME OVER", width/2,height/2)
            return;
        }
    else
        if(flagPole.isReached)//Flagpole Reached
           {   
                fill(255);
                noStroke();
                textSize(26);
                text("LEVEL COMPLETE", width/2,height/2);
                text("PRESS SPACE TO CONTINUE", width/2-50,height/2+40)
               
               return;
               
           
           }
    
    checkPlayerDie();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			if(!isPlummeting)
            gameChar_x -= 4;
		}
		else
		{
            if(!isPlummeting)
			scrollPos += 4;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
            if(!isPlummeting)
			gameChar_x  += 4;
		}
		else
		{
            
            if(!isPlummeting)    
            scrollPos -= 4; // negative for moving against the background.
		}
	}

	// Logic to make the game character rise and fall.
    if(gameChar_y<floorPosition_y-40)
        {
            var onTop = false;
            for(var i = 0 ; i < plateforms.length ; i++)
                {
                    if(plateforms[i].checkOnTop(gameChar_world_x , gameChar_y))
                        {
                            onTop = true;
                            isFalling = false;
                            isPlummeting = false;
                            break;
                        }
                }
            
            
            
            
            
            if(onTop == false)
                {
            isFalling = true;
            gameChar_y+=2;
                }
        }
    else
    {
       isFalling = false; 
    }
    
    if(isPlummeting)
        gameChar_y+=4
    
    
    
    if(flagPole.isReached==false)
        {
            checkFlagpole();
        }
    

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// -----------------------------------------------
// Key control functions for handling player input
// -----------------------------------------------

function keyPressed(){

    if(lives == 0 && keyCode == 32)
       {
        document.location.reload(true);
           return;
       }
    if (flagPole.isReached && keyCode == 32) {
    document.location.reload(true);
    return;
  }
    
    
    // if statements to control the animation of the character when
	// keys are pressed.
    if( keyCode == 37 )
    {
        if(!playing)
                {
                    backgroundSound.loop();
                    playing=true;
                }
            
        
        isLeft = true;
    }
    else if( keyCode == 39)
        {
            if(!playing)
                {
                    backgroundSound.loop();
                    playing=true;
                }
            
            isRight = true;
        }
    else if ( keyCode == 32 || keyCode == 38 )
        {
            if(!playing)
                {
                    backgroundSound.loop();
                    playing=true;
                }
            
            if(!isFalling && !isPlummeting && !flagPole.isReached) 
            {
                
                jumpSound.play();
                gameChar_y = gameChar_y-110;
            }
              
        }
}

function keyReleased()  //// Logic for key release events
{

	

    // if statements to control the animation of the character when
	// keys are released.
    if( keyCode == 37)
        {
            isLeft = false;
        }
    else if ( keyCode == 39)
        {
            isRight = false;
        }
}


// ----------------------------------------------------------------------------------------------------
// Rendering functions for drawing the game character, clouds, mountains, trees, canyons, collectables
// ----------------------------------------------------------------------------------------------------

// Function to draw the game character on various positions .

function drawGameChar()
{
	// draw game character
    
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        
        fill(0);
        rect(gameChar_x+11,gameChar_y-3,3,15);
        fill(200);
        rect(gameChar_x, gameChar_y,15,30);
        fill(0)
        rect(gameChar_x+4,gameChar_y+30,3,10);
        rect(gameChar_x+9,gameChar_y+28,3,12);
            fill(150);
        ellipse(gameChar_x+7,gameChar_y-5,20,22);
        fill(0);
        ellipse(gameChar_x,gameChar_y-8,4,3);
        ellipse(gameChar_x+10,gameChar_y-8,4,3);
        fill(0);
        rect(gameChar_x+11,gameChar_y-3,3,15);
        triangle(gameChar_x-1,gameChar_y-1,gameChar_x+10,gameChar_y-1,gameChar_x+6,gameChar_y-4);
    
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(0);
        rect(gameChar_x+2,gameChar_y-3,3,15);
        fill(200);
        rect(gameChar_x, gameChar_y,15,30);
        fill(0)
        rect(gameChar_x+4,gameChar_y+28,3,12);
        rect(gameChar_x+9,gameChar_y+30,3,10);
        fill(150);
        ellipse(gameChar_x+8,gameChar_y-5,20,22);
        fill(0);
        ellipse(gameChar_x+5,gameChar_y-8,4,3);
        ellipse(gameChar_x+15,gameChar_y-8,4,3);
        fill(0);
        rect(gameChar_x+2,gameChar_y-3,3,15);
        triangle(gameChar_x+7,gameChar_y-1,gameChar_x+16,gameChar_y-1,gameChar_x+10,gameChar_y-4);

	}
	else if(isLeft)
	{
		// add your walking left code
        fill(200);
        rect(gameChar_x, gameChar_y,15,30);
        fill(0)
        rect(gameChar_x+4,gameChar_y+30,3,10);
        rect(gameChar_x+9,gameChar_y+28,3,12);
        fill(20,40,60);
        rect(gameChar_x-10,gameChar_y+8,10,3);
        rect(gameChar_x+6,gameChar_y+8,3,15);
        fill(150);
        ellipse(gameChar_x+7,gameChar_y-5,20,22);
        fill(0);
        ellipse(gameChar_x,gameChar_y-8,4,3);
        ellipse(gameChar_x+10,gameChar_y-8,4,3);
        triangle(gameChar_x-1,gameChar_y-1,gameChar_x+10,gameChar_y-1,gameChar_x+6,gameChar_y-4);

	}
	else if(isRight)
	{
		// add your walking right code
        fill(200);
        rect(gameChar_x, gameChar_y,15,30);
        fill(0)
        rect(gameChar_x+4,gameChar_y+28,3,12);
        rect(gameChar_x+9,gameChar_y+30,3,10);
        fill(20,40,60);
        rect(gameChar_x+15,gameChar_y+8,10,3);
        rect(gameChar_x+6,gameChar_y+8,3,15);

        fill(150);
        ellipse(gameChar_x+8,gameChar_y-5,20,22);
        fill(0);
        ellipse(gameChar_x+5,gameChar_y-8,4,3);
        ellipse(gameChar_x+15,gameChar_y-8,4,3);
        triangle(gameChar_x+6,gameChar_y-1,gameChar_x+16,gameChar_y-1,gameChar_x+10,gameChar_y-4);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(200);
        rect(gameChar_x, gameChar_y,20,30);
        fill(0)
        rect(gameChar_x+4,gameChar_y+30,5,10);
        rect(gameChar_x+11,gameChar_y+30,5,10);
        fill(150);
        ellipse(gameChar_x+10,gameChar_y-5,20,20);
        fill(0);
        ellipse(gameChar_x+5,gameChar_y-8,4,3);
        ellipse(gameChar_x+15,gameChar_y-8,4,3);
        triangle(gameChar_x+4,gameChar_y-1,gameChar_x+16,gameChar_y-1,gameChar_x+10,gameChar_y-4);
        fill(20,40,60);
        rect(gameChar_x-4,gameChar_y+3,4,5);
        rect(gameChar_x-4,gameChar_y-15,3,20);
        rect(gameChar_x+20,gameChar_y+3,4,5);
        rect(gameChar_x+21,gameChar_y-15,3,20);

	}
	else
	{
		// add your standing front facing code
        fill(200)
        rect(gameChar_x, gameChar_y,20,30);
        fill(0)
        rect(gameChar_x+4,gameChar_y+30,5,10);
        rect(gameChar_x+11,gameChar_y+30,5,10);
        fill(150);
        ellipse(gameChar_x+10,gameChar_y-5,20,20);
        fill(0);
        ellipse(gameChar_x+5,gameChar_y-8,4,3);
        ellipse(gameChar_x+15,gameChar_y-8,4,3);
        triangle(gameChar_x+4,gameChar_y-1,gameChar_x+16,gameChar_y-1,gameChar_x+10,gameChar_y-4);
        fill(20,40,60);
        rect(gameChar_x-3,gameChar_y+3,3,5);
        rect(gameChar_x-4,gameChar_y+3,3,20);
        rect(gameChar_x+20,gameChar_y+3,3,5);
        rect(gameChar_x+21,gameChar_y+3,3,20);
    }
}


// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0 ; i<cloudObjects.length ; i++)
            {
                fill(255);
                ellipse(cloudObjects[i].spot_x, cloudObjects[i].spot_y,55,55); // anchoring
                ellipse(cloudObjects[i].spot_x+25, cloudObjects[i].spot_y,35,35);
                ellipse(cloudObjects[i].spot_x+45, cloudObjects[i].spot_y,25,25);


            }
}

// Function to draw mountains objects.
function drawMountain()
{
    for(var i = 0 ; i < mountainObjects.length ; i++)
            {
                    fill(192, 192, 192);
                      triangle(mountainObjects[i].spot_x- mountainObjects[i].height/2, floorPosition_y ,

                         mountainObjects[i].spot_x , floorPosition_y-mountainObjects[i].height ,

                        mountainObjects[i].spot_x + mountainObjects[i].height/2 ,floorPosition_y);
            }
}

// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0 ; i< treeObjects.length ; i++ )
            {
                fill(100,50,0)
                rect( treeObjects[i]+75, -200/2 + floorPosition_y , 50 , 200/2)//anchoring

                fill(0,100,0);
                triangle(treeObjects[i]+25, -200/2 + floorPosition_y , 
                treeObjects[i]+100, -200+floorPosition_y , 
                treeObjects[i]+ 175, -200/2 + floorPosition_y);

                triangle(treeObjects[i]+25, -200/4 + floorPosition_y , 
                treeObjects[i]+100, -200 * 3/4+floorPosition_y , 
                treeObjects[i]+ 175, -200/4 + floorPosition_y);



            }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
   fill(100, 155, 255); rect(t_canyon.canyonSpot_x,floorPosition_y,t_canyon.canyonWidth,t_canyon.canyonHeight);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    var played=false;
    if(gameChar_world_x>t_canyon.canyonSpot_x && gameChar_world_x <t_canyon.canyonSpot_x+t_canyon.canyonWidth-15 && gameChar_y+40==floorPosition_y)
        {
            isPlummeting = true;
            falling.play();
        }
    
}

// ---------------------------------------------
// Collectable items render and check functions
// ---------------------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    
    fill(220,20,60);
    ellipse(t_collectable.base , t_collectable.height , 25);    
    fill(222,184,135);
    triangle(t_collectable.base,t_collectable.height+30, t_collectable.base - 15, t_collectable.height , t_collectable.base+15 , t_collectable.height );
                    

    

}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    

    if(dist(gameChar_world_x , gameChar_y , t_collectable.base, t_collectable.height ) <30)
        {
            collectableSound.play();
            t_collectable.isFound=true;
            game_score++;
            
        }

}

//Flagpole Function
function renderFlagpole()
{   
    push();
    strokeWeight(5);
    stroke(100);
    line(flagPole.xPose, floorPosition_y , flagPole.xPose , floorPosition_y-250 );
    
    noStroke();
    if(!flagPole.isReached)
    {
    fill(106, 90, 205);    
    rect(flagPole.xPose , floorPosition_y-50 , 75,50);
    }
    else
        {
        fill(106, 90, 205);    
        rect(flagPole.xPose , floorPosition_y-250 , 75,50);

        }
    
    pop();
}

//check if flagpole is reached
function checkFlagpole()
{
        
if (dist(gameChar_world_x, gameChar_y, flagPole.xPose, floorPosition_y) < 41) {
        backgroundSound.stop();
        flagpoleSound.play();
        flagPole.isReached = true;
        console.log(flagPole.isReached);
    
  }
}

//function to check if the player has falling down the canyon 
function checkPlayerDie()
{
    if(gameChar_y>height )
       {
           lives-=1;
           if(lives > 0)
        {
            
            
            startGame();
        }else{
            backgroundSound.stop();
        }
            
       }
    
    
    
}

//function to create plateforms 
function createPlateforms(x,y,length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function (){
            fill(240, 255,240);
            rect(this.x , this.y , this.length,10);
        },
        checkOnTop: function(gcX, gcY ){
         if(gcX > this.x-12 && gcX < this.x+this.length)
             {
                 var d = this.y - (gcY+37) ;
                 if(d >=0 && d<5)
                     {
                         return true;
                     }
             }
            return false;
            
            
        }    

        
    }
    
    return p ;
    
    
}













