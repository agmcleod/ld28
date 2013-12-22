game.Buildings = me.SpriteObject.extend({
  init : function() {
    var image = me.loader.getImage('buildings');
    this.parent(0, 0, image, image.width, image.height);
    this.z = 3;
  },

  update : function() {
    return true;
  }
});