game.Car = me.ObjectEntity.extend({
  init : function(x, y, type) {
    var settings = {
      image : 'cars',
      spritewidth : '128',
      spriteheight : '256'
    };
    this.parent(x, y, settings);
    this.type = type;
    switch(type) {
      case 'blue':
        this.renderable.addAnimation('idle', [0], 1);
        break;
      case 'yellow':
        this.renderable.addAnimation('idle', [1], 1);
        break;
      case 'green':
        this.renderable.addAnimation('idle', [2], 1);
        break;
      case 'red':
        this.renderable.addAnimation('idle', [3], 1);
        break;
      case 'gray':
        this.renderable.addAnimation('idle', [4], 1);
        break;
      case 'police':
        this.renderable.addAnimation('idle', [5], 1);
        break;
    }
    this.renderable.setCurrentAnimation('idle');
  },

  update : function(time) {
    this.parent(time);
    if(this.type === 'blue') {
      if(me.input.isKeyPressed('left')) {
        this.pos.x -= 10;
      }
      if(me.input.isKeyPressed('right')) {
        this.pos.x += 10;
      }
    }
  }
});