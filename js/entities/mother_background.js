game.MotherBackground = me.SpriteObject.extend({
  init : function() {
    var image = me.loader.getImage('mother-bg');
    this.parent(0, 0, image, image.width, image.height);
    this.z = 1;
  }
});