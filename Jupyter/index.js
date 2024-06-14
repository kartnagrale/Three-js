import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);
camera.position.z=5;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const jupyterGroup = new THREE.Group();
jupyterGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(jupyterGroup);
new OrbitControls(camera,renderer.domElement);
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1,12);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/jupitermap.jpg")
});
const jupyterMesh=new THREE.Mesh(geometry,material);
scene.add(jupyterMesh);

const stars=getStarfield({numStars: 2000});
scene.add(stars);

// const hemiLight = new THREE.HemisphereLight(0xffffff,0x444444);
// scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2,0.5,1);
scene.add(sunLight);

function animate(){
    requestAnimationFrame(animate);
    // jupyterMesh.rotation.x+=0.001;
    jupyterMesh.rotation.y+=0.002;
    renderer.render(scene,camera);
}
animate();
