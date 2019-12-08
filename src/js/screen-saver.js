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


var geometry = new THREE.BoxGeometry(1, 1, 1);

var material = new THREE.MeshLambertMaterial({color:0xFFCC00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
var xspeed = THREE.Math.randFloat(-0.5 , 0.5);
var yspeed = THREE.Math.randFloat(-0.5 , 0.5);
var zspeed = THREE.Math.randFloat(-0.5 , 0.5);

function animate() {
    requestAnimationFrame(animate);
    cube.position.x += xspeed;
    cube.position.y += yspeed;
    cube.position.z += zspeed;
    if(cube.position.x > 10 || cube.position.x < 0){
        xspeed *= -1;
    }
    if(cube.position.y > 10|| cube.position.y < 0){
        yspeed *= -1;
    }
    if(cube.position.z > 10 || cube.position.z < 0){
        zspeed *= -1;
    }
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();
