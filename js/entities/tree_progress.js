game.TreeProgress = me.Renderable.extend({
  init : function() {
    this.parent(new me.Vector2d(30, 30), 300, 40);
    this.percent = 0;
    this.z = 3;
    this.timer = new game.Timer();
  },

  draw : function(context) {
    context.fillStyle = '#a00';
    context.fillRect(this.pos.x, this.pos.y, this.width * this.percent / 100, this.height);
  },

  incrementPercent : function() {
    this.percent += 15;
    return this.percent;
  },

  update : function() {
    if(this.timer.elapsed > 200) {
      this.percent -= 5;
      this.timer.reset();
    }
    this.timer.update();
    if(this.percent < 0) {
      this.percent = 0;
    }
    return true;
  }
});