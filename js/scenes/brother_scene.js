game.BrotherScene = game.Scene.extend({
  init : function() {
    this.showInstructions = true;
    this.tarmac = new game.Tarmac(this);
    me.game.world.addChild(this.tarmac);
    this.player = new game.Car(300, me.game.viewport.height - 256, 'blue');
    me.game.world.addChild(this.player, 3);
    me.game.world.addChild(new game.DriveControlInstructions());

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
  },

  start : function() {
    this.player.stuck = false;
    this.tarmac.setSpeed();
    this.showInstructions = false;
  }
});
