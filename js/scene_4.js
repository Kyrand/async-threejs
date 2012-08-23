if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
// Scene dimensions
var SCENE_WIDTH = window.innerWidth, SCENE_HEIGHT = window.innerHeight,
// camera attributes
CAMERA_VIEW_ANGLE = 45,
CAMERA_ASPECT = SCENE_WIDTH / SCENE_HEIGHT,
// we'll be attaching the scene to a DOM element
// scene_container = $('#container'),
scene_container = document.createElement( 'div' );
document.body.appendChild(scene_container);
// scene_container = document.getElementById('container'),
// THREE.js key elements
// This will do the actual GL-drawing:
renderer = new THREE.WebGLRenderer(),
// This is the eye on the world:
camera = new THREE.PerspectiveCamera(
    CAMERA_VIEW_ANGLE, CAMERA_ASPECT, 0.1/*NEAR*/, 1000/*FAR*/
),
// This sets the... 
scene = new THREE.Scene();
// Now to hook up the THREE.js pieces
// add camera to scene
scene.add(camera)
// pull camera back to better vantage point
camera.position.z = 300;
// set renderer's size
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
renderer.setClearColorHex(0xEEEEEE, 1.0); 
// and attach to our container DOM 
scene_container.appendChild(renderer.domElement);

// scene 2, add summit
var cube = new THREE.Mesh(
    new THREE.CubeGeometry(50,50,50),
    // new THREE.MeshBasicMaterial( {color: 0x111111, opacity:1})
    // new THREE.MeshBasicMaterial( {color: 0x111111, opacity:1})
    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
);
scene.add(cube);
// some light on the situation
var light = new THREE.SpotLight();
light.position.set( 150, 150, 150 );
scene.add(light);

camera.position.y = 50;
cube.rotation.y += 0.7;

// var ambient = new THREE.AmbientLight( 0x050505 ); 
// scene.add( ambient ); 
//renderer.render(scene, camera);
animate();
function animate() {
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
}

function add_cube(x, y, z){
    var cube = new THREE.Mesh(
        new THREE.CubeGeometry(50,50,50),
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
    );
    cube.position.set(x, y, z);
    scene.add(cube);
    return cube;
}

scene_cubes = [];
scene_cubes.push(add_cube(0, 0, 0));
scene_cubes.push(add_cube(0, 50, 0));
scene_cubes.push(add_cube(0, 100, 0));

function animate(t) {
     for(i in scene_cubes){
         cube = scene_cubes[i];
         cube.rotation.y += 2 * (i%2 - 0.5) * (t-last_t)*0.001;
     }
     last_t = t;
     requestAnimationFrame(animate);
     renderer.render(scene, camera);
};

// new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
// renderer.setSize(document.body.clientWidth, document.body.clientHeight);



// renderer = new THREE.WebGLRenderer();
// clock = new THREE.Clock();

// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setFaceCulling( 0 );
// renderer.autoClear = false;
// document.body.appendChild(renderer.domElement);
// renderer.setClearColorHex(0xEEEEEE, 1.0);
// renderer.clear();


// var fov = 45; // camera field-of-view in degrees
// var width = renderer.domElement.width;
// var height = renderer.domElement.height;
// var aspect = width / height; // view aspect ratio
// var camera = new THREE.PerspectiveCamera( fov, aspect, 1, 1000000 );
// var cameraCube = new THREE.PerspectiveCamera( fov, aspect, 1, 1000000 );
// camera.position.z = 300;
// controls = new THREE.FirstPersonControls( camera );

// controls.movementSpeed = 70;
// controls.lookSpeed = 0.05;
// controls.lookVertical = true;
// controls.constrainVertical = true;

// var scene = new THREE.Scene();
// var sceneCube = new THREE.Scene();
// scene.add(camera);
// sceneCube.add(cameraCube);
// // scene.add(camera);
// var cube = new THREE.Mesh(
//     new THREE.CubeGeometry(50,50,50),
//     new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
// );
// scene.add(cube);
// var ambient = new THREE.AmbientLight( 0x050505 );
// scene.add( ambient );

// var light = new THREE.SpotLight();
// light.position.set( 150, 300, 150 );
// scene.add(light);

// // Add a little sky-box
// var urlPrefix	= "/images/podsky/";
// var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
// 	     urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
// 	     urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
// var textureCube	= THREE.ImageUtils.loadTextureCube( urls );

// // init the cube shadder
// var shader	= THREE.ShaderUtils.lib["cube"];
// shader.uniforms["tCube"].texture = textureCube;
// var material = new THREE.ShaderMaterial({
//     fragmentShader	: shader.fragmentShader,
//     vertexShader	: shader.vertexShader,
//     uniforms	: shader.uniforms,
//     depthWrite: false,
//     side: THREE.BackSide 
// });
// //build the skybox Mesh
// var sky_cube_dim = 100;
// skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( sky_cube_dim, sky_cube_dim, sky_cube_dim), material );
// //add it to the scene
// sceneCube.add( skyboxMesh );


// renderer.render(scene, camera); 
// var paused = false;
// var last_t = new Date().getTime();
// function animate(t) {
//     if (!paused) {
//         cube.rotation.y += (t-last_t)*0.001;
//             // <!-- camera.position.set( -->
//             //                           <!--   Math.sin(t/1000)*300, 150, Math.cos(t/1000)*300); -->
//         // renderer.clear(); 
//             // <!-- camera.lookAt(scene.position); -->
//         last_t = t;
//         controls.update(clock.getDelta());
//         renderer.render(scene, camera);
//         renderer.render(sceneCube, cameraCube);
//     }
//     window.requestAnimationFrame(animate, renderer.domElement);
// };
// animate(new Date().getTime());
