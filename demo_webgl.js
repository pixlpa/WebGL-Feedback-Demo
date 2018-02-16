var c = document.getElementById('c');
c.width = $(document).width();
c.height = $(document).height();
c.aspect = $(document).width()/$(document).height();

var gl;

//set up globals
var basevs,basefs,feedback,heightfs,heightflow,testfs,tester;
var camtex,ppgm,noisetex;
var webcam=document.createElement('video');

//set the initial state of the effect
var FLOWSTATE = {
	warp:	0.05,
	mixin:	0.1,
	aspect: c.width/c.height
}
//method to translate stored settings into shader uniforms
FLOWSTATE.calc = function(){
	gl.useProgram(heightflow.pgm);
	gl.uniform1f(gl.getUniformLocation(heightflow.pgm,"warp"),this.warp);
	gl.uniform1f(gl.getUniformLocation(heightflow.pgm,"mixin"),this.mixin);
	gl.uniform1f(gl.getUniformLocation(heightflow.pgm,"aspect"),this.aspect);
}

//initialize the important stuff
initGL();
initSlabs();
resizeCanvas();	

function initGL(){
	gl = c.getContext('webgl');
	gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
	gl.disable(gl.BLEND);
	gl.disable(gl.DEPTH_TEST);
	gl.clearColor(0.,0.,0.,1.);
	gl.viewport(0,0,c.width,c.height);
}

function initSlabs(){
	// generate the shaders
	basevs = pxShader(shades.basevs,gl.VERTEX_SHADER);
	basefs = pxShader(shades.basefs,gl.FRAGMENT_SHADER);
	heightfs = pxShader(shades.basic,gl.FRAGMENT_SHADER);
	ppgm = pxProgram(basevs,basefs);
	
	// create Slab
	heightflow = new pxSlab(basevs,heightfs);
	heightflow.allocate(c.width,c.height);
	
	// create the FBO
	feedback = new pxFBO();
	feedback.allocate2(c.width,c.height);
		
	FLOWSTATE.calc();
}

function initImages(){	
	camtex = gl.createTexture();
	camtex.image = webcam;
	gl.bindTexture(gl.TEXTURE_2D, camtex);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
   	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, webcam);		
}

//the "animate" function is where the draw loop happens
function animate() {
	//set up the next frame
	window.requestAnimFrame( animate );
	//recalculate the settings
	FLOWSTATE.aspect = c.height/c.width;
	FLOWSTATE.calc();
	
	//clear the frame
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	//bind the "heightflow" slab
	heightflow.start();
	//clear the color buffer
	gl.clear(gl.COLOR_BUFFER_BIT);
	//draw the "feedback" image (along with camera) into the heightflow buffer, using the heightflow shader
	feedback.draw2(heightflow.pgm,camtex);

	//bind the feedback slab
	feedback.start();
	//clear the color buffer
	gl.clear(gl.COLOR_BUFFER_BIT);
	//draw the heightflow buffer image into the feedback buffer, using a very simple, passthru shader
	heightflow.draw(ppgm);
	
	//unbind the framebuffer so that we draw to screen
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	//draw the heightflow buffer to screen
	heightflow.draw(ppgm);
	
	//important note about feedback with framebuffers:
	//You can't draw a framebuffer texture into itself (unlike an HTML5 canvas), so it's always going to be
	//necessary to have at least one otherframebuffer in the drawing chain. 
   			
   	//update camera texture
	gl.bindTexture(gl.TEXTURE_2D, camtex);
   	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, webcam);
}

//The current best practice for camera input. This seems to change regularly so could break.	
function startvideo() {
    webcam.style.width = document.width + 'px';
    webcam.style.height = document.height + 'px';
    webcam.setAttribute('autoplay', '');
    webcam.setAttribute('muted', '');
	webcam.setAttribute('playsinline', '');

    var constraints = {
         audio: false,
         video: {
             facingMode: 'user'
         }
    }
 	navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        webcam.srcObject = stream;
        initImages();
        animate();
    });
}

//You need to bind a user interaction in order to start video input on Safari and iOS
$(document).ready (function(){
	$('body').bind("click touchstart",function(){
		startvideo();
		$('#startmessage').empty();
		$('body').unbind("click touchstart");
	});
});

//This makes sure everything is the right size
function resizeCanvas() {
    c.width = c.clientWidth;
    c.height = c.clientHeight;
    c.aspect = c.width/c.height;
    gl.viewport(0,0,c.width,c.height);
    feedback.allocate2(c.width,c.height);
	heightflow.allocate(c.width,c.height);
}

//who knows if this polyfill is still necessary
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           return window.setTimeout(callback, 1000/60);
         };
})();


