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

// document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
last_t = new Date().getTime();

animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    // camera.position.z = 3200;
    camera.position.z = 200;

    cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    controls = new THREE.FirstPersonControls( cameraCube );
    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    

    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();

    var geometry = new THREE.SphereGeometry( 100, 32, 16 );

    var path = "/images/cube/skybox/";
    var format = '.jpg';
    var urls = [
	path + 'px' + format, path + 'nx' + format,
	path + 'py' + format, path + 'ny' + format,
	path + 'pz' + format, path + 'nz' + format
    ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.95 } );

    cube = new THREE.Mesh(
        new THREE.CubeGeometry(50,50,50),
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/images/async_logo.jpg' ) })
    );
    scene.add(cube);
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
var World = function(){
    this.gravity = 



var Fireworklet = function() {
    this.world = world;
    this.live = false;
    // this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    // this.particle = particle;
    // this.particle = new THREE.Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    this.particle = new THREE.Vector3(0, 0, 999999); // behind camera + clipped
    this.world.fireworklets.vertices.push(this.particle);
    this.temp_mat = new THREE.Matrix4();
    this.temp_vec = new THREE.Vector3();
};

Fireworklet.prototype = {
    launch: function(pos, vel, lifespan, gen) {
        this.live = true;
        // this.pos.copy(pos);
        this.vel.copy(vel);
        // this.vel_x_dt = this.vel.clone().multiplySelf(this.world.physics_dt);
        this.lifespan = lifespan;
        this.gen = gen;
        this.launch_time = Date.now();
        this.particle.set(pos.x, pos.y, pos.z);
        // this.geom.rotation.getRotationFromMatrix(rot_m);
        // this.geom.scale.set(0.5, 0.5, 0.5); 
    },

    update: function(dt, time_now) {
        
        // update x and dx/dt
        this.particle.x += this.vel.x * dt;
        this.particle.y += this.vel.y * dt;
        this.particle.z += this.vel.z * dt;

        this.vel.x += this.world.gravity_vec.x * dt;
        this.vel.y += this.world.gravity_vec.y * dt;
        this.vel.z += this.world.gravity_vec.z * dt;

        
        // gravity + wind-resistance (?)
        // this.vel -= WORLD_GRAVITY*dt;
        if((time_now - this.launch_time > this.lifespan) ){
            if(this.gen === FIREWORK_MAX_GEN){
                this.live = false;
                this.particle.z = this.world.camera.position.z + 999999;
                // this.live = false;
                // console.log('Spawning...');
            }
            else{
                this.spawn();
                this.live = false;
                this.particle.z = this.world.camera.position.z + 999999;
            }
            
        }
        
    },

    spawn: function() {
        var i,
        deg45 = Math.PI/4,
        mat, zcos, zsin, theta,
        lifespan;
        // get rotation-matrix for children from velocity
        this.temp_vec.copy(this.vel);
        if(this.temp_vec.y < 0.0){ // pointing down
            this.temp_vec.copy(this.world.y_axis);
        }
        var rotm = ThreeUtils.makeRotMfromVecs(this.temp_vec);
        mat = this.temp_mat;
        ycos = Math.sin(deg45);
        ysin = Math.sin(deg45);
        for(i = 0; i < 8; i++){
            // mat.identity();
            // mat.setRotationX(deg45);
            // three.utils.rotateAroundWorldAxis(mat, deg45*i);
            theta = deg45 * i; 
            this.temp_vec.set(Math.sin(theta) * ycos, ycos,  ycos * Math.cos(theta));
            rotm.multiplyVector3(this.temp_vec);
            
            lifespan = this.gen === FIREWORK_MAX_GEN? this.world.fw_lifespan_emitter: this.world.fw_lifespan_exploder;
            lifespan *= 1 + (Math.random() - 0.5) * 0.5; // 0.75 --> 1.25
            this.world.launchFirework(this.particle, this.temp_vec.setLength(this.world.fw_start_vel*0.5), lifespan, this.gen+1);
            
        }
        
    }
};
    



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
    cube.rotation.y += (t-last_t)*0.001;
    
    // camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );
    cameraCube.rotation.copy( camera.rotation );

    controls.update(clock.getDelta());
    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );
    last_t = t;

}
