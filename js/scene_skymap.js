if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, scene, controls, renderer;
var cameraCube, sceneCube;

var mesh, lightMesh, geometry;
var spheres = [], cube;

var directionalLight, pointLight;

var mouseX = 0, mouseY = 0;
var last_t;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var clock = new THREE.Clock();
var scene_cubes = [];

// document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
last_t = new Date().getTime();

animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    // camera.position.z = 3200;
    camera.position.z = 300;

    cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    controls = new THREE.FirstPersonControls( cameraCube );
    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.lookVertical = true;
    // controls.constrainVertical = true;
    

    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 100, 32, 16 );

    var path = "/images/cube/skybox/";
    // var path = "/images/cube/polluted_earth/";
    var format = '.jpg';
    var urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.95 } );

function add_cube(x, y, z){
    var cube = new THREE.Mesh(
        new THREE.CubeGeometry(50,50,50),
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
    );
    cube.position.set(x, y, z);
    scene.add(cube);
    return cube;
}

scene_cubes.push(add_cube(0, 0, 0));
scene_cubes.push(add_cube(0, 50, 0));
scene_cubes.push(add_cube(0, 100, 0));
    // cube = new THREE.Mesh(
    //     new THREE.CubeGeometry(50,50,50),
    //     new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
    // );
    // scene.add(cube);
    // for ( var i = 0; i < 500; i ++ ) {

    //     var mesh = new THREE.Mesh( geometry, material );

    //     mesh.position.x = Math.random() * 10000 - 5000;
    //     mesh.position.y = Math.random() * 10000 - 5000;
    //     mesh.position.z = Math.random() * 10000 - 5000;

    //     mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

    //     scene.add( mesh );

    //     spheres.push( mesh );

    // }

    // Skybox

    var shader = THREE.ShaderUtils.lib[ "cube" ];
    shader.uniforms[ "tCube" ].texture = textureCube;

    var material = new THREE.ShaderMaterial( {

	fragmentShader: shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	depthWrite: false,
	side: THREE.BackSide

    } ),

    mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
    sceneCube.add( mesh );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    container.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// function onDocumentMouseMove(event) {

//     mouseX = ( event.clientX - windowHalfX ) * 10;
//     mouseY = ( event.clientY - windowHalfY ) * 10;

// }

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    // var timer = 0.0001 * Date.now();

    // for ( var i = 0, il = spheres.length; i < il; i ++ ) {

    //     var sphere = spheres[ i ];

    //     sphere.position.x = 5000 * Math.cos( timer + i );
    //     sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

    // }

    var t = new Date().getTime();
    // cube.rotation.y += (t-last_t)*0.001;
    
     for(i in scene_cubes){
         cube = scene_cubes[i];
         cube.rotation.y += 2 * (i%2 - 0.5) * (t-last_t)*0.001;
     }
    // camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );
    // cameraCube.rotation.copy( camera.rotation );
    camera.rotation.copy( cameraCube.rotation );

    controls.update(clock.getDelta());
    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );
    last_t = t;

}
