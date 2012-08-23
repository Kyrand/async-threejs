// notes - addobject to add etc..
// Revision 50!! not 49

// add a white grey cube
var cube = new THREE.Mesh(
    new THREE.CubeGeometry(50,50,50),
    new THREE.MeshBasicMaterial({color: 0xcccccc, opacity: 1})
);
scene.add(cube);
// make cube reflective and add a spotlight
var cube = new THREE.Mesh(
    new THREE.CubeGeometry(50,50,50),
        // new THREE.MeshBasicMaterial({color: 0xcccccc, opacity: 1})
        new THREE.MeshLambertMaterial({color: 0xcccccc})
);

var light = new THREE.SpotLight();
light.position.set( 150, 300, -150 );
scene.add(light);
// add some material 
var cube = new THREE.Mesh(
    new THREE.CubeGeometry(50,50,50),
        //new THREE.MeshBasicMaterial({color: 0xcccccc, opacity: 1}) 
        //new THREE.MeshLambertMaterial({color: 0xcccccc})
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
);


// Add a little sky-box
var urlPrefix	= "/images/podsky/";
var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
	     urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
	     urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
var textureCube	= THREE.ImageUtils.loadTextureCube( urls );

// init the cube shadder
var shader	= THREE.ShaderUtils.lib["cube"];
shader.uniforms["tCube"].texture = textureCube;
var material = new THREE.MeshShaderMaterial({
    fragmentShader	: shader.fragmentShader,
    vertexShader	: shader.vertexShader,
    uniforms	: shader.uniforms
});
//build the skybox Mesh
skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( 512, 512, 512, 1, 1, 1, null, true ), material );
//add it to the scene
scene.addObject( skyboxMesh );
// need to extend clipping distance
// add controls
controls = new THREE.FirstPersonControls( camera );
controls.lookSpeed = 0.0125;
controls.movementSpeed = 500;
controls.noFly = false;
controls.lookVertical = true;
controls.constrainVertical = true;
controls.verticalMin = 1.5;
controls.verticalMax = 2.0;
controls.lon = -110;
// need to update during render cycle
controls.update(delta);

// http://mrdoob.github.com/three.js/examples/webgl_geometries.html
// http://www.chaostoperfection.com/ - palace of Versailles
// http://www.ibiblio.org/e-notes/webgl/gpu/schrodinger.htm - schrodinger
