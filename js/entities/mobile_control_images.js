function dangle() {
  if(this.rate > 3) {
    this.direction = -1
  }
  else if(this.rate < -3) {
    this.direction = 1;
  }

  this.rate += this.direction;
  this.pos.y += this.rate;
}

game.BrakeImage = me.SpriteObject.extend({
  init : function() {
    var region = game.texture.getRegion('stop.png');
    this.parent(me.game.viewport.width / 2 - region.width / 2, me.game.viewport.height - region.height - 10, game.texture.getTexture(), region.width, region.height);
    this.offset.setV(region.offset);
    this.z = 10;
    this.direction = -1;
    this.rate = 1;
  },

  update : function() {
    this.parent(true);
    dangle.call(this);
    return true;
  }
});

game.LeftArrowImage = me.SpriteObject.extend({
  init : function(flipped) {
    var region = game.texture.getRegion('arrow.png');
    this.parent(5, 280, game.texture.getTexture(), region.width, region.height);
    this.offset.setV(region.offset);
    this.z = 10;
    this.direction = -1;
    this.rate = 2;
  },

  update : function() {
    this.parent(true);
    dangle.call(this);
    return true;
  }
});

game.RightArrowImage = me.SpriteObject.extend({
  init : function() {
    var region = game.texture.getRegion('arrow.png');
    this.parent(me.game.viewport.width - region.width - 5, 280, game.texture.getTexture(), region.width, region.height);
    this.offset.setV(region.offset);
    this.flipX(true);
    this.z = 10;
    this.direction = 1;
    this.rate = 2;
  },

  remove : function() {
    me.game.world.removeChild(this);
  },

  update : function() {
    this.parent(true);
    dangle.call(this);
    return true;
  }
});