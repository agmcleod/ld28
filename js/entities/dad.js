game.Dad = me.AnimationSheet.extend({
  init : function() {
    this.parent(me.game.viewport.width / 2 - 288, me.game.viewport.height - 384 - 50, me.loader.getImage('dad'), 288, 384);
    this.addAnimation('idle', [0], 1);
    this.addAnimation('swingone', [1], 140);
    this.addAnimation('swingtwo', [2], 140);
    this.addAnimation('swingthree', [3], 140);
    this.swings = ['swingone', 'swingtwo', 'swingthree'];
    this.setCurrentAnimation('idle');
    this.z = 3;
  },

  swing : function() {
    this.swinging = true;
    var swing = this.swings[Number.prototype.random(0, 2)];
    this.setCurrentAnimation(swing, (function() {
      this.setCurrentAnimation('idle');
      this.swinging = false;
    }).bind(this));
  },

  update : function(time) {
    this.parent(time);
    if(this.swinging) {
      return true;
    }
  }
})