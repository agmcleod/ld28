game.Ground = me.SpriteObject.extend({
  init : function() {
    var image = me.loader.getImage('ground');
    this.parent(0, 0, image, image.width, image.height);
    this.z = 1;
  },

  update : function() {
    return true;
  }
});