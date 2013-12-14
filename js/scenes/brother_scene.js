(function() {
  var distanceToCover;
  var Progress = me.Renderable.extend({
    init : function() {
      this.parent(new me.Vector2d(30, 110), 16, 500);
      this.restart();
      this.z = 5;
      distanceToCover = 25 * me.game.viewport.height;
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

    restart : function() {
      this.player.restart();
      this.tarmac.restart();
      this.progress.restart();
    },

    start : function() {
      this.player.stuck = false;
      this.tarmac.setSpeed();
      this.showInstructions = false;
    }
  });

}).call(this);