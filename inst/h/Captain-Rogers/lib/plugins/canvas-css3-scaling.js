/**
 *  @name canvas-css3-scaling.js
 *  @version: 1.0
 *  @author: Andrzej Mazur
 *  @date: June 7th 2013
 *
 *  Description:
 *    CanvasCSS3Scaling is a plugin for HTML5 game engine ImpactJS with which
 *    you can scale your game to fullscreen using CSS3 Transforms.
 *
 *    Here's the original article with description:
 *      https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/
 *    and here's the jsFiddle with sample source code:
 *      http://jsfiddle.net/digitarald/bYSkr/
 *
 *  Usage:
 *    Copy canvas-css3-scaling.js file to your plugins folder
 *    and remember to require it using .requires('plugins.canvas-css3-scaling').
 *
 *    Add those two lines in your main file:
 *      ig.CanvasCSS3Scaling = new CanvasCSS3Scaling();
 *      ig.CanvasCSS3Scaling.init();
 *    just before your ig.main(...) call.
 */
 
ig.module(
    'plugins.canvas-css3-scaling'
)
.requires(
    'impact.input'
)
.defines(function(){
CanvasCSS3Scaling = ig.Class.extend({
    offset: null,
    scale: null,
    init: function() {
        // Get DOM elements
        this.element = document.getElementById('game');
        this.canvas = this.element.firstElementChild;
        // Original content size
        this.content = [this.canvas.width, this.canvas.height];
        // Reflow canvas size/margin on resize
        window.addEventListener('resize', this, false);
        // Reflow canvas size/margin on resize
        window.addEventListener('orientationchange', this, false);
        this.reflow();

        ig.Input.inject({
            mousemove: function(event) {
                var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
                var scale = ig.system.scale * (internalWidth / ig.system.realWidth);
                
                var pos = {left: 0, top: 0};
                if( ig.system.canvas.getBoundingClientRect ) {
                    pos = ig.system.canvas.getBoundingClientRect();
                }
                
                var ev = event.touches ? event.touches[0] : event;
                this.mouse.x = (ev.pageX - ig.CanvasCSS3Scaling.offset[0]) / ig.CanvasCSS3Scaling.scale;
                this.mouse.y = (ev.pageY - ig.CanvasCSS3Scaling.offset[1]) / ig.CanvasCSS3Scaling.scale;
            }
        });
    },
    reflow: function() {
        // 2d vectors to store various sizes
        var browser = [
            window.innerWidth, window.innerHeight];
        // Minimum scale to fit whole canvas
        var scale = this.scale = Math.min(
            browser[0] / this.content[0],
            browser[1] / this.content[1]);
        // Scaled content size
        var size = [
            this.content[0] * scale, this.content[1] * scale];
        // Offset from top/left
        var offset = this.offset = [
            (browser[0] - size[0]) / 2, (browser[1] - size[1]) / 2];
        // Apply CSS transform
        var rule = "translate(" + offset[0] + "px, " + offset[1] + "px) scale(" + scale + ")";
        this.element.style.transform = rule;
        this.element.style.webkitTransform = rule;
    },
        // Handle all events
    handleEvent: function(evt) {
        if(evt.type == 'resize' || evt.type == 'orientationchange') {
            // Window resized
            this.reflow();
        }
    }
});
});