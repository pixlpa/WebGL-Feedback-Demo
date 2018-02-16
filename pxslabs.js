/*  
This implementation was created to mimic the "jit.gl.slab" object in Jitter (Cycling '74). I've never
looked at the code for that object, but the idea is similar - bundling an FBO with 
a fragment shader program and a billboard mesh. A similar technique is used in Open Frameworks.
Since I do a lot of my shader prototyping in Max
it made sense to me to have a way to migrate the complex shader chains into webpages.
*/

function pxSlab(vs,fs){
	//the "start" method is borrowed from the OpenFrameworks implementation of texture processing
	this.start = function(){
		gl.bindFramebuffer(gl.FRAMEBUFFER,this.fbo);
		gl.useProgram(this.pgm);
	};
	this.allocate = function(w,h){
		//make the framebuffer and texture output of the shader rendering
		this.fbo = gl.createFramebuffer();	
		this.texture = gl.createTexture();
  		//set properties for the texture
  		gl.bindTexture(gl.TEXTURE_2D, this.texture);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w,h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  		//bind framebuffer to texture
  		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
  		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	};
	this.allocate2 = function(w,h){
		//make the framebuffer and texture output
		this.fbo = gl.createFramebuffer();	
		this.texture = gl.createTexture();
  		//set properties for the texture
  		gl.bindTexture(gl.TEXTURE_2D, this.texture);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w,h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  		//bind framebuffer to texture
  		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
  		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	};
	//the different draw functions are there to accomodate different numbers of textures
	this.draw = function(pgm){
		this.bb.draw(pgm,this.texture);
	};
	this.draw2 = function(pgm,texture2){
		this.bb.draw2(pgm,this.texture,texture2);
	};
	this.draw3 = function(pgm,texture2,texture3){
		this.bb.draw3(pgm,this.texture,texture2,texture3);
	};
	this.draw4 = function(pgm,texture2,texture3,texture4){
		this.bb.draw2(pgm,this.texture,texture2,texture3,texture4);
	};
	this.createPGM = function(v,f) {
		//assumes individual shaders are already compiled by the running code
	 	var program = gl.createProgram();
  		gl.attachShader(program, v);
  		gl.attachShader(program, f);
  		gl.linkProgram(program);
  		return program;
  	};
  	this.pgm = this.createPGM(vs,fs);
	this.fbo;
	this.texture;
	this.bb = new pxBB(gl);
}

//this is for when you need a framebuffer to draw into, but don't need another shader
function pxFBO(){
	this.start = function(pgm){
		//get things ready for 
		gl.bindFramebuffer(gl.FRAMEBUFFER,this.fbo);
	};
	this.allocate = function(w,h){
		//make the framebuffer and texture output
		this.fbo = gl.createFramebuffer();	
		this.texture = gl.createTexture();
  		//set properties for the texture
  		gl.bindTexture(gl.TEXTURE_2D, this.texture);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w,h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  		//bind framebuffer to texture
  		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
  		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	};
	this.allocate2 = function(w,h){
		//make the framebuffer and texture output
		this.fbo = gl.createFramebuffer();	
		this.texture = gl.createTexture();
  		//set properties for the texture
  		gl.bindTexture(gl.TEXTURE_2D, this.texture);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w,h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  		//bind framebuffer to texture
  		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
  		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
	};
	this.draw = function(pgm){
		this.bb.draw(pgm,this.texture);
	};
	this.draw2 = function(pgm,texture2){
		this.bb.draw2(pgm,this.texture,texture2);
	};
	this.draw2 = function(pgm,texture2){
		this.bb.draw2(pgm,this.texture,texture2);
	};
	this.draw3 = function(pgm,texture2,texture3){
		this.bb.draw3(pgm,this.texture,texture2,texture3);
	};
	this.draw4 = function(pgm,texture2,texture3,texture4){
		this.bb.draw2(pgm,this.texture,texture2,texture3,texture4);
	};
	this.fbo;
	this.texture;
	this.bb = new pxBB(gl);
}

function pxShader(source,type){
	var shader = gl.createShader(type);
 	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    return null;
  	}
  	return shader;
}

function pxProgram(vid, fid) {
  	var program = gl.createProgram();
  	gl.attachShader(program, vid);
  	gl.attachShader(program, fid);
  	gl.linkProgram(program);
  	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
 		 throw gl.getProgramInfoLog(program);
	}
  	return program;
}


function pxBB(){
	//put together a basic billboard geometry to fill the screen
	this.vert = gl.createBuffer();
	initBuffer(this.vert,[
      -1.0,  1.0, 0.0,
      -1.0,  -1.0,0.0,
      1.0,  1.0,0.0,
      1.0,  -1.0,0.0
      ]);
      
    this.tex = gl.createBuffer();
    initBuffer(this.tex,[
    0,1,
    0,0,
    1,1,
    1,0]);
    
    this.color = gl.createBuffer();
    initBuffer(this.color,[
   	1,1,1,1,
   	1,1,1,1,
   	1,1,1,1,
   	1,1,1,1]);
}
pxBB.prototype.predraw = function(pgm){
	//hook up the vertex attributes
	//assumes the vertex shader used will have pos,color, texcoord inputs
		gl.useProgram(pgm);
		pgm.vertexPosAttrib = gl.getAttribLocation(pgm, 'pos');
		gl.enableVertexAttribArray(pgm.vertexPosAttrib);

		pgm.vertexColorAttrib = gl.getAttribLocation(pgm, 'color');
		gl.enableVertexAttribArray(pgm.vertexColorAttrib);
		
		pgm.vertexTexAttrib = gl.getAttribLocation(pgm, 'texcoord');
		gl.enableVertexAttribArray(pgm.vertexTexAttrib);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.color);
  	gl.vertexAttribPointer(pgm.vertexColorAttrib, 4, gl.FLOAT, false, 0, 0);
  	gl.bindBuffer(gl.ARRAY_BUFFER, this.vert);
  	gl.vertexAttribPointer(pgm.vertexPosAttrib, 3, gl.FLOAT, false, 0, 0);
  	gl.bindBuffer(gl.ARRAY_BUFFER, this.tex);
  	gl.vertexAttribPointer(pgm.vertexTexAttrib, 2, gl.FLOAT, false, 0, 0);
}
pxBB.prototype.draw = function(pgm,texture){
	this.predraw(pgm);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex0"), 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  	gl.drawArrays(gl.TRIANGLE_STRIP, 0,4);
}

pxBB.prototype.draw2 = function(pgm,texture1,texture2){
	this.predraw(pgm);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex0"), 0);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex1"), 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
  	gl.drawArrays(gl.TRIANGLE_STRIP, 0,4);
}

pxBB.prototype.draw3 = function(pgm,texture1,texture2,texture3){
	this.predraw(pgm);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex0"), 0);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex1"), 1);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex2"), 2);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture3);
  	gl.drawArrays(gl.TRIANGLE_STRIP, 0,4);
}

pxBB.prototype.draw4 = function(pgm,texture1,texture2,texture3,texture4){
	this.predraw(pgm);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex0"), 0);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex1"), 1);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex2"), 2);
    gl.uniform1i(gl.getUniformLocation(pgm,"tex3"), 3);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture3);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texture4);
  	gl.drawArrays(gl.TRIANGLE_STRIP, 0,4);
}

function initBuffer(buf,dataset){
  	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataset), gl.STATIC_DRAW);
}
