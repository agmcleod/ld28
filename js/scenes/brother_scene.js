(function() {
  var distanceToCover, startSeconds = 32;

  var CrashImage = me.SpriteObject.extend({
    init : function() {
      var region = game.texture.getRegion('crash.png');
      this.parent(me.game.viewport.width / 2 - region.width / 2, me.game.viewport.height / 2 - region.height / 2, game.texture.getTexture(), region.width, region.height);
      this.offset.setV(region.offset);
    }
  });

  var OutOfTimeImage = me.SpriteObject.extend({
    init : function() {
      var region = game.texture.getRegion('outoftime.png');
      this.parent(me.game.viewport.width / 2 - region.width / 2, me.game.viewport.height / 2 - region.height / 2, game.texture.getTexture(), region.width, region.height);
      this.offset.setV(region.offset);
    }
  });

  var StuckImage = me.SpriteObject.extend({
    init : function() {
      var region = game.texture.getRegion('stuck.png');
      this.parent(me.game.viewport.width / 2 - region.width / 2, me.game.viewport.height / 2 - region.height / 2, game.texture.getTexture(), region.width, region.height);
      this.offset.setV(region.offset);
    }
  });

  var Progress = me.Renderable.extend({
    init : function() {
      this.parent(new me.Vector2d(30, 110), 16, 500);
      this.restart();
      this.z = 5;
      distanceToCover = 8 * me.game.viewport.height;
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
      this.parent();
      this.showInstructions = true;
      this.tarmac = new game.Tarmac(this);
      this.player = new game.Car(400, me.game.viewport.height - 256, 'blue');

      this.progress = new Progress();

      this.crashImage = new CrashImage();
      this.outoftimeImage = new OutOfTimeImage();
      this.stuckImage = new StuckImage();
      this.secondsLeft = startSeconds;
      this.brakeControlsRect = new me.Rect(new me.Vector2d(250, 400), 524, me.game.viewport.height - 400);
      this.leftControlsRect = new me.Rect(new me.Vector2d(0, 120), 250, me.game.viewport.height - 120);
      this.rightControlsRect = new me.Rect(new me.Vector2d(774, 120), 250, me.game.viewport.height - 120);
      if(me.device.isMobile) {
        this.brakeImage = new game.BrakeImage();
        this.leftArrow = new game.LeftArrowImage();
        this.rightArrow = new game.RightArrowImage();
      }
    },

    cleanup : function() {
      me.input.unbindKey(me.input.KEY.A);
      me.input.unbindKey(me.input.KEY.D);
      me.input.unbindKey(me.input.KEY.LEFT);
      me.input.unbindKey(me.input.KEY.RIGHT);
      me.input.unbindKey(me.input.KEY.SPACE);
      for(var r in [this.leftControlsRect, this.rightControlsRect, this.brakeControlsRect]) {
        me.input.releasePointerEvent('mousedown', r);
        me.input.releasePointerEvent('mouseup', r);
      }
      this.parent();
    },

    end : function() {
      game.playScreen.showNextButton();
      this.tarmac.setSpeed(0);
      game.hudContainer.speedometer.visible = false;
      game.hudContainer.timeRemaining.visible = false;
      this.player.stuck = true;
    },

    load : function() {
      this.parent('brother-intro');
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
      this.atEnd = false;
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
      var _this = this;
      me.input.bindKey(me.input.KEY.A, 'left');
      me.input.bindKey(me.input.KEY.D, 'right');
      me.input.bindKey(me.input.KEY.LEFT, 'left');
      me.input.bindKey(me.input.KEY.RIGHT, 'right');
      me.input.bindKey(me.input.KEY.SPACE, 'brake');
      me.input.registerPointerEvent('mousedown', this.leftControlsRect, function() {
        _this.player.goLeft = true;
      });
      me.input.registerPointerEvent('mouseup', this.leftControlsRect, function() {
        _this.player.goLeft = false;
      });
      me.input.registerPointerEvent('mousedown', this.rightControlsRect, function() {
        _this.player.goRight = true;
      });
      me.input.registerPointerEvent('mouseup', this.rightControlsRect, function() {
        _this.player.goRight = false;
      });
      me.input.registerPointerEvent('mousedown', this.brakeControlsRect, function() {
        _this.player.brake = true;
      });
      me.input.registerPointerEvent('mouseup', this.brakeControlsRect, function() {
        _this.player.brake = false;
      });

      me.audio.playTrack('ld28');
      me.game.world.addChild(this.tarmac);
      me.game.world.addChild(this.player, 3);
      if(me.device.isMobile) {
        me.game.world.addChild(this.brakeImage);
        me.game.world.addChild(this.leftArrow);
        me.game.world.addChild(this.rightArrow);
      }
      else {
        me.game.world.addChild(new game.DriveControlInstructions());
      }
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

      if(me.device.isMobile && !this.showIntro && this.showInstructions && me.input.isKeyPressed('enter')) {
        me.game.world.removeChild(this.leftArrow);
        me.game.world.removeChild(this.rightArrow);
        me.game.world.removeChild(this.brakeImage);
        this.showInstructions = false;
        this.start();
      }
    }
  });

}).call(this);