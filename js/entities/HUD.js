

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

  init: function() {
    this.parent();

    this.font = new me.Font('Arial', '24px', '#f00');

    this.isPersistent = true;

    this.collidable = false;

    this.z = Infinity;

    this.name = "HUD";

    this.nextButton = new game.HUD.NextButton();
    this.restartButton = new game.HUD.RestartButton();
    this.speedometer = new game.HUD.Speedometer(this.font);
    this.timeRemaining = new game.HUD.TimeRemaining(this.font);
    this.treeMessage = new game.HUD.TreeMessage(this.font);
    this.addChild(this.speedometer);
    this.addChild(this.nextButton);
    this.addChild(this.restartButton);
    this.addChild(this.timeRemaining);
    this.addChild(this.treeMessage);
  }
});

game.HUD.NextButton = me.AnimationSheet.extend({
  init : function() {
    this.parent(30, 30, me.loader.getImage('buttons'), 160, 64);
    this.addAnimation('idle', [1], 1);
    this.setCurrentAnimation('idle');
    me.input.registerPointerEvent('mousedown', this, this.clicked.bind(this));
    this.visible = false;
  },

  clicked : function() {
    if(!this.visible) return null;
    game.playScreen.nextScene();
    this.visible = false;
  }
});

game.HUD.Speedometer = me.Renderable.extend({
  init : function(font) {
    this.parent(new me.Vector2d(800, 10), 200, 40);
    this.font = font;
    this.speed = 0;
    this.visible = false;
  },

  draw : function(ctx) {
    this.font.draw(ctx, 'Speed: ' + this.speed, this.pos.x, this.pos.y);
  },

  setSpeed : function(speed) {
    this.speed = speed;
    this.shouldUpdate = true;
  },

  update : function() {
    if(this.shouldUpdate) {
      this.shouldUpdate = false
      return true;
    }
  }
});

game.HUD.RestartButton = me.AnimationSheet.extend({
  init : function() {
    this.parent(30, 30, me.loader.getImage('buttons'), 160, 64);
    this.addAnimation('idle', [0], 1);
    this.setCurrentAnimation('idle');
    me.input.registerPointerEvent('mousedown', this, this.clicked.bind(this));
    this.visible = false;
  },

  clicked : function() {
    if(!this.visible) return null;
    game.scene.restart();
    this.visible = false;
  }
});

game.HUD.TimeRemaining = me.Renderable.extend({
  init : function(font) {
    this.parent(new me.Vector2d(800, 50), 100, 40);
    this.font = font;
    this.remaining = 0;
    this.visible = false;
  },

  draw : function(ctx) {
    this.font.draw(ctx, 'Seconds left: ' + this.remaining, this.pos.x, this.pos.y);
  },

  setRemaining : function(amt) {
    if(this.remaining !== amt) {
      this.remaining = amt;
    }
  }
});

game.HUD.TreeMessage = me.Renderable.extend({
  init : function(font) {
    this.parent(new me.Vector2d(450, 40), 160, 64);
    this.font = font;
    this.visible = false;
  },

  draw : function(context) {
    this.font.draw(context, 'You got the tree!', this.pos.x, this.pos.y);
  }
});