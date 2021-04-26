var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
var scan;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);


const controls = new THREE.OrbitControls(camera, renderer.domElement);
/*
controls.dampingFactor = 0.25;
controls.screenSpacePanning = true;
controls.minDistance = 40;
controls.maxDistance = 40;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2; // radians
controls.minAzimuthAngle = -Math.PI/2; // radians
controls.maxAzimuthAngle = Math.PI/2 ; // radians
controls.rotateSpeed = 0.7;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;
*/
var loader = new THREE.GLTFLoader();
loader.load("model/scan2.glb", function (gltf) {
    var scale = 1;
    scan = gltf.scene.children[0];
    //const armAxes = new THREE.AxesHelper(10 / scale);
    //scan.rotation.set(Math.PI/2, 0, 0);
    //scan.position.set(0,0,0);
    scan.position.y = 0;
    //arm.add(armAxes);
    scan.scale.set(scale, scale, scale);
    //arm.rotation.set(0, Math.PI / 2, Math.PI / 2);

    //arm.updateMatrix();
    scan.material.color.setHex(0xa8ede5); //#D90B3E //0xfff77d
    //scan.material = new THREE.MeshLambertMaterial( { color: 0xffffff} );
    geometry = scan.geometry;
    material = new THREE.PointsMaterial({ color: 0xa8ede5, size: 0.0045 });
    material.blending = THREE.AdditiveBlending;
    var mesh = new THREE.Points(geometry, material);
    center = mesh.geometry.boundingSphere.center;
    mesh.rotation.set(Math.PI/2, 0, 0);

    var sphere = new THREE.SphereGeometry(mesh.geometry.boundingSphere.radius, 32, 32);
    
    
    sphereMesh = new THREE.Mesh(sphere, new THREE.MeshLambertMaterial( { color: 0xff0000} ));
    sphereMesh.position.set(center);
    console.log(sphereMesh);
    //camera.lookAt(center);
    //center.x -= 0.03;
    //center.y += 0;
    //scanPoints = new THREE.Points(scan.geometry, pointsMaterial)
    //scan.material.color = 0x00ff00;
    scene.add(sphereMesh);
    scene.add(mesh);
    console.log(mesh);
    //scene.children[1].material.blending = THREE.AdditiveBlending;
    //console.log(scan.geometry.attributes.position.array);
});

camera.position.z = 40;

var animate = function () {
    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();