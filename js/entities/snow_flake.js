game.SnowFlake = me.Renderable.extend({
  init : function(x, y) {
    this.d = Number.prototype.random(5, 9);
    this.r = this.d / 2;
    this.parent(new me.Vector2d(x, y), this.d, this.d);
    this.alwaysUpdate = true;
    this.accel = { x : 2.25 * (Math.random() * 0.4 + 0.8), y : 3 * (Math.random() * 0.4 + 0.8) };
    this.z = 4;
    var slope = game.math.slope({ x : 0.75, y : 1 }, { x : 1.5, y : 2 });
    var yIntercept = game.math.getYIntercept(this.pos, slope);
    var x = game.math.xFromSlope(0, slope, yIntercept);
    if(x > 0) {
      y = 0;
    }
    else {
      y = game.math.yFromSlope(x, slope, yIntercept);
    }
    this.startPos = new me.Vector2d(x, y);
  },

  draw : function(context) {
    context.globalAlpha = 0.7;
    context.fillStyle = '#fff';
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    context.fill();
    context.globalAlpha = 1;
  },

  update : function(time) {
    if(this.pos.x >= me.game.viewport.width || this.pos.y >= me.game.viewport.height) {
      this.pos.x = this.startPos.x;
      this.pos.y = this.startPos.y;
    }

    this.pos.y += this.accel.y;
    this.pos.x += this.accel.x;
    return true;
  }
});