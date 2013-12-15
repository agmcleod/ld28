game.DriveControlInstructions = me.SpriteObject.extend({
  init : function() {
    var image = me.loader.getImage('instructions-desktop');
    this.parent(630, 50, image, image.width, image.height);
    this.z = 99;
  },

  update : function() {
    if(me.input.isKeyPressed('enter')) {
      me.game.world.removeChild(this);
      game.scene.start();
    }
  }
})