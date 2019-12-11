var scene = new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.z = 50;
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#E5E5E5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 20, 100 );
controls.update();
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

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
        sound.play();
    });



var font = undefined;
var textMesh;
const phrases = [
    "Bueno",
    "Sei lá",
    "Pao"
]
var phrasesID = 0
loadFont();

// em teste

// em teste
var rotationSpeed = 0.01;
var yrotation = 0;
var xspeed = THREE.Math.randFloat(-0.5 , 0.5);
var yspeed = THREE.Math.randFloat(-0.5 , 0.5);
var zspeed = THREE.Math.randFloat(-0.5 , 0.5);
var xposition = 0;
var yposition = 0;
var zposition = 0;
document.addEventListener("keydown", onDocumentKeyDown, false);
animate();

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
    }
};

function animate() {
    requestAnimationFrame(animate);
    bounceTextMesh();
    controls.update();
    renderer.render(scene, camera);
};

function bounceTextMesh(){
    xposition += xspeed;
    textMesh.position.x = xposition;
    yposition += yspeed;
    textMesh.position.y = yposition;
    zposition += zspeed;
    textMesh.position.z = zposition;
    if(xposition > 20 || xposition < -20){
        xspeed *= -1;
        rotationSpeed *= -1;
    }
    if(yposition > 20|| yposition < -20){
        yspeed *= -1;
        rotationSpeed *= -1;
    }
    if(zposition > 0 || zposition < -500){
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
    var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
    textMesh = new THREE.Mesh( textGeometry, material);
    scene.add(textMesh);
}
