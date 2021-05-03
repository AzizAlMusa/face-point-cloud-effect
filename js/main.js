var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
var scan;
var mesh;
var scan;
var pivot;
var obj;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




const light = new THREE.AmbientLight(0xffffff);

scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xff0000, 40);
directionalLight.castShadows = true;
directionalLight.position.z = 0;
directionalLight.position.y = 0;
directionalLight.position.x = 20;
//scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xf0ea76, 1, 200);
pointLight.position.set(0, -5, 5);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x0000ff, 5, 200);
pointLight2.position.set(-20, 20, 5);
scene.add(pointLight2);

const ball = new THREE.SphereGeometry(1, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: true
});

const ballMesh = new THREE.Mesh(ball, ballMaterial);
//scene.add(ballMesh);



const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.dampingFactor = 0.25;
controls.screenSpacePanning = true;
controls.minDistance = 23;
controls.maxDistance = 23;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2; // radians
//controls.minAzimuthAngle = -Math.PI / 2; // radians
//controls.maxAzimuthAngle = Math.PI / 2; // radians
controls.rotateSpeed = 0.7;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;








///////////////////MODEL/////////////////////////////


var loader = new THREE.GLTFLoader();
loader.load("model/scan2.glb", function (gltf) {
  var scale = 100;
  mesh = gltf.scene.children[0];
  mesh.geometry;

  //mesh.scale.set(scale, scale, scale);
  let material = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.01 });

  scan = new THREE.Points(mesh.geometry, material);
  //material.castShadows = true;
  scan.material.color.setHSL(0.7, 0.5, 0.3);
  scan.material.blending = THREE.AdditiveBlending;
  mesh.position.y -= 20;

  //scene.add(scan);
  var box = new THREE.Box3().setFromObject(scan);
  box.center(scan.position); // this re-sets the mesh position
  scan.position.multiplyScalar(-1);

  pivot = new THREE.Group();
  scene.add(pivot);
  pivot.add(scan);
  pivot.rotation.x = Math.PI / 2;
  pivot.position.y -= 15;
  //pivot.position.x = 25;
    console.log(scan);
});

camera.position.z = 23;
//camera.position.x += 15;


onmousemove = function(e){
mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
raycaster.setFromCamera( mouse.clone(), camera ); 
const intersections = raycaster.intersectObject( scan );
console.log(intersections); 
intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null; 

}



var animate = function () {
  requestAnimationFrame(animate);
  ballMesh.position.x = pointLight.position.x;
  ballMesh.position.y = pointLight.position.y;
  ballMesh.position.z = pointLight.position.z;
  //pivot.rotation.z += 0.002;
  //mesh.rotation.x += 0.01;
  //mesh.rotation.z += 0.01;
  //scan.rotation.z += 0.001;
  renderer.render(scene, camera);
};

animate();
