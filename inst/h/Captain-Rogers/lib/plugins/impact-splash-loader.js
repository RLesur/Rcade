ig.module(
	'plugins.impact-splash-loader'
)
.requires(
	'impact.loader'
)
.defines(function(){

ig.ImpactSplashLoader = ig.Loader.extend({
	
	endTime: 0,
	fadeToWhiteTime: 200,
	fadeToGameTime: 800,
	logoWidth: 340,
	logoHeight: 120,
	
	end: function() {
		this.parent();
		this.endTime = Date.now();
		
		// This is a bit of a hack - set this class instead of ig.game as the delegate.
		// The delegate will be set back to ig.game after the screen fade is complete.
		ig.system.setDelegate( this );
	},
	
	
	// Proxy for ig.game.run to show the screen fade after everything is loaded
	run: function() {	
		var t = Date.now() - this.endTime;
		var alpha = 1;
		if( t < this.fadeToWhiteTime ) {
			// Draw the logo -> fade to white
			this.draw();
			alpha = t.map( 0, this.fadeToWhiteTime, 0, 1);
		}
		else if( t < this.fadeToGameTime ) {
			// Draw the game -> fade from white
			ig.game.run();
			alpha = t.map( this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
		}
		else {
			// All done! Dismiss the preloader completely, set the delegate
			// to ig.game
			ig.system.setDelegate( ig.game );
			return;
		}
		
		// Draw the white rect over the whole screen
		ig.system.context.fillStyle = 'rgba(255,255,255,'+alpha+')';
		ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
	},
	
	
	draw: function() {
		// Some damping for the status bar
		this._drawStatus += (this.status - this._drawStatus)/5;
		
		var ctx = ig.system.context;
		var w = ig.system.realWidth;
		var h = ig.system.realHeight;
		var scale = w / this.logoWidth / 3; // Logo size should be 1/3 of the screen width
		var center = (w - this.logoWidth * scale)/2;
		
		// Clear
		ctx.fillStyle = 'rgba(0,0,0,0.8)';
		ctx.fillRect( 0, 0, w, h );

  		var loadingScreen = new Image();
        loadingScreen.src = "data:image/png;base64,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";
        
        ctx.drawImage(loadingScreen, 0, 0);
		// URL
		// ctx.fillStyle = 'rgb(128,128,128)';
		// ctx.textAlign = 'right';
		// ctx.font = '10px Arial';
		// ctx.fillText( 'http://impactjs.com', w - 10, h - 10 );
		// ctx.textAlign = 'left';
		
		
		ctx.save();
		
			ctx.translate( center, h / 1.9 );
			ctx.scale( scale, scale );
			
			// Loading bar ('visually' centered for the Impact logo)
			ctx.lineWidth = '3';
			ctx.strokeStyle = 'rgb(255,255,255)';
			ctx.strokeRect( 25, this.logoHeight + 40, 300, 20 );
			
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillRect( 30, this.logoHeight + 45, 290 * this._drawStatus, 10 );		
			
			// // Draw 'Impact' text
			// this.drawPaths( 'rgb(255,255,255)', ig.ImpactSplashLoader.PATHS_IMPACT );
			
			// // Some quick and dirty hackery to make the comet's tail wiggle
			// var comet = ig.ImpactSplashLoader.PATHS_COMET;
			// comet[5][0] = 3 -Math.random() * this._drawStatus * 7;
			// comet[5][1] = 3 -Math.random() * this._drawStatus * 10;
			// comet[7][0] = 29.5 -Math.random() * this._drawStatus * 10;
			// comet[7][1] = 40.4 -Math.random() * this._drawStatus * 10;
			// comet[9][0] = 16.1 -Math.random() * this._drawStatus * 10;
			// comet[9][1] = 36.1 -Math.random() * this._drawStatus * 5;
			// ctx.translate( -Math.random() * this._drawStatus * 7, -Math.random() * this._drawStatus * 5 );
			
			// // Draw the comet
			// this.drawPaths( 'rgb(243,120,31)', comet );
			
		ctx.restore();	
	},
	
	
	drawPaths: function( color, paths ) {
		var ctx = ig.system.context;
		ctx.fillStyle = color;
		
		for( var i = 0; i < paths.length; i+=2 ) {
			ctx[ig.ImpactSplashLoader.OPS[paths[i]]].apply( ctx, paths[i+1] );
		}
	}
});

ig.ImpactSplashLoader.OPS = {
	bp:'beginPath',
	cp:'closePath',
	f:'fill',
	m:'moveTo',
	l:'lineTo',
	bc:'bezierCurveTo'
};

// ig.ImpactSplashLoader.PATHS_COMET = [
// 	'bp',[],'m',[85.1,58.3],'l',[0.0,0.0],'l',[29.5,40.4],'l',[16.1,36.1],'l',[54.6,91.6],'bc',[65.2,106.1,83.4,106.7,93.8,95.7],'bc',[103.9,84.9,98.6,67.6,85.1,58.3],'cp',[],'m',[76.0,94.3],'bc',[68.5,94.3,62.5,88.2,62.5,80.8],'bc',[62.5,73.3,68.5,67.2,76.0,67.2],'bc',[83.5,67.2,89.6,73.3,89.6,80.8],'bc',[89.6,88.2,83.5,94.3,76.0,94.3],'cp',[],'f',[]
// ];

// ig.ImpactSplashLoader.PATHS_IMPACT = [
// 	'bp',[],'m',[128.8,98.7],'l',[114.3,98.7],'l',[114.3,26.3],'l',[128.8,26.3],'l',[128.8,98.7],'cp',[],'f',[],
// 	'bp',[],'m',[159.2,70.1],'l',[163.6,26.3],'l',[184.6,26.3],'l',[184.6,98.7],'l',[170.3,98.7],'l',[170.3,51.2],'l',[164.8,98.7],'l',[151.2,98.7],'l',[145.7,50.7],'l',[145.7,98.7],'l',[134.1,98.7],'l',[134.1,26.3],'l',[155.0,26.3],'l',[159.2,70.1],'cp',[],'f',[],
// 	'bp',[],'m',[204.3,98.7],'l',[189.8,98.7],'l',[189.8,26.3],'l',[211.0,26.3],'bc',[220.0,26.3,224.5,30.7,224.5,39.7],'l',[224.5,60.1],'bc',[224.5,69.1,220.0,73.6,211.0,73.6],'l',[204.3,73.6],'l',[204.3,98.7],'cp',[],'m',[207.4,38.7],'l',[204.3,38.7],'l',[204.3,61.2],'l',[207.4,61.2],'bc',[209.1,61.2,210.0,60.3,210.0,58.6],'l',[210.0,41.3],'bc',[210.0,39.5,209.1,38.7,207.4,38.7],'cp',[],'f',[],
// 	'bp',[],'m',[262.7,98.7],'l',[248.3,98.7],'l',[247.1,88.2],'l',[238.0,88.2],'l',[237.0,98.7],'l',[223.8,98.7],'l',[233.4,26.3],'l',[253.1,26.3],'l',[262.7,98.7],'cp',[],'m',[239.4,75.5],'l',[245.9,75.5],'l',[242.6,43.9],'l',[239.4,75.5],'cp',[],'f',[],
// 	'bp',[],'m',[300.9,66.7],'l',[300.9,85.9],'bc',[300.9,94.9,296.4,99.4,287.4,99.4],'l',[278.5,99.4],'bc',[269.5,99.4,265.1,94.9,265.1,85.9],'l',[265.1,39.1],'bc',[265.1,30.1,269.5,25.6,278.5,25.6],'l',[287.2,25.6],'bc',[296.2,25.6,300.7,30.1,300.7,39.1],'l',[300.7,56.1],'l',[286.4,56.1],'l',[286.4,40.7],'bc',[286.4,38.9,285.6,38.1,283.8,38.1],'l',[282.1,38.1],'bc',[280.4,38.1,279.5,38.9,279.5,40.7],'l',[279.5,84.3],'bc',[279.5,86.1,280.4,86.9,282.1,86.9],'l',[284.0,86.9],'bc',[285.8,86.9,286.6,86.1,286.6,84.3],'l',[286.6,66.7],'l',[300.9,66.7],'cp',[],'f',[],
// 	'bp',[],'m',[312.5,98.7],'l',[312.5,39.2],'l',[303.7,39.2],'l',[303.7,26.3],'l',[335.8,26.3],'l',[335.8,39.2],'l',[327.0,39.2],'l',[327.0,98.7],'l',[312.5,98.7],'cp',[],'f',[]
// ];


});