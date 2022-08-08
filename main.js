let loaderAnim = document.getElementById("js-loader");

import * as THREE from "/lib/three.module.js";
import { VRButton } from "/lib/VRButton.js";
import { CSS3DRenderer, CSS3DObject } from "/lib/CSS3DRenderer.js";
import { TransformControls } from "/lib/TransformControls.js";
import { GLTFLoader } from "/lib/GLTFLoader.js";

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
let playContenerButton;
let SceneObjects = [];
let dragging = false;
let object;
let pickHelper;
let time = 0;

let selectTimer = 0;
let selectDuration = 2;
let lastTime = 0;

//

let video = document.getElementById("video");
let video1 = document.getElementById("video1");
let video2 = document.getElementById("video2");
let video3 = document.getElementById("video3");
let video4 = document.getElementById("video4");

//
let lastvideo, currentVideo;
let sceneVideo1,
  sceneVideo2,
  sceneVideo3,
  sceneVideo4,
  sceneVideo5,
  sceneVideo6,
  sceneVideo7;

let camera1, camera2, camera3, camera4, camera5, camera6, camera7;

let texture;
let textureVideo1,
  textureVideo2,
  textureVideo3,
  textureVideo4,
  textureVideo5,
  textureVideo6,
  textureVideo7,
  textureVideo8;
let globe;
let currentScene;
let lastScene;
let currentCamera;
let mesh4, mesh5, mesh6, mesh7, mesh8, mesh9, mesh10;
//

let raycaster, arrow, x, y;
//
/* 
if (video.readyState === 4) {
  console.log("------- video loaded --------");
  init();
} */

function init() {
  let container = document.getElementById("container");

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );

  camera.target = new THREE.Vector3(0, 0, 0);

  // video
  currentVideo = video;

  texture = new THREE.Texture(video);

  textureVideo1 = new THREE.Texture(video1);

  scene = new THREE.Scene();
  currentScene = scene;
  scene2 = new THREE.Scene();
  scene.background = new THREE.Color(0x101010);

  currentCamera = camera;

  //
  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  var material = new THREE.MeshBasicMaterial({ map: texture });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.name = "globe";
  globe = mesh;

  //
  //globe.material.map = textureVideo1;

  //light
  let ambientLight = new THREE.AmbientLight(0x404040); // gray20 = 20% of white vs black 80%
  scene.add(ambientLight);

  let directionalLight = new THREE.DirectionalLight(0xffffff); // gray40 = 40% of white vs black 60%
  directionalLight.position.set(1, 0.75, 0.5).normalize();

  scene.add(directionalLight);
  //
  scene.add(mesh);

  // >>>>>>>>>>>> Button 1
  let meshGeo = new THREE.SphereBufferGeometry(50, 50, 10);

  let meshMaterial = new THREE.MeshBasicMaterial({
    color: 0x03fbb3,
    opacity: 1,
    transparent: false
  });

  let meshLamberMaterial = new THREE.MeshLambertMaterial({
    color: 0x03fbb3,
    opacity: 1,
    transparent: false
  });

  let mesh3 = new THREE.Mesh(meshGeo, meshMaterial);
  mesh3.castShadow = true; //default is false
  mesh3.receiveShadow = true; //default

  //

  mesh3.position.x = 434.9987993494534;
  mesh3.position.y = -124.66670191085254;
  mesh3.position.z = -81.74174030713785;

  //

  mesh3.name = "sceneVideo1";
  SceneObjects.push(mesh3);
  scene.add(mesh3);

  /*   control.attach(mesh3);
  scene.add(control); */
  // ----------------------------------------------------------------------------
  //-------------------- scene video 1 --------------------
  //-------------------- scene video 1 --------------------

  camera1 = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera1.target = new THREE.Vector3(0, 0, 0);

  sceneVideo1 = new THREE.Scene();

  sceneVideo1.background = new THREE.Color(0x101010);

  //
  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  var material = new THREE.MeshBasicMaterial({ map: textureVideo1 });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.name = "globe";
  globe = mesh;

  sceneVideo1.add(ambientLight);

  sceneVideo1.add(directionalLight);
  //
  sceneVideo1.add(mesh);
  sceneVideo1.add(camera1);
  currentCamera = camera1;

  // Button 1  sceneVideo1 - GO porte entrée
  // >>>>>>>>>>>> Button 1
  let meshGeo4 = new THREE.SphereBufferGeometry(50, 50, 10);

  let meshMaterial4 = new THREE.MeshBasicMaterial({
    color: 0x03fbb3,
    opacity: 1,
    transparent: false
  });

  let meshLamberMaterial4 = new THREE.MeshLambertMaterial({
    color: 0x03fbb3,
    opacity: 1,
    transparent: false
  });

  mesh4 = new THREE.Mesh(meshGeo4, meshMaterial4);
  mesh4.castShadow = true; //default is false
  mesh4.receiveShadow = true; //default

  //

  mesh4.position.x = 434.9987993494534;
  mesh4.position.y = -124.66670191085254;
  mesh4.position.z = 193.91352244309263;

  //

  mesh4.name = "scene";
  SceneObjects.push(mesh4);
  sceneVideo1.add(mesh4);

  // Button 2 sceneVideo1 - GO cuisine

  let meshGeo5 = new THREE.SphereBufferGeometry(50, 50, 10);
  //
  mesh5 = new THREE.Mesh(meshGeo5, meshMaterial4);
  mesh5.castShadow = true; //default is false
  mesh5.receiveShadow = true; //default

  //

  mesh5.position.x = -28.61054917110691;
  mesh5.position.y = -83.24476027852555;
  mesh5.position.z = 430.2702939659548;

  //

  mesh5.name = "sceneVideo1";
  SceneObjects.push(mesh5);
  //sceneVideo1.add(mesh5);

  //
  //currentScene = sceneVideo1;

  //
  // Button 3 sceneVideo1 - GO black blue 1.1

  //let meshGeo = new THREE.SphereBufferGeometry(50, 50, 10);

  //
  mesh6 = new THREE.Mesh(meshGeo5, meshMaterial4);
  mesh6.castShadow = true; //default is false
  mesh6.receiveShadow = true; //default

  //

  mesh6.position.x = -342.7310269647695;
  mesh6.position.y = -191.23726589882386;
  mesh6.position.z = 37.35022715776556;

  //

  mesh6.name = "sceneVideo2";
  SceneObjects.push(mesh6);
  sceneVideo1.add(mesh6);

  //

  // ----------------------------------------------------------------------------
  //-------------------- scene video 2 --------------------
  textureVideo2 = new THREE.Texture(video2);
  sceneVideo2 = new THREE.Scene();

  sceneVideo2.background = new THREE.Color(0x101010);

  //

  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  var material = new THREE.MeshBasicMaterial({ map: textureVideo2 });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.name = "globe";
  globe = mesh;

  sceneVideo2.add(ambientLight);

  sceneVideo2.add(directionalLight);

  //

  sceneVideo2.add(mesh);

  //
  // Button 1 sceneVideo2 - GO black blue 1.2

  //let meshGeo = new THREE.SphereBufferGeometry(50, 50, 10);

  //
  mesh7 = new THREE.Mesh(meshGeo5, meshMaterial4);
  mesh7.castShadow = true; //default is false
  mesh7.receiveShadow = true; //default

  //

  mesh7.position.x = -435.7486173463559;
  mesh7.position.y = -208.80460244491542;
  mesh7.position.z = 44.6298644816747;

  //

  mesh7.name = "sceneVideo3";
  SceneObjects.push(mesh7);
  sceneVideo2.add(mesh7);

  //

  //
  // Button 2 sceneVideo2 - GO vestiaire

  //let meshGeo = new THREE.SphereBufferGeometry(50, 50, 10);

  //
  mesh8 = new THREE.Mesh(meshGeo5, meshMaterial4);
  mesh8.castShadow = true; //default is false
  mesh8.receiveShadow = true; //default

  //

  mesh8.position.x = 453.7974136356938;
  mesh8.position.y = -249.036329233171;
  mesh8.position.z = 17.451859137984655;

  //

  mesh8.name = "sceneVideo1";
  SceneObjects.push(mesh8);
  sceneVideo2.add(mesh8);

  //

  //currentScene = sceneVideo2;
  //currentVideo = video2;
  //

  // ----------------------------------------------------------------------------
  //-------------------- scene video 3 --------------------

  textureVideo3 = new THREE.Texture(video3);
  sceneVideo3 = new THREE.Scene();

  sceneVideo3.background = new THREE.Color(0x101010);

  //

  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  var material = new THREE.MeshBasicMaterial({ map: textureVideo3 });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.name = "globe";
  globe = mesh;

  sceneVideo3.add(ambientLight);

  sceneVideo3.add(directionalLight);

  //

  sceneVideo3.add(mesh);

  //
  // Button 1 sceneVideo3 - GO black blue 1.1

  //let meshGeo = new THREE.SphereBufferGeometry(50, 50, 10);

  //
  mesh8 = new THREE.Mesh(meshGeo5, meshMaterial4);
  mesh8.castShadow = true; //default is false
  mesh8.receiveShadow = true; //default

  //

  mesh8.position.x = -435.7486173463559;
  mesh8.position.y = -208.80460244491542;
  mesh8.position.z = 44.6298644816747;

  //

  mesh8.name = "sceneVideo2";
  SceneObjects.push(mesh8);
  sceneVideo3.add(mesh8);

  //

  //
  // Button 2 sceneVideo3 - GO Atelier 1

  //let meshGeo = new THREE.SphereBufferGeometry(50, 50, 10);

  //
  mesh9 = new THREE.Mesh(meshGeo5, meshMaterial4);
  mesh9.castShadow = true; //default is false
  mesh9.receiveShadow = true; //default

  //

  mesh9.position.x = 453.7974136356938;
  mesh9.position.y = -131.33068409222022;
  mesh9.position.z = -76.15588580504681;

  //

  mesh9.name = "sceneVideo1";
  SceneObjects.push(mesh9);
  sceneVideo3.add(mesh9);

  //

  //currentScene = sceneVideo3;
  //currentVideo = video3;

  //

  //

  setInterval(function () {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      texture.needsUpdate = true;
      textureVideo1.needsUpdate = true;
      textureVideo2.needsUpdate = true;
      textureVideo3.needsUpdate = true;
    }
  }, 1000 / 24);

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

  // google street view button

  // --------- button 1

  let streetButton = document.createElement("A");
  streetButton.className = "d3DButton";
  streetButton.href = "/01/01.html";

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
    new THREE.Vector3(901.1090075962194, -269.071755544908, -153.90012663859025)
  );
  object.rotation.copy(new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0));

  //

  scene2.add(object);

  //

  raycaster = new THREE.Raycaster();

  //
  //
  control.addEventListener("dragging-changed", function (event) {
    //
    dragging = !dragging;
    console.log(mesh3.position);
    //
  });
  //

  //scene.add(camera);

  currentVideo.play();
  loaderAnim.remove();
  console.log("ending");
}

function muteOrUmuteVideoButton(e) {
  e.preventDefault();

  console.log("function muteOrUmuteVideoButton");

  //

  let item = e.target;

  //
  if (soundStatus === true) {
    item.src = "/assets/Son On.svg";
    currentVideo.muted = false;
    soundStatus = false;
    playContenerButton.className = "bottomBarButtonAudioOn";
  } else if (soundStatus === false) {
    item.src = "/assets/Son Off.svg";
    currentVideo.muted = true;
    soundStatus = true;
    playContenerButton.className = "bottomBarButtonAudio ";
  }
}

function playVideo() {
  currentVideo.play();
  let item = document.getElementById("soundPicto");
  item.src = "/assets/Son Off.svg";
  currentVideo.muted = false;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer3d.setSize(window.innerWidth, window.innerHeight);
}

/* renderer.setAnimationLoop(function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (renderer.xr.isPresenting === true) {
    raycaster.set(
      raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld),
      raycaster.ray.direction
        .set(0, 0, -1)
        .transformDirection(camera.matrixWorld)
    );

    const intersections = raycaster.intersectObjects(SceneObjects, true);

    if (intersections.length > 0) {
      console.log(intersections[0].object);
    }
  } else {
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
    camera.position.y = distance * Math.cos(phi);
    camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(camera.target);
  }
  renderer3d.render(scene2, camera);
  renderer.render(scene, camera);
}); */

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

function makeDataTexture(data, width, height) {
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

class LookToSelectHelper {
  // =================================
  //
  // Developpé par : Girard Dane
  // Société : DG3D Consulting
  // Date : 27/10/2020
  //
  // =================================

  constructor(camera) {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;

    const cursorColors = new Uint8Array([64, 64, 64, 64, 255, 255, 255, 255]);
    this.cursorTexture = makeDataTexture(cursorColors, 2, 1);

    const ringRadius = 0.4;
    const tubeRadius = 0.1;
    const tubeSegments = 4;
    const ringSegments = 64;
    const cursorGeometry = new THREE.TorusBufferGeometry(
      ringRadius,
      tubeRadius,
      tubeSegments,
      ringSegments
    );

    const cursorMaterial = new THREE.MeshBasicMaterial({
      color: "yellow",
      map: this.cursorTexture,
      transparent: true
    });
    const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
    camera.add(cursor);
    cursor.position.z = -1;
    const scale = 0.05;
    cursor.scale.set(scale, scale, scale);
    this.cursor = cursor;

    this.selectTimer = 0;
    this.selectDuration = 2;
    this.lastTime = 0;
  }

  // Cette fonction permet de selectionner un objet
  pick(normalizedPosition, scene, camera, time) {
    const elapsedTime = time - this.lastTime;
    this.lastTime = time;

    const lastPickedObject = this.pickedObject;

    if (this.pickedObject) {
      this.pickedObject = undefined;
    }

    // Emission du raycast
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // Recupération de la liste des objets touché par le raycast
    const intersectedObjects = this.raycaster.intersectObjects(SceneObjects);
    if (intersectedObjects.length) {
      // Prends le premier objet (celui le plus proche)

      console.log(intersectedObjects[0].object);
      this.pickedObject = intersectedObjects[0].object;
    }

    // Permet d'avoir le curseur uniquement lorsqu'il est sur un objet
    this.cursor.visible = this.pickedObject ? true : false;
    // La ligne suivante permet de voir le curseur même s'il n'est pas sur un objet
    //this.cursor.visible = true; // Commenter la ligne 148 si vous décommentez la 150

    let selected = false;

    if (this.pickedObject && lastPickedObject === this.pickedObject) {
      this.selectTimer += elapsedTime;
      if (this.selectTimer >= this.selectDuration) {
        this.selectTimer = 0;
        selected = true;
      }
    } else {
      this.selectTimer = 0;
    }

    // Materiel pertmettant de voir l'état du timer
    const fromStart = 0;
    const fromEnd = this.selectDuration;
    const toStart = -0.5;
    const toEnd = 0.5;
    this.cursorTexture.offset.x = THREE.MathUtils.mapLinear(
      this.selectTimer,
      fromStart,
      fromEnd,
      toStart,
      toEnd
    );
    console.log("this.pickedObject");
    console.log(this.pickedObject);
    return selected ? this.pickedObject : undefined;
  }
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
let refreshCamera;

const promise1 = new Promise((resolve, reject) => {
  let checkExist = setInterval(function () {
    if (video.readyState === 4) {
      console.log("------- video loaded --------");
      resolve("Success!");
      clearInterval(checkExist);
    }
  }, 100); // check every 100ms
});

promise1.then((value) => {
  init();

  const lookToSelect = new LookToSelectHelper(currentCamera);
  control = new TransformControls(camera, renderer3d.domElement);

  //

  control.addEventListener("dragging-changed", function (event) {
    //
    dragging = !dragging;
    console.log(mesh9.position);
    //
  });

  //

  currentScene.add(currentCamera);

  /*   control.attach(mesh9);
  currentScene.add(control);
 */
  // expected output: "Success!"
  renderer.setAnimationLoop(function (time) {
    renderer.setSize(window.innerWidth, window.innerHeight);

    //
    //globe.texture = new THREE.Texture(video1);
    //

    if (renderer.xr.isPresenting === true) {
      time *= 0.001;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        currentCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        currentCamera.updateProjectionMatrix();
      }

      let selectedObject = lookToSelect.pick(
        { x: 0, y: 0 },
        currentScene,
        currentCamera,
        time
      );

      if (selectedObject) {
        // les liens vers vos différentes vidéos se feront ici.
        console.log("Objet Selectionné : " + selectedObject.name);
        if (selectedObject.name === "scene") {
          lastScene = currentScene;
          currentScene = scene;

          lastvideo = currentVideo;
          currentVideo = video;
          currentVideo.play();
          currentVideo.muted = false;
          lastvideo.pause();
          lastvideo.muted = true;

          //currentScene.add(control);
          refreshCamera = true;
          //
        } else if (selectedObject.name === "sceneVideo1") {
          lastScene = currentScene;
          currentScene = sceneVideo1;
          lastvideo = currentVideo;
          currentVideo = video1;

          currentCamera = camera1;

          currentVideo.play();
          currentVideo.muted = false;
          lastvideo.pause();
          lastvideo.muted = true;

          //currentScene.add(control);
          refreshCamera = true;
          //
        } else if (selectedObject.name === "sceneVideo2") {
          lastScene = currentScene;
          currentScene = sceneVideo2;
          lastvideo = currentVideo;
          currentVideo = video2;
          currentVideo.play();
          currentVideo.muted = false;
          lastvideo.pause();
          lastvideo.muted = true;

          //currentScene.add(control);
          refreshCamera = true;
        } else if (selectedObject.name === "sceneVideo3") {
          lastScene = currentScene;
          currentScene = sceneVideo3;
          lastvideo = currentVideo;
          currentVideo = video3;
          currentVideo.play();
          currentVideo.muted = false;
          lastvideo.pause();
          lastvideo.muted = true;

          //currentScene.add(control);
          refreshCamera = true;
        }
      }
    } else {
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
      camera.position.y = distance * Math.cos(phi);
      camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(camera.target);
    }

    renderer3d.render(scene2, camera);

    renderer.render(currentScene, camera);
  });

  /*   function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    const selectedObject = lookToSelect.pick(
      { x: 0, y: 0 },
      scene,
      camera,
      time
    );
    if (selectedObject) {
      // les liens vers vos différentes vidéos se feront ici.
      console.log(selectedObject);
    }

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(render); */
});

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
