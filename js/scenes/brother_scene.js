(function() {
  var distanceToCover;

  var CrashImage = me.SpriteObject.extend({
    init : function() {
      var region = game.texture.getRegion('crash.png');
      this.parent(me.game.viewport.width / 2 - region.width / 2, me.game.viewport.height / 2 - region.height / 2, game.texture.getTexture(), region.width, region.height);
      this.offset.setV(region.offset);
      this.isRenderable = true;
    }
  });

  var StuckImage = me.SpriteObject.extend({
    init : function() {
      var region = game.texture.getRegion('stuck.png');
      this.parent(me.game.viewport.width / 2 - region.width / 2, me.game.viewport.height / 2 - region.height / 2, game.texture.getTexture(), region.width, region.height);
      this.offset.setV(region.offset);
      this.isRenderable = true;
    }
  });

  var Progress = me.Renderable.extend({
    init : function() {
      this.parent(new me.Vector2d(30, 110), 16, 500);
      this.restart();
      this.z = 5;
      distanceToCover = 13 * me.game.viewport.height;
    },

    addPixelsCovered : function(amt) {
      this.pixelsCovered += amt;
      this.shouldUpdate = true;
    },

    draw : function(context) {
      context.fillStyle = '#f00';
      context.fillRect(this.pos.x, this.pos.y, this.width, 8);
      context.fillRect(this.pos.x, this.pos.y + this.height, this.width, 8);
      if(this.percentage > 0) {
        context.fillStyle = '#00a';
        var v = this.height * this.percentage;
        context.fillRect(this.pos.x, (this.pos.y + this.height) - v, 10, v);
      }
    },

    restart : function() {
      this.percentage = 0;
      this.pixelsCovered = 0;
    },

    update : function() {
      if(this.shouldUpdate) {
        this.percentage = this.pixelsCovered / distanceToCover;
        this.shouldUpdate = false;
        if(this.percentage >= 1) {
          this.percentage = 1;
          game.scene.end();
        }
      }
    }
  });

  game.BrotherScene = game.Scene.extend({
    init : function() {
      this.showInstructions = true;
      this.tarmac = new game.Tarmac(this);
      me.game.world.addChild(this.tarmac);
      this.player = new game.Car(300, me.game.viewport.height - 256, 'blue');
      me.game.world.addChild(this.player, 3);
      me.game.world.addChild(new game.DriveControlInstructions());

      this.progress = new Progress();
      me.game.world.addChild(this.progress);

      this.crashImage = new CrashImage();
      this.stuckImage = new StuckImage();

      me.input.bindKey(me.input.KEY.A, 'left');
      me.input.bindKey(me.input.KEY.D, 'right');
      me.input.bindKey(me.input.KEY.LEFT, 'left');
      me.input.bindKey(me.input.KEY.RIGHT, 'right');
      me.input.bindKey(me.input.KEY.SPACE, 'brake');
    },

    cleanup : function() {
      me.input.unbindKey(me.input.KEY.A);
      me.input.unbindKey(me.input.KEY.D);
      me.input.unbindKey(me.input.KEY.LEFT);
      me.input.unbindKey(me.input.KEY.RIGHT);
      me.input.unbindKey(me.input.KEY.SPACE);
      this.parent();
    },

    end : function() {
      game.playScreen.showNextButton();
      this.tarmac.setSpeed(0);
      this.player.stuck = true;
    },

    restart : function() {
      this.player.restart();
      this.tarmac.restart();
      this.progress.restart();
      if(me.game.world.hasChild(this.crashImage)) me.game.world.removeChild(this.crashImage);
      if(me.game.world.hasChild(this.stuckImage)) me.game.world.removeChild(this.stuckImage);
    },

    showCrash : function() {
      me.game.world.addChild(this.crashImage, 10);
    },

    showStuck : function() {
      me.game.world.addChild(this.stuckImage, 5);
    },

    start : function() {
      this.player.stuck = false;
      this.tarmac.setSpeed();
      this.showInstructions = false;
    }
  });

}).call(this);