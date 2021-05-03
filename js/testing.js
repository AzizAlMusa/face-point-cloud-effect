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

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.castShadows = true;
directionalLight.position.z =1;
directionalLight.position.y = 1;
directionalLight.position.x = 1;
scene.add(directionalLight);


const controls = new THREE.OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.PointsMaterial( {color: 0x00ff00, size: 0.2} );
const cube = new THREE.Points( geometry, material );
scene.add( cube );

console.log(cube.geometry.attributes.position.array);

///////////////////MODEL/////////////////////////////



camera.position.z = 5;
//camera.position.x += 15;

/*
onmousemove = function(e){
mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
raycaster.setFromCamera( mouse.clone(), camera ); 
const intersections = raycaster.intersectObject( scan );
console.log(intersections); 
intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null; 

}
*/

/*
function floatPoints(object){
    object.geometry.attribute
}
*/

var animate = function () {
  requestAnimationFrame(animate);

  //pivot.rotation.z += 0.002;
  //mesh.rotation.x += 0.01;
  //mesh.rotation.z += 0.01;
  //scan.rotation.z += 0.001;
  renderer.render(scene, camera);
};

animate();
