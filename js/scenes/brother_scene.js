(function() {
  var distanceToCover, startSeconds = 65;

  var CrashImage = me.SpriteObject.extend({
    init : function() {
      var region = game.texture.getRegion('crash.png');
      this.parent(me.game.viewport.width / 2 - region.width / 2, me.game.viewport.height / 2 - region.height / 2, game.texture.getTexture(), region.width, region.height);
      this.offset.setV(region.offset);
      this.isRenderable = true;
    }
  });

  var OutOfTimeImage = me.SpriteObject.extend({
    init : function() {
      var region = game.texture.getRegion('outoftime.png');
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
      distanceToCover = 10 * me.game.viewport.height;
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
      if(this.shouldUpdate && this.percentage < 1) {
        this.percentage = this.pixelsCovered / distanceToCover;
        this.shouldUpdate = false;
        if(this.percentage >= 1) {
          this.percentage = 1;
          game.scene.reachEnd();
        }
      }
    }
  });

  game.BrotherScene = game.Scene.extend({
    init : function() {
      this.showInstructions = true;
      this.tarmac = new game.Tarmac(this);
      this.player = new game.Car(400, me.game.viewport.height - 256, 'blue');

      this.progress = new Progress();

      this.crashImage = new CrashImage();
      this.outoftimeImage = new OutOfTimeImage();
      this.stuckImage = new StuckImage();
      this.atEnd = false;
      this.secondsLeft = startSeconds;

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
      game.hudContainer.speedometer.visible = false;
      game.hudContainer.timeRemaining.visible = false;
      this.player.stuck = true;
    },

    reachEnd : function() {
      this.tarmac.addHouse();
      this.atEnd = true;
    },

    restart : function() {
      this.player.restart();
      this.tarmac.restart();
      this.progress.restart();
      this.secondsLeft = startSeconds;
      if(me.game.world.hasChild(this.crashImage)) me.game.world.removeChild(this.crashImage);
      if(me.game.world.hasChild(this.outoftimeImage)) me.game.world.removeChild(this.outoftimeImage);
      if(me.game.world.hasChild(this.stuckImage)) me.game.world.removeChild(this.stuckImage);
    },

    showCrash : function() {
      me.game.world.addChild(this.crashImage, 5);
    },

    showOutOfTime : function() {
      me.game.world.addChild(this.outoftimeImage, 5);
    },

    showStuck : function() {
      me.game.world.addChild(this.stuckImage, 5);
    },

    stage : function() {
      me.audio.playTrack('ld28');
      me.game.world.addChild(this.tarmac);
      me.game.world.addChild(this.player, 3);
      me.game.world.addChild(new game.DriveControlInstructions());
      me.game.world.addChild(this.progress);
      this.tarmac.restart();
    },

    start : function() {
      this.player.stuck = false;
      this.tarmac.setSpeed();
      this.showInstructions = false;
      game.hudContainer.timeRemaining.visible = true;
      game.hudContainer.speedometer.visible = true;
    },

    stop : function() {
      this.tarmac.setSpeed(0);
      this.player.stuck = true;
      game.playScreen.showRestartButton();
    },

    update : function(time) {
      this.parent(time);
      this.secondsLeft -= game.timer.deltaAsSeconds();
      if(this.secondsLeft < 0) this.secondsLeft = 0;
      game.hudContainer.timeRemaining.setRemaining(~~this.secondsLeft);
      if(this.secondsLeft === 0 && this.tarmac.speed > 0) {
        this.stop();
        this.showOutOfTime();
      }
    }
  });

}).call(this);