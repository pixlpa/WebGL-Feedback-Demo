# WebGL Feedback Demo
WebGL setup for rendering multi-pass shader networks for image processes.

This demo shows my basic setup for developing WebGL pages with image processing effects. It doesn't require any WebGL frameworks, as my intention was to create a minimal setup that is simple for me to develop for. This style of working with textures, shaders, and FBOs was inspired by my work with Jitter (jit.gl.slab) and is informed by the way ofShader is implemented in OpenFrameworks. I haven't come across any other WebGL libraries that make it this straightforward to experiment and develop texture processing effects. It was also developed with an eye toward making it easy for me to port Jitter work over to webpages, since I prefer the nonlinear workflow there.

## pxslabs.js
My small library for setting up framebuffers and fragment shaders in a way that lends itself to image processing chains. This is super useful for any kind of full-frame FX or if you want to play with video feedback style experiments.

## shaders.js
I prefer to load my shaders as a JS Object full of strings that I can load directly into WebGL. This eliminates the need for special text parsing routines, but introduces a little overhead making sure line endings in the GLSL are marked properly. A typical project for me, like melter.club might have as many as 15 different shaders in this file.

## demo_webgl.js
This file shows a typical setup and usage of the pxslabs library. I do everything with raw library calls to WebGL, so it's not as tidy as running THREE.js, but it's about as optimal as you can get if you just want to do texture processing. I also like to do all the WebGL initialization stuff directly because I find it simpler than hunting down parameters inside of a library. Using raw WebGL means it's also very simple to build graphics drawing routines on top of the texture processing. I may add in one of my simple polygon animation things if I can clean it up.

Simplicity means different things to different people. 

This works for me, but it might be too bare-metal for most usages. It's a good starting point though if you want to understand framebuffers and fragment shaders in WebGL, so there's probably some educational value here.
