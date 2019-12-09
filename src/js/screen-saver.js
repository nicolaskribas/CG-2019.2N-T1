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


// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

var font = undefined;
var textMesh;
var text = 'aaa';
loadFont();

// em teste

// em teste
var xspeed = THREE.Math.randFloat(-0.5 , 0.5);
var yspeed = THREE.Math.randFloat(-0.5 , 0.5);
var zspeed = THREE.Math.randFloat(-0.5 , 0.5);

animate();

function animate() {
    requestAnimationFrame(animate);
    // refreshText();
    textMesh.position.x += xspeed;
    textMesh.position.y += yspeed;
    textMesh.position.z += zspeed;
    if(textMesh.position.x > 10 || textMesh.position.x < 0){
        xspeed *= -1;
    }
    if(textMesh.position.y > 10|| textMesh.position.y < 0){
        yspeed *= -1;
    }
    if(textMesh.position.z > 10 || textMesh.position.z < 0){
        zspeed *= -1;
    }
    textMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
};

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
    var textGeometry = new THREE.TextGeometry( text, {
        size: 10,
        height: 5,
        curveSegments: 6,
        font: font
    });
    var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
    textMesh = new THREE.Mesh( textGeometry, material);
    scene.add(textMesh);
}
