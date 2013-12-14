game.DriveControlInstructions = me.SpriteObject.extend({
  init : function() {
    this.parent(630, 50, me.loader.getImage('instructions-desktop'), 388, 186);
    this.z = 99;
  },

  update : function() {
    if(me.input.isKeyPressed('enter')) {
      me.game.world.removeChild(this);
      game.scene.start();
    }
  }
})