var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var platforms;
var player;
var cursors;
var stars;
var coin;
var bombs;
var saws;
var score = 0;
var scoreText;
var gameOver = false;
var newGravity = 20;

function preload() {
  //preload images
  this.load.image('sky', 'assets/walkthrough/sky.png');
  this.load.image('ground', 'assets/walkthrough/platform.png');
  this.load.image('star', 'assets/walkthrough/star.png');
  this.load.image('bomb', 'assets/walkthrough/bomb.png');
  this.load.image('saw', 'assets/sprites/saw.png');
  this.load.spritesheet('coin', 'assets/sprites/coin.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
  // add sky to canvas
  this.add.image(400, 300, 'sky');

  // add saws
  saws = this.physics.add.staticGroup();
  saws.create(500, 568, 'saw');
  saws.create(200, 368, 'saw').setScale(0.5).refreshBody();
  saws.create(250, 250, 'saw');

  // create static group for platforms and add to canvas
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  platforms.create(250, 120, 'ground').setScale(0.5).refreshBody();

  //create player
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //create coin
  var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  coin = this.physics.add.sprite(x, 16, 'coin');
  coin.setBounce(1);
  coin.setCollideWorldBounds(true);
  coin.setVelocity(Phaser.Math.Between(-200, 200), 20);
  coin.allowGravity = false;

  //player animations
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  //coin animation
  this.anims.create({
    key: 'rotate',
    frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  //key inputs
  cursors = this.input.keyboard.createCursorKeys();

  // create star group
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: {x: 12, y: 0, stepX: 70}
  });

  stars.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    child.body.gravity.y = Phaser.Math.FloatBetween(20, 500);
  });

  //create bomb group
  bombs = this.physics.add.group();

  //score
  scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

  // add colliders
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(coin, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  this.physics.add.overlap(player, bombs, hitbomb, null, this);
  this.physics.add.overlap(player, saws, hitbomb, null, this);
  this.physics.add.overlap(player, coin, collectCoin, null, this);
}

function update() {
  if (cursors.left.isDown)
  {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else
  {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.space.isDown && player.body.touching.down)
  {
    player.setVelocityY(-330);
  }

  coin.anims.play('rotate', true);
}

function collectStar (player, star) {
  // remove star
  star.disableBody(true, true);

  // update score
  score += 10;
  scoreText.setText('Score: ' + score);

  // create more stars after player collects all
  if (stars.countActive(true) === 0) {
    stars.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    coin.enableBody(true, x, 0, true, true);

    x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    // spawn bomb
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}

function hitbomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
  scoreText.setText('Game Over!');
}

function collectCoin(player, coin) {
  coin.disableBody(true, true);
  score += 100;
  scoreText.setText('Score: ' + score);
}
