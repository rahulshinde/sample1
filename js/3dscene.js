//general scene variables

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var mesh1,
	mesh2,
	mesh3,
	mesh4;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var rotationSpeed = 0.001;

//variables for movable light

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

var container = document.getElementById( 'container' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 125;

	var cameraControls;

	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set( 0, 0, 0);
	cameraControls.maxDistance = 400;
	cameraControls.minDistance = 30;
	cameraControls.update();

	//adding lights, sphere is just to check light position.
	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	lightGroup = new THREE.Group();


	//orange
	light1 = new THREE.PointLight( 0xf4bd82, 1, 4500 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf4bd82 } ) ) );
	light1.position.set( -40, 0, -10 );

	lightGroup.add( light1 );
	scene.add( light1 );

	//pink
	light2 = new THREE.PointLight( 0xfc86a8, 1, 4500 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf482c6 } ) ) );
	light2.position.set( 40, 30, -30 );

	lightGroup.add( light2 );
	scene.add( light2 );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	directionalLight.position.set( 0, 1, -10 );

	lightGroup.add( directionalLight );
	scene.add( directionalLight )

	var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	directionalLight2.position.set( 0, 1, 40 );

	lightGroup.add( directionalLight2 );
	scene.add( directionalLight2 )

	// scene.add ( lightGroup );

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	//////////////////////// 
	///adding main shapes///
	////////////////////////

	group = new THREE.Group();

	//shape1 (shape a.)

	var shape1 = new THREE.Shape();

	shape1.moveTo( 0, 0 );
	shape1.bezierCurveTo( -1, -1, -1, 6, 0, 7 );
	shape1.bezierCurveTo( 0, 7, 1, 7, 1, 9 );
	shape1.bezierCurveTo( 0, 11, 2, 9, 3, 7 );
	shape1.bezierCurveTo( 3, 6, 3, 4, 5, 4 );
	shape1.bezierCurveTo( 5, 4, 3, 3, 4, 2 );
	shape1.bezierCurveTo( 4, 2, 3, 2, 3, 0 );
	shape1.bezierCurveTo( 3, 0, 2, -1, 2, -1 );
	shape1.bezierCurveTo( 2, -1, 1, 1, 0, 0 );

	var extrudeSetting1 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry1 = new THREE.ExtrudeGeometry( shape1, extrudeSetting1 );

	mesh1 = new THREE.Mesh( geometry1, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh1.scale.set(1.9,1.9,1.9);

	mesh1.position.x = -40;
	mesh1.position.y = 3;

	group.add( mesh1 );

	//shape2 (shape b.)

	var shape2 = new THREE.Shape();

	shape2.moveTo( 0, 0 );
	shape2.bezierCurveTo( 0, 0, 1, 1, -1, 1 );
	shape2.bezierCurveTo( -2, 1, -2, 5, -2, 5 );
	shape2.bezierCurveTo( -2, 5, -1, 6, -1, 6 );
	shape2.bezierCurveTo( 5, 10, 20, 6, 20, 6 );
	shape2.bezierCurveTo( 19, 5, 20, 5, 20, 5 );
	shape2.bezierCurveTo( 20, 5, 18, 4, 18, 4 );
	shape2.bezierCurveTo( 20, 8, 8, 1, 8, 1 );
	shape2.bezierCurveTo( 10, 2, 3, 5, 3, 4 );
	shape2.bezierCurveTo( 3, 3, 2, 3, 2, 3 );
	shape2.bezierCurveTo( 1, 3, 0, 1, 2, 2 );

	var extrudeSetting2 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry2 = new THREE.ExtrudeGeometry( shape2, extrudeSetting2 );

	mesh2 = new THREE.Mesh( geometry2, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh2.scale.set(1.9, 1.9,1.9);
	mesh2.position.x = -20;
	mesh2.position.y = 35;

	group.add( mesh2 );

	//shape3 (shape c.)

	var shape3 = new THREE.Shape();

	shape3.moveTo( 0, 0 );
	shape3.bezierCurveTo( 3, 3, 4, 3, 3, 2 );
	shape3.bezierCurveTo( 4, 3, 4, 2, 4, 2 );
	shape3.bezierCurveTo( 4, 2, 5, 3, 5, 2 );
	shape3.bezierCurveTo( 6, 1, 4, 1, 5, 0 );
	shape3.bezierCurveTo( 6, -1, 0, 0, 0, 0 );

	var extrudeSetting3 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry3 = new THREE.ExtrudeGeometry( shape3, extrudeSetting3 );

	mesh3 = new THREE.Mesh( geometry3, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh3.scale.set(1.9, 1.9, 1.9);
	mesh3.position.x = -4;
	mesh3.position.y = -5;

	group.add( mesh3 );

	//shape4 (shape d.)

	var shape4 = new THREE.Shape();

	shape4.moveTo( 0, 0 );
	shape4.bezierCurveTo( 0, 0, -1, 2, -1, 2 );
	shape4.bezierCurveTo( -1, 2, 0, 3, 0, 3 );
	shape4.bezierCurveTo( 0, 3, -1, 4, -1, 4 );
	shape4.bezierCurveTo( -1, 4, 1, 4, 1, 4 );
	shape4.bezierCurveTo( 1, 4, 2, 3, 2, 3 );
	shape4.bezierCurveTo( 2, 3, 2, 4, 2, 4 );
	shape4.bezierCurveTo( 2, 4, 3, 4, 3, 4 );
	shape4.bezierCurveTo( 3, 3, 4, 4, 4, 4 );
	shape4.bezierCurveTo( 3, 5, 6, 4, 6, 4 );
	shape4.bezierCurveTo( 6, 2, 7, 3, 7, 3 );
	shape4.bezierCurveTo( 7, 3, 6, 0, 6, 0 );
	shape4.bezierCurveTo( 5, 1, 3, -1, 3, -1 );
	shape4.bezierCurveTo( 2, 0, 0, 0, 0, 0 );

	var extrudeSetting4 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry4 = new THREE.ExtrudeGeometry( shape4, extrudeSetting4 );

	mesh4 = new THREE.Mesh( geometry4, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh4.scale.set(1.9,1.9,1.9);
	mesh4.rotation.z = 1.9;
	mesh4.position.x = 43;
	mesh4.position.y = -10;

	group.add( mesh4 );

	//shape5 (shape e.)

	var shape5 = new THREE.Shape();

	shape5.moveTo( 0, 0 );
	shape5.bezierCurveTo( 0, 0, -2, 2, -2, 2 );
	shape5.bezierCurveTo( -2, 2, 0, 2, 0, 2 );
	shape5.bezierCurveTo( 0, 2, -2, 3, -2, 3 );
	shape5.bezierCurveTo( -2, 3, -1, 4, -1, 4 );
	shape5.bezierCurveTo( -1, 4, 0, 4, 0, 4 );
	shape5.bezierCurveTo( 0, 4, 0, 5, 1, 5 );
	shape5.bezierCurveTo( 2, 6, -3, 7, 1, 8 );
	shape5.bezierCurveTo( 4, 9, 2, 10, 2, 10 );
	shape5.bezierCurveTo( 2, 10, 3, 12, 3, 12 );
	shape5.bezierCurveTo( 6, 14, 6, 13, 6, 13 );
	shape5.bezierCurveTo( 11, 14, 10, 13, 10, 13 );
	shape5.bezierCurveTo( 10, 13, 11, 14, 11, 14 );
	shape5.bezierCurveTo( 16, 15, 20, 14, 20, 14 );
	shape5.bezierCurveTo( 19, 16, 6, 15, 6, 15 );
	shape5.bezierCurveTo( 8, 16, 10, 16, 10, 16 );
	shape5.bezierCurveTo( 12, 19, 19, 17, 20, 19 );
	shape5.bezierCurveTo( 23, 20, 25, 19, 27, 19 );
	shape5.bezierCurveTo( 29, 19, 30, 12, 28, 12 );
	shape5.bezierCurveTo( 26, 12, 30, 10, 30, 10 );
	shape5.bezierCurveTo( 30, 10, 29, 16, 32, 13 );
	shape5.bezierCurveTo( 32, 13, 35, 10, 35, 11 );
	shape5.bezierCurveTo( 35, 9, 37, 10, 37, 10 );
	shape5.bezierCurveTo( 37, 10, 38, 10, 37, 9 );
	shape5.bezierCurveTo( 36, 8, 37, 8, 38, 6 );
	shape5.bezierCurveTo( 39, 4, 36, 2, 36, 2 );
	shape5.bezierCurveTo( 36, 2, 31, 1, 28, 1 );
	shape5.bezierCurveTo( 26, 1, 27, 3, 27, 3 );
	shape5.bezierCurveTo( 27, 3, 22, 3, 22, 3 );
	shape5.bezierCurveTo( 22, 3, 23, 4, 23, 4 );
	shape5.bezierCurveTo( 22, 3, 21, 5, 21, 5 );
	shape5.bezierCurveTo( 22, 4, 20, 3, 20, 3 );
	shape5.bezierCurveTo( 20, 3, 20, 4, 20, 4 );
	shape5.bezierCurveTo( 20, 4, 19, 5, 19, 5 );
	shape5.bezierCurveTo( 20, 6, 19, 7, 17, 6 );
	shape5.bezierCurveTo( 15, 5, 17, 5, 17, 5 );
	shape5.bezierCurveTo( 17, 5, 16, 4, 16, 4 );
	shape5.bezierCurveTo( 15, 3, 15, 6, 15, 6 );
	shape5.bezierCurveTo( 15, 6, 14, 5, 14, 5 );
	shape5.bezierCurveTo( 14, 5, 12, -1, 12, -1 );
	shape5.bezierCurveTo( 12, -1, 4, -3, 8, -1 );
	shape5.bezierCurveTo( 12, 0, 9, 0, 9, 0 );
	shape5.bezierCurveTo( 4, -1, 4, 1, 4, 1 );

	var extrudeSetting5 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry5 = new THREE.ExtrudeGeometry( shape5, extrudeSetting5 );

	mesh5 = new THREE.Mesh( geometry5, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh5.scale.set(1.9,1.9,1.9);
	mesh5.position.x = -25;
	mesh5.position.y =0;

	group.add( mesh5 );

		//shape6 (shape f.)

	var shape6 = new THREE.Shape();

	shape6.moveTo( 0, 0 );
	shape6.bezierCurveTo( -1, 1, 1, 2, 1, 2 );
	shape6.bezierCurveTo( 1, 2, 0, 2, 0, 2 );
	shape6.bezierCurveTo( 0, 2, 1, 4, 0, 3 );
	shape6.bezierCurveTo( -1, 2, -1, 2, -1, 2 );
	shape6.bezierCurveTo( -1, 2, -1, 4, 0, 4 );
	shape6.bezierCurveTo( 0, 4, 1, 5, 1, 5 );
	shape6.bezierCurveTo( 1, 5, 1, 4, 1, 4 );
	shape6.bezierCurveTo( 1, 4, 2, 4, 2, 5 );
	shape6.bezierCurveTo( 2, 6, 3, 5, 3, 5 );
	shape6.bezierCurveTo( 3, 5, 5, 6, 3, 3 );
	shape6.bezierCurveTo( 2, 1, 3, 1, 3, 1 );
	shape6.bezierCurveTo( 3, 1, 2, -1, 2, -1 );



	var extrudeSetting6 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry6 = new THREE.ExtrudeGeometry( shape6, extrudeSetting6 );

	mesh6 = new THREE.Mesh( geometry6, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh6.scale.set(1.9,1.9,1.9);
	mesh6.position.x = 5;
	mesh6.position.y = -39;

	group.add( mesh6 );

	//shape7 (shape g.)

	var shape7 = new THREE.Shape();

	shape7.moveTo( 0, 0 );
	shape7.bezierCurveTo( 0, 0, 0, 12, 0, 12 );
	shape7.bezierCurveTo( 5, 2, 0, 0, 0, 0);



	var extrudeSetting7 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry7 = new THREE.ExtrudeGeometry( shape7, extrudeSetting7 );

	mesh7 = new THREE.Mesh( geometry7, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh7.scale.set(1.9,1.9,1.9);
	mesh7.rotation.z = -1.2;
	mesh7.position.x = 15;
	mesh7.position.y = -30;

	group.add( mesh7 );

	//shape8 (shape h.)

	var shape8 = new THREE.Shape();

	shape8.moveTo( 0, 0 );
	shape8.bezierCurveTo( -1, -1, -1, 2, -1, 2 );
	shape8.bezierCurveTo( -1, 2, 0, 3, 0, 3 );
	shape8.bezierCurveTo( 0, 3 , -2, 5, -2, 5 );



	var extrudeSetting8 = { amount: 2, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry8 = new THREE.ExtrudeGeometry( shape8, extrudeSetting8 );

	mesh8 = new THREE.Mesh( geometry8, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh8.scale.set(1.9,1.9,1.9);
	mesh8.position.x = -15;
	mesh8.position.y = -25;

	group.add( mesh8 );

	scene.add( group );

	/////////////////////
	////adding walls/////
	/////////////////////

	//wall 1

	var imageFrame = new THREE.BoxGeometry( 150, 140, 0.1 );
	var image1Material = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('img/1.jpg') , side: THREE.DoubleSide} );
	var image1 = new THREE.Mesh( imageFrame, image1Material );

	image1.position.z = -5;

	scene.add( image1 );


	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {

	lightGroup.rotation.x += rotationSpeed;
	lightGroup.rotation.y += rotationSpeed;
	lightGroup.rotation.z += rotationSpeed;

	renderer.render(scene, camera);
};