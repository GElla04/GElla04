import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container1 = document.getElementById('container1');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(container1.offsetWidth, container1.offsetHeight);
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

container1.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(10, 14, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();


const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 35, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const spotLightFront = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLightFront.position.set(0, 15, -35);
spotLightFront.castShadow = true;
spotLightFront.shadow.bias = -0.0001;
scene.add(spotLightFront);

const spotLightBack = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLightBack.position.set(0, 15, 35);
spotLightBack.castShadow = true;
spotLightBack.shadow.bias = -0.0001;
scene.add(spotLightBack);

const spotLightLeft = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLightLeft.position.set(-35, 15, 0);
spotLightLeft.castShadow = true;
spotLightLeft.shadow.bias = -0.0001;
scene.add(spotLightLeft);

const spotLightRight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLightRight.position.set(35, 15, 0);
spotLightRight.castShadow = true;
spotLightRight.shadow.bias = -0.0001;
scene.add(spotLightRight);

const loader = new GLTFLoader().setPath('public/watch/');
loader.load('watch.glb', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 1, 1);
  scene.add(mesh);
  mesh.scale.set(28, 28, 28);
  mesh.rotation.set(Math.PI / 4, 0, 0);

  document.getElementById('progress-container1').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = container1.offsetWidth / container1.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container1.offsetWidth, container1.offsetHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

document.addEventListener('DOMContentLoaded', init);

