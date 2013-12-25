game.Tree = me.AnimationSheet.extend({
  init : function() {
    this.parent(me.game.viewport.width / 2 - 128, me.game.viewport.height - 512 - 50, me.loader.getImage('tree'), 256, 512);
    this.addAnimation('idle', [2], 1);
    this.addAnimation('wobble', [2,3,4,3,2,1,0,1,2,3,4,3,2,1,0,1,2], 2);
    this.setCurrentAnimation('idle');
    this.z = 2;
    this.wobbling = false;
  },

  animate : function() {
    this.wobbling = true;
    this.setCurrentAnimation('wobble', (function() {
      this.wobbling = false;
      this.setCurrentAnimation('idle');
    }).bind(this));
  },

  update : function(time) {
    this.parent(time);
    if(this.wobbling) {
      return true;
    }
  }
});