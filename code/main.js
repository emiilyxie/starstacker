import kaboom from "kaboom";


// initialize context
kaboom({
  width: 1580,
  height: 1024,
  stretch: true,
  background: [ 0, 0, 0 ]
});


// load assets
loadSprite("title", "sprites/title.png");
loadSprite("title1", "sprites/title1.png");

loadSprite("play", "sprites/play.png");
loadSprite("ground", "sprites/ground.png");
loadSprite("space1", "sprites/space1.JPG");
loadSprite("space2", "sprites/space2.JPG");
loadSprite("space3", "sprites/space3.JPG");

loadSprite("sprite1", "sprites/sprite1.png")
loadSprite("sprite2", "sprites/sprite2.png")
loadSprite("sprite3", "sprites/sprite3.png")
loadSprite("sprite4", "sprites/sprite4.png")
loadSprite("sprite5", "sprites/sprite5.png")
loadSprite("sprite6", "sprites/sprite6.png")
loadSprite("sprite7", "sprites/sprite7.png")
loadSprite("sprite8", "sprites/sprite8.png")
loadSprite("sprite9", "sprites/sprite9.png")
loadSprite("sprite10", "sprites/sprite10.png")
loadSprite("sprite11", "sprites/sprite11.png")
loadSprite("sprite12", "sprites/sprite12.png")
loadSprite("sprite13", "sprites/sprite13.png")
loadSprite("sprite14", "sprites/sprite14.png")

loadSprite("enemy", "sprites/enemy.png")


loadSprite("bubble1", "sprites/bubble1.png" )
loadSprite("bubble2", "sprites/bubble2.png" )
loadSprite("bubble3", "sprites/bubble3.png" )
loadSprite("bubble4", "sprites/bubble4.png" )

loadSprite("gameover", "sprites/gameover.png")
loadSound("bgm", "sounds/beach!.mp3");
loadSound("pop", "sounds/pop.wav");
loadSound("hurt", "sounds/hurt.wav");
loadSound("blackhole", "sounds/blackhole.wav");
loadSound("drop", "sounds/drop.wav");
loadSprite("portal", "sprites/portal.png", {
    sliceX: 2,
    sliceY: 2,
    anims: {
        spawn: {
            from: 0,
            to: 3,
        }
    },
});


const music = play("bgm", {
    volume: 0.1,
    loop: true
});

const BASE_HEIGHT = 24;
const BLOCK_HEIGHT = 100;
let block_number = 1;
let blocks = [];  
let blockArr = ["sprite1", "sprite2", "sprite3", "sprite4", "sprite5", "sprite7", "sprite8", "sprite9", "sprite10", "sprite11", "sprite12", "sprite13", "sprite14"];
let blockLength = blockArr.length
let spaceArr = ["space1", "space2", "space3"]
let spaceLength = spaceArr.length
let titleArr = ["title", "title1"]
let titleLength = titleArr.length
let bubbleArr = ["bubble1", "bubble2", "bubble3", "bubble4"]
let rotation = 0;
const DROP_SPEED = 1000;
let spriteSpeed = 1000;

layers([
    "bg",
    "game",
    "ui"
], "game");


scene("start", () => {

  function changeBackground() {
    let randInt = randi(0, spaceLength);
    let randInt2 = randi(0, titleLength);
    every("title", destroy);
    add([
      rect(width(), height()),
      pos(0, 0),
      color(0, 0, 0),
      layer("bg"),
      z(-200),
      fixed()
    ])

    add([
      sprite(spaceArr[randInt]),
      pos(width()/2, height()/2),
      origin("center"),
      layer("bg"),
      z(-100)
    ]);
  
    const title = add([
      sprite(titleArr[randInt2]),
      pos(width()/2, height()/2 + 20),
      origin("center"),
      layer("bg"),
      "title",
      z(100)
  ]);

  }

  loop(1, () => {
    changeBackground();
  });



  const play = add([
    text("click to enter"),
    pos(width()/2, height()/2 + 50),
    origin("center")
  ]);

  mouseClick(() => {
      go("cutscene");
  });

});


scene("cutscene", () => {

    add([
      text("The residents of Starlandia have been living happily for many years.", {
        width: 500,
        size: 48
      }),
      pos(width()/2, height()/2),
      origin("center"),
      lifespan(2, { fade: 0.5 })
    ]);

  wait(2, () => {
    add([
      text("But all that changed when the Order of the Alien Eyes attacked", {
        width: 500,
        size: 48
      }),
      pos(width()/2, height()/2),
      origin("center"),
      lifespan(2, { fade: 0.5 })
    ]);

  })

  wait(4, () => {
    add([
      text("Help the residents of Starlandia escape by stacking them towards their freedom!", {
        width: 500,
        size: 48
      }),
      pos(width()/2, height()/2),
      origin("center"),
      lifespan(2, { fade: 0.5 })
    ]);

  })

  wait(6, () => {
    add([
      text("Warning: occasional black holes will disrupt stacking process", {
        width: 500,
        size: 48
      }),
      pos(width()/2, height()/2),
      origin("center"),
      lifespan(2, { fade: 0.5 })
    ]);

  const play = add([
    text("click to continue"),
    scale(0.5),
    pos(width()/2, height() - 100),
    origin("center")
  ]);


  })

  wait(6, () => {
    mouseClick(() => {
      go("game")
    });
  })


});

go("start")


scene("game", () => {

  let camStarted = false;
  
  const score = add([
    text("Score: "),
    pos(30, 30),
    fixed(),
    { value: 0, max: 25 },
    "score"
  ]);
  score.text = + score.value + "/" + score.max;
  
  const lives = add([
    text("Lives: "),
    pos(width() - 200, 50),
    fixed(),
    {value: 2, max: 2},
    "health"
  ])

  lives.text = + lives.value + "/" + lives.max
  
  add([
    rect(width(), height()),
    pos(0, 0),
    color(0, 0, 0),
    layer("bg"),
    z(-200)
  ])

  function changeBackground() {
    let randInt = randi(0, spaceLength);
    add([
      sprite(spaceArr[randInt]),
      pos(width()/2, height()/2),
      z(-100),
      origin("center"),
      layer("bg"),
      fixed()
    ]);
  }

  loop(1, () => {
    changeBackground();
  });

  const buildingBase = add([
    sprite("sprite8"),
    pos(width()/2, height() - 450),
    origin("center"),
    area(),
    solid(),
    layer("game"),
    z(100),
    color(255, 255, 255),
    {
      pos: {
        x: width()/2 - width()/8,
        y: height() - BLOCK_HEIGHT
      },
    }
  ]);

  let prevBlock = buildingBase;


  function addMovingBlock(blockWidth, yPos) {
    if (randi(0, 5) == 2) {
      play("blackhole");
      add([
        sprite("portal", {
            anim: "spawn",
        }),
        pos(width()/2, height()/2),
        lifespan(1, {fade: 0.5})
    ]);

      rotation += 180; 
      camRot(rotation);
    }

    //if (randi(0, 5) == 2) {
    spawnEnemy(yPos + 80);
    if (score.value > 10){
      spawnEnemy (yPos + 40)

    }
    
    //}

    let randInt = randi(0, blockLength)
    const movingBlock = add([
      sprite(blockArr[randInt]),
      scale(0.75),
      //rect(blockWidth, BLOCK_HEIGHT),
      pos(20, yPos),
      area({height: BLOCK_HEIGHT}),
      solid(),
      origin("botleft"),
      layer("game"),
      z(100),
      {
        dir: LEFT,
        speed: spriteSpeed,
        vel: {
          x: 0,
          y: 0
        },
        pos: {
          x: width()/2 - width()/8,
          y: yPos
        },
        width: width()/4
      },
      "movingBlock"
    ]);

    blocks.push(movingBlock);

    wait(0.25, () => {
      movingBlock.action(() => {
        movingBlock.move(LEFT.scale(movingBlock.speed));
        //movingBlock.move(-movingBlock.speed, 0);
        //movingBlock.vel.x = -movingBlock.speed;
      });
    });

    movingBlock.action(() => {
      if (movingBlock.pos.x < 0) {
        movingBlock.action(() => {
          //movingBlock.move(movingBlock.speed, 0);
          //movingBlock.vel.x = movingBlock.speed;
          movingBlock.move(RIGHT.scale(movingBlock.speed));
          movingBlock.dir = RIGHT;
        });
      }

      if (movingBlock.pos.x > width() - 70) {
        movingBlock.action(() => {
          movingBlock.move(LEFT.scale(movingBlock.speed));
          movingBlock.dir = LEFT;
        });
      }

      if (movingBlock.pos.y > height() - camPos().y + 100) {
        go("over");
        wait(2, () => {
          destroy(movingBlock);
        });
      }
    });
  }

  function spawnEnemy(yPos) {
    const enemy = add([
      sprite("enemy"),
      pos(randi(0, width() - 200), yPos),
      area(),
      solid(),
      "enemy"
    ]);


    let leftPos = enemy.pos.x;

    enemy.action(() => {

      if (enemy.pos.x <= leftPos) {
        enemy.action(() => {
          enemy.move(RIGHT.scale(100));
        });
      }

      if (enemy.pos.x >= leftPos + 200) {
        enemy.action(() => {
          enemy.move(LEFT.scale(100));
        });
      }
    });

  }

  let collided = 1

  function spawnBubble(){
    let currentBlock = blocks[blocks.length - 1]
    let randBubble = choose(bubbleArr)
    const bubble = add([sprite(randBubble),
        pos(currentBlock.pos.x + 100, currentBlock.pos.y - 100),
        scale(0.5),
        layer("game"),
        "bubble",
        z(200)])
    //wait one second, then destroy text bubble
    wait(0.5, () => {
      every("bubble", destroy);
    });
  }

  addMovingBlock(width()/4, camPos().y - BLOCK_HEIGHT - 300);

  collides("movingBlock", "enemy", () => {
    play("hurt")
    if (lives.value == 1){
      debug.log(lives.value)
      go("over");
    }
    every("enemy", destroy)
    if (collided == 0){
      lives.value = 1
    }
    if (collided == 1){
      lives.value = 2
      collided = 0
    }
    lives.text = lives.value + "/" + lives.max;

  });

  keyPress("space", () => {
    spawnBubble()
    play("pop");
    // stops and drops rectangle
    let currentBlock = blocks[blocks.length-1]
    currentBlock.action(() => {
      currentBlock.move(currentBlock.dir.scale(
        -currentBlock.speed
      ));
      currentBlock.move(DOWN.scale(DROP_SPEED));
      currentBlock.dir = DOWN;
      //currentBlock.move(-currentBlock.vel.x, currentBlock.speed);
      //currentBlock.vel.x = 0;
      //currentBlock.vel.y = currentBlock.speed;
    });

    //calculate remaining rect width
    let newBlockWidth = getNewBlockWidth(); 
    //debug.log(newBlockWidth)
    prevBlock = currentBlock;
    block_number++;

    if (!camStarted) 
    {
      let camX = camPos().x;
      let camY = camPos().y;
      camPos(vec2(camX, camY - 10));
      camStarted = true;
    }

    wait(2, () => {
      destroyAll("enemy");
      play("drop")
      score.value += 1;
      score.text = score.value + "/" + score.max;
      //adjust camera, maybe make it loop more? 
      let camY = camPos().y;
      addMovingBlock(newBlockWidth, camY - BLOCK_HEIGHT - 300);
    });
  })

  function getNewBlockWidth() {
    let currentBlock = blocks[blocks.length-1];
    let prevBlock = null;
    if (blocks.length > 1) {
      prevBlock = blocks[blocks.length-2];
    }
    else {
      prevBlock = currentBlock 
    }
    let prevPos = prevBlock.pos;
    let currentPos = currentBlock.pos;

    const offset = Math.abs(prevPos.x - currentPos.x);
    const blockWidth = currentBlock.width - offset;
    return blockWidth;
  }


});

scene("over", () => {
  add([
    rect(width(), height()),
    pos(0, 0),
    color(0, 0, 0),
    layer("bg"),
    z(-200)
  ])
  
  function changeBackground() {
    let randInt = randi(0, spaceLength);
    add([
      sprite(spaceArr[randInt]),
      pos(width()/2, height()/2),
      z(-100),
      origin("center"),
      layer("bg"),
      fixed()
    ]);
  }

  add([
    sprite("gameover"),
    pos(width()/2, height()/2),
    z(100),
    origin("center"),
    layer("bg"),
  ]);

    add([
      text("You have failed to help the residents of Starlandia!", {
      width: 1000,
      size: 48
    }),

    pos(width()/2, height()/2 - 300),
    origin("center"),
    width(100)
  ]);

    const again = add([
    text("click to play again"),
    pos(width()/2, height()/2 + 100),
    origin("center"),
    width(100)
  ]);


  mouseClick(() => {
      go("game");
  });


  loop(1, () => {
    changeBackground();
  });

})
