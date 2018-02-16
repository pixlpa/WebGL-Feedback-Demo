var shades ={
	simplefs:
    	"precision mediump float;\n\
    	varying vec4 vColor;\n\
    	varying vec2 tc;\n\
		uniform sampler2D tex0;\n\
		uniform sampler2D tex1;\n\
		uniform float usetex;\n\
		\n\
    	void main(void) {\n\
    		vec4 tt = texture2D(tex0,tc);\n\
        	gl_FragColor = vec4(mix(vec3(1.),tt.rgb,usetex)*vColor.rgb*vec3(tt.a*vColor.a),vColor.a*tt.a);\n\
    	}",
	simplevs:
	    "attribute vec3 pos;\n\
	    attribute vec4 color;\n\
	    attribute vec2 texcoord;\n\
	    \n\
	    uniform vec2 tscale;\n\
	    uniform vec2 toffset;\n\
	    uniform vec2 pscale;\n\
	    uniform vec2 ptranslate;\n\
	    uniform vec4 pcolor;\n\
		\n\
    	varying vec4 vColor;\n\
    	varying vec2 tc;\n\
		\n\
    	void main(void) {\n\
        	gl_Position = vec4(pos*vec3(pscale.xy,1.)+vec3(ptranslate.xy,0.),1.);\n\
        	vColor = color*pcolor;\n\
        	vec2 ttt = ((texcoord*2.-vec2(1.))*tscale+toffset)*0.5+vec2(0.5);\n\
        	tc= ttt;\n\
    	}",
     basevs:
     	"attribute vec3 pos;\n\
     	attribute vec4 color;\n\
     	attribute vec2 texcoord;\n\
     	varying vec4 vColor;\n\
     	varying vec2 tc;\n\
     	\n\
     	void main(void){\n\
     		gl_Position = vec4(pos,1);\n\
     		tc = texcoord;\n\
     		vColor = color;\n\
     	}",
     basefs:
    	"precision mediump float;\n\
    	varying vec4 vColor;\n\
    	varying vec2 tc;\n\
		uniform sampler2D tex0;\n\
		uniform sampler2D tex1;\n\
		\n\
    	void main(void) {\n\
        	gl_FragColor = texture2D(tex0,tc);\n\
    	}",
		testfs:
    	"precision mediump float;\n\
    	varying vec4 vColor;\n\
    	varying vec2 tc;\n\
		//uniform sampler2D tex0;\n\
		//uniform sampler2D tex1;\n\
		\n\
    	void main(void) {\n\
        	gl_FragColor = vColor;\n\
    	}",
	basic:
		"precision highp float;\n\
		varying vec2 tc;\n\
		uniform sampler2D tex0;\n\
		uniform sampler2D tex1;\n\
		uniform float warp;\n\
		uniform float mixin;\n\
		uniform float aspect;\n\
		\n\
		void main()\n\
		{   \n\
			vec2 asp = vec2(aspect,1.);\n\
			vec2 wack = tc + (tc-vec2(0.5))*clamp(length((tc-vec2(0.5))*asp),0.,1.)*-warp;\n\
    		vec4 a = texture2D(tex0, wack)*1.06-vec4(0.025);\n\
    		vec4 b = texture2D(tex1, tc);\n\
			gl_FragColor = mix(a,b,mixin);\n\
		}"
};
