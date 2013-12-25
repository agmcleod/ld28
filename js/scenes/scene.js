game.Scene = Object.extend({
  init : function() {
    this.alwaysUpdate = true;
    this.showIntro = true;
  },

  cleanup : function() {
    me.audio.stopTrack();
    me.game.world.destroy();
  },

  load : function(baseImage) {
    var image = me.loader.getImage(baseImage);
    this.image = new me.SpriteObject(0, 0, image, image.width, image.height);
    me.game.world.addChild(this.image, 1);
  },

  update : function(time) {
    if(this.showIntro && me.input.isKeyPressed('enter')) {
      me.game.world.removeChild(this.image);
      this.showIntro = false;
      this.stage();
    }
  }
})