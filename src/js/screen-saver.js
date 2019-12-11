var scene = new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#E5E5E5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 20, 100 );
controls.update();

var lightGreen = new THREE.PointLight( 0x00ff00, 0.1, 1000 );
lightGreen.position.set( -10, 100, -100 );
scene.add( lightGreen );

var lightRed= new THREE.PointLight( 0xff0000, 0.2, 1000 );
lightRed.position.set( -100, -10, 0);
scene.add( lightRed );

var lightYellow= new THREE.PointLight( 0xffff66, 0.5, 1000 );
lightYellow.position.set( 10, 50, 100 );
scene.add( lightYellow);


scene.background = new THREE.CubeTextureLoader()
	.setPath( './images/' )
	.load( [
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
    ] );


    var listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    var sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( './sound/Shooting Stars.ogg', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );

    });



var font = undefined;
var textMesh;
const phrases = [
    "Bueno",
    "Reprovado",
    "Vou postar as notas essa semana ainda, rs",
    "Polinesia francesa",
    "Vcs não se emocionam?",
    "lansou a braba",
    "Eusguri",
    "Abrindo parenteses",
    "Fechando parenteses"
]
var phrasesID = 0
loadFont();

var rotationSpeed = 0.01;
var yrotation = 0;
var xspeed = THREE.Math.randFloat(-1 , 1);
var yspeed = THREE.Math.randFloat(-1 , 1);
var zspeed = THREE.Math.randFloat(-1 , 1);
var xposition = 0;
var yposition = 0;
var zposition = 0;
document.addEventListener("keydown", onDocumentKeyDown, false);
const cubeCamera = new THREE.CubeCamera(1, 1000, 520);
scene.add(cubeCamera);

function onDocumentKeyDown(event) {
    var keyCode = event.key;
    if (keyCode == 'ArrowLeft') {
        if(phrasesID){
            phrasesID -= 1;
        }else{
            phrasesID = phrases.length - 1;
        }
        refreshText();
    } else if (keyCode == 'ArrowRight') {
        phrasesID = (phrasesID + 1)%phrases.length;
        refreshText();
    }else if(keyCode == 'Enter'){
        sound.play();
        animate();

    }
};

function animate() {
    requestAnimationFrame(animate);
    bounceTextMesh();
    controls.update();
    renderer.render(scene, camera);
    cubeCamera.update(renderer, scene);
};

function bounceTextMesh(){
    xposition += xspeed;
    textMesh.position.x = xposition;
    yposition += yspeed;
    textMesh.position.y = yposition;
    zposition += zspeed;
    textMesh.position.z = zposition;
    if(xposition > 100 || xposition < -100){
        xspeed *= -1;
        rotationSpeed *= -1;
    }
    if(yposition > 100|| yposition < -100){
        yspeed *= -1;
        rotationSpeed *= -1;
    }
    if(zposition > 100 || zposition < -100){
        zspeed *= -1;
        rotationSpeed *= -1;
    }
    yrotation += rotationSpeed;
    textMesh.rotation.y = yrotation;
}

function loadFont(){
    var loader = new THREE.FontLoader();
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( response ) {
		font = response;
        createText();
    } );
}

function refreshText() {
	scene.remove( textMesh );
	createText();
}

function createText() {
    var textGeometry = new THREE.TextGeometry( phrases[phrasesID], {
        size: 10,
        height: 3,
        curveSegments: 10,
        font: font
    });
    textGeometry.center();
    var material = new THREE.MeshPhongMaterial({color:0xffffff});
    material.envMap = cubeCamera.renderTarget.texture;
    textMesh = new THREE.Mesh( textGeometry, material);
    scene.add(textMesh);
}
