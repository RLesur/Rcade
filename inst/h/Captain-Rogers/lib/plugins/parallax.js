/*  jerev - 10/2012 - parallax.js

Be sure to require plugins.parallax, and place this file in lib/plugins/

Parallax usage
    p = new Parallax();
    p.add('path/to/image.ext', {distance: 1, y: 0})
    p.add('path/to/other/image.ext', {distance: 5, y: 0})

    p.move(speed);

    p.draw();

Please note: you need to preload the images, you can do this before you call ig.main()
    new ig.Image('path/to/image.ext');
    new ig.Image('path/to/other/image.ext');
    ig.main(..);

 */
ig.module(
    'plugins.parallax'
)
.requires(
    'impact.image'
)
.defines(function(){
Parallax = ig.Class.extend({
    layers: [],
    screen: {x: 0, y: 0},

    init: function(settings) {
        ig.merge(this, settings);
    },

    add: function(path, settings) {
        var layer = new ParallaxLayer(path, settings);
        this.layers.push(layer);
    },

    move: function(x) {
        this.screen.x += (x * ig.system.tick);
    },

    draw: function() {
        for(var i=0; i < this.layers.length; i++) {
            var layer = this.layers[i];

            var x = -((this.screen.x / layer.distance) % layer.w);
            if (this.screen.x <= 0) x = x - layer.w;
            layer.x = x;

            while (layer.x < ig.system.width) {
                layer.draw(); 
                layer.x += layer.w;     
            }
            layer.x = x;
        }
    }
});

ParallaxLayer = ig.Class.extend({
    distance: 0,

    x: 0, y: 0,
    w: 0, h: 0,

    img: null,

    init: function(path, settings) {
        if (settings && settings.distance == 0) settings.distance = 1;

        this.img = new ig.Image(path);
        this.w = this.img.width;
        this.h = this.img.height;

        ig.merge(this, settings);
    },

    draw: function() {
        this.img.draw(this.x, this.y);
    }
})
});