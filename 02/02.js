let loaderAnim = document.getElementById("js-loader");

import * as THREE from "/lib/three.module.js";
import { VRButton } from "/lib/VRButton.js";
import { CSS3DRenderer, CSS3DObject } from "/lib/CSS3DRenderer.js";
import { TransformControls } from "/lib/TransformControls.js";

let polyfill = new WebXRPolyfill();

let isUserInteracting = false,
  lon = 0,
  lat = 0,
  phi = 0,
  theta = 0,
  distance = 50,
  onPointerDownPointerX = 0,
  onPointerDownPointerY = 0,
  onPointerDownLon = 0,
  onPointerDownLat = 0;

let camera, scene, renderer, renderer3d, scene2, control, orbit;
//
let soundStatus = true;
let contenerImgAsset;
let video = document.getElementById("video");
let playContenerButton;
let SceneObjects = [];
let dragging = false;
let object;
//

if (video.readyState === 4) {
  console.log("------- video loaded --------");
  init();
  animate();
}

function init() {
  let container = document.getElementById("container");

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );

  //

  camera.target = new THREE.Vector3(0, 0, 0);
  camera.layers.enable(1); // render left view when no stereo available

  // video

  //  video.play();

  var texture = new THREE.Texture(video);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.format = THREE.RGBFormat;

  setInterval(function () {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      texture.needsUpdate = true;
    }
  }, 1000 / 24);

  scene = new THREE.Scene();
  //
  scene.background = new THREE.Color(0x101010);
  ///
  scene2 = new THREE.Scene();

  // left

  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  var material = new THREE.MeshBasicMaterial({ map: texture });

  var mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // right

  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  var material = new THREE.MeshBasicMaterial({ map: texture });

  var mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType("local");
  container.appendChild(renderer.domElement);

  //

  renderer3d = new CSS3DRenderer();
  renderer3d.setSize(window.innerWidth, window.innerHeight);
  renderer3d.domElement.style.position = "absolute";
  renderer3d.domElement.style.top = 0;
  document.body.appendChild(renderer3d.domElement);

  //

  window.addEventListener("resize", onWindowResize, false);

  //

  document.addEventListener("pointerdown", onPointerDown, false);
  document.addEventListener("pointermove", onPointerMove, false);
  document.addEventListener("pointerup", onPointerUp, false);

  // VR BUTTON
  let vrContenerButton = document.createElement("DIV");
  vrContenerButton.className = "bottomBarButton";

  let assetsBar = document.getElementById("assets-store");
  let CustomVRButton = VRButton.createButton(renderer);
  CustomVRButton.removeAttribute("style");
  CustomVRButton.remove("hover");

  //

  // Play Button
  playContenerButton = document.createElement("DIV");
  playContenerButton.className = "bottomBarButtonAudio";

  let contenerImgAssetA = document.createElement("A");
  contenerImgAsset = document.createElement("IMG");

  contenerImgAsset.addEventListener("click", muteOrUmuteVideoButton, false);

  contenerImgAsset.src = "/assets/Son Off.svg";
  contenerImgAsset.style.marginTop = "4px";
  contenerImgAsset.style.width = "30px";
  contenerImgAsset.id = "soundPicto";
  contenerImgAsset.style.verticalAlign = "middle";
  contenerImgAsset.style.position = "relative";

  contenerImgAssetA.appendChild(contenerImgAsset);
  playContenerButton.appendChild(contenerImgAssetA);

  //

  CustomVRButton.style.background = "white";
  CustomVRButton.style.border = "0px solid black";
  CustomVRButton.style.color = "black";
  CustomVRButton.style.borderRadius = "0px";
  CustomVRButton.style.fontFamily = "Josefin Sans";
  CustomVRButton.style.textTransform = "lowercase";
  CustomVRButton.style.fontSize = "18px";
  CustomVRButton.style.paddingLeft = "50px";
  CustomVRButton.style.verticalAlign = "middle";
  CustomVRButton.style.backgroundImage = "url('/assets/vr_headset.svg')";
  CustomVRButton.style.backgroundRepeat = "no-repeat";
  CustomVRButton.style.backgroundPosition = "left";
  CustomVRButton.style.backgroundSize = "40px 40px";

  //

  let contenerDIV = document.createElement("DIV");
  contenerDIV.style.position = "relative";

  //

  //vrContenerButton.appendChild(contenerA);
  vrContenerButton.appendChild(CustomVRButton);

  //

  contenerDIV.appendChild(vrContenerButton);
  contenerDIV.appendChild(playContenerButton);
  assetsBar.appendChild(contenerDIV);

  //

  document.addEventListener("keydown", onKeyDown, false); // switch between orthographic and perspective camera

  //

  document.body.appendChild(assetsBar);

  let VRbutton = document.getElementById("VRButton");

  VRbutton.addEventListener(
    "click",
    function () {
      playVideo();
    },
    false
  );

  //

  control = new TransformControls(camera, renderer3d.domElement);
  control.addEventListener("change", render);
  control.addEventListener("dragging-changed", function (event) {
    //
    dragging = !dragging;
    console.log(object);
    //
  });

  // google street view button

  // --------- button 1

  let streetButton = document.createElement("A");
  streetButton.className = "d3DButton";
  streetButton.href = "/03/03.html";

  //

  let arrowA = document.createElement("A");
  arrowA.className = "arrowA";
  arrowA.text = "⬆︎";

  //

  let textContenerButton = document.createElement("A");
  //textContenerButton.text = "Go there";

  streetButton.appendChild(arrowA);
  streetButton.appendChild(textContenerButton);

  //SceneObjects.push(object);

  object = new CSS3DObject(streetButton);
  object.position.copy(
    new THREE.Vector3(-724.4980591504489, -357.2333347752208, 90.11786316322787)
  );
  object.rotation.copy(new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0));

  //

  scene2.add(object);

  // --------- button 2

  let streetButton2 = document.createElement("A");
  streetButton2.className = "d3DButton";
  streetButton2.href = "/01/01.html";

  //

  let arrowA2 = document.createElement("A");
  arrowA2.className = "arrowA";
  arrowA2.text = "⬆︎";

  //

  let textContenerButton2 = document.createElement("A");
  //textContenerButton.text = "Go there";

  streetButton2.appendChild(arrowA2);
  streetButton2.appendChild(textContenerButton2);

  //SceneObjects.push(object);

  object = new CSS3DObject(streetButton2);
  object.position.copy(
    new THREE.Vector3(728.4378291100154, -357.2333347752208, -67.26231535011618)
  );
  object.rotation.copy(new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0));

  //

  scene2.add(object);

  //

  control.attach(object);
  scene.add(control);

  //

  video.play();
  console.log("ending");
  loaderAnim.remove();
}

function muteOrUmuteVideoButton(e) {
  e.preventDefault();

  console.log("function muteOrUmuteVideoButton");

  //

  let item = e.target;

  //
  if (soundStatus === true) {
    item.src = "/assets/Son On.svg";
    video.muted = false;
    soundStatus = false;
    playContenerButton.className = "bottomBarButtonAudioOn";
  } else if (soundStatus === false) {
    item.src = "/assets/Son Off.svg";
    video.muted = true;
    soundStatus = true;
    playContenerButton.className = "bottomBarButtonAudio ";
  }
}

function playVideo() {
  video.play();
  let item = document.getElementById("soundPicto");
  item.src = "/assets/Son Off.svg";
  video.muted = false;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer3d.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
  camera.position.y = distance * Math.cos(phi);
  camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(camera.target);
  renderer.render(scene, camera);
  renderer3d.render(scene2, camera);
}

function onPointerDown(event) {
  if (dragging === false) {
    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;
  }
}

function onPointerMove(event) {
  if (dragging === false) {
    if (isUserInteracting === true) {
      lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
      lat = (onPointerDownPointerY - event.clientY) * 0.1 + onPointerDownLat;
    }
  }
}

function onPointerUp() {
  if (dragging === false) {
    isUserInteracting = false;
  }
}
function onKeyDown(event) {
  switch (event.keyCode) {
    case 81: // Q
      control.setSpace(control.space === "local" ? "world" : "local");
      break;
    case 16: // Shift
      control.setTranslationSnap(100);
      control.setRotationSnap(THREE.MathUtils.degToRad(15));
      control.setScaleSnap(0.25);
      break;
    case 87: // W
      control.setMode("translate");
      break;
    case 69: // E
      control.setMode("rotate");
      break;
    case 82: // R
      control.setMode("scale");
      break;
    case 67: // C
      const position = currentCamera.position.clone();
      currentCamera = currentCamera.isPerspectiveCamera
        ? cameraOrtho
        : cameraPersp;
      currentCamera.position.copy(position);
      orbit.object = currentCamera;
      control.camera = currentCamera;
      currentCamera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
      onWindowResize();
      break;
    case 86: // V
      const randomFoV = Math.random() + 0.1;
      const randomZoom = Math.random() + 0.1;
      cameraPersp.fov = randomFoV * 160;
      cameraOrtho.bottom = -randomFoV * 500;
      cameraOrtho.top = randomFoV * 500;
      cameraPersp.zoom = randomZoom * 5;
      cameraOrtho.zoom = randomZoom * 5;
      onWindowResize();
      break;
    case 187:
    case 107: // +, =, num+
      control.setSize(control.size + 0.1);
      break;
    case 189:
    case 109: // -, _, num-
      control.setSize(Math.max(control.size - 0.1, 0.1));
      break;
    case 88: // X
      control.showX = !control.showX;
      break;
    case 89: // Y
      control.showY = !control.showY;
      break;
    case 90: // Z
      control.showZ = !control.showZ;
      break;
    case 32: // Spacebar
      control.enabled = !control.enabled;
      break;
  }
}
