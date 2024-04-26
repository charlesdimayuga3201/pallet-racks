import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AmbientLight, DirectionalLight, HemisphereLight } from "three";
// const width = canvas.innerWidth,
//   height = canvas.innerHeight;
const width = window.innerWidth,
  height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera(10, width / height, 0.01, 1000);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
// document.body.appendChild(renderer.domElement);
document.getElementById("webgl-container").appendChild(renderer.domElement);
// var canvas = document
//   .getElementById("webgl-container")
//   .appendChild(renderer.domElement);
const loader = new GLTFLoader();

animation;
loader.load(
  // resource URL
  "assets/bmetrack.glb",
  // called when the resource is loaded
  function (gltf) {
    // const root = gltf.scene;
    // const shelf = root.getObjectByName('Shelf_Supports_12');
    // scene.add(shelf)
    scene.add(gltf.scene);
    console.log(gltf.scene);

    // gltf.animations; // Array<THREE.AnimationClip>
    // gltf.scene; // THREE.Group
    // gltf.scenes; // Array<THREE.Group>
    // gltf.cameras; // Array<THREE.Camera>
    // gltf.asset; // Object

    // parseXml(xml);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log(error);
  }
);

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 3;
// camera.rotation.y = -4;
const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 100, 100);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener("click", onClick);

// Add a function to handle window resize events
// function onWindowResize() {
//   camera.aspect = canvas.innerWidth / canvas.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(canvas.innerWidth, canvas.innerHeight);
// }

// // Listen for window resize events
// window.addEventListener("resize", onWindowResize);

// // Call the onWindowResize function once to set up the initial sizes
// onWindowResize();
function onClick(event) {
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  const validBoxPrefix = "Box";
  const filteredIntersects = intersects.filter((intersect) =>
    intersect.object.name.startsWith(validBoxPrefix)
  );

  console.log("LOG: " + intersects.map((intersect) => intersect.object.name));
  console.log("Intersects: ", intersects);
  if (filteredIntersects.length > 0) {
    const object = filteredIntersects[0].object;
    // object.material.opacity = 0.5;
    showModal(object.name);
    console.log("OBJ NAME: ", object.name);
  }
}
const { ambientLight, mainLight } = createLights();
function createLights() {
  const ambientLight = new AmbientLight("white", 1);

  const mainLight = new DirectionalLight("white", 1);
  mainLight.position.set(12, 18, 19);

  return { ambientLight, mainLight };
}

function showModal(name) {
  // $("#modalText").text("Modal should be shown now, name: " + name);
  updateHTMLSquaresForBox(name);
  FilteredPalletData(name);
}

function animation() {
  scene.add(ambientLight, mainLight);

  controls.update();

  renderer.render(scene, camera);
}
function updateHTMLSquaresForBox(boxName) {
  // Extract the base box name
  var baseBoxName = boxName.split("_")[0];
  // Initialize the boxesToHandle array
  var boxesToHandle = [];

  // Dynamically generate boxesToHandle with the base box and two numbered boxes
  for (let i = 0; i < 3; i++) {
    boxesToHandle.push(i === 0 ? baseBoxName : `${baseBoxName}_${i}`);
  }
  // Update modal text using jQuery
  $("#modalText").text(
    "Modal should be shown now, name: " + boxesToHandle.join(", ")
  );

  // Dynamically set colors based on box status
  boxesToHandle.forEach((name, index) => {
    let status = boxDataFromXML[name]; // Assuming you have a way to get the box's status
    let color = statusToColor(status); // Convert status to color
    console.log("Status Color: " + color);
    $(`#myBtn${index + 1}`).off("mouseenter mouseleave click");
    $(`#myBtn${index + 1}`)
      .on("mouseenter", (event) => {
        const box = scene.getObjectByName(name);
        // displayBoxInfo(name);
        box.material.color.set(color);
        scene.traverse((obj) => {
          if (obj.name.startsWith("Box") && obj.name !== name) {
            console.log("Test: ", obj.name);
            obj.material.transparent = true;
            obj.material.opacity = 0.2;
            obj.material.needsUpdate = true;
            // obj.material.opacity = 0.1;
            // obj.material.opacity = 0.2;
          }

          // console.log(obj.name, name);
        });
      })
      .on("click", (event) => {
        displayBoxInfo(name);
        const box = scene.getObjectByName(name);
        // displayBoxInfo(name);
        box.material.color.set(color);
      })
      .on("mouseleave", (event) => {
        const box = scene.getObjectByName(name);
        box.material.color.set("black");
        scene.traverse((obj) => {
          if (obj.name.startsWith("Box")) {
            obj.material.transparent = false;
            obj.material.opacity = 1;
            obj.material.needsUpdate = true;
            // obj.material.opacity = 0.1;
            // obj.material.opacity = 0.2;
          }
        });
      });

    console.log(
      "Status: " + status,
      "Color:" + color,
      "boxDatafromXML:" + boxDataFromXML[name]
    );

    // Update square color using jQuery

    $(`#myBtn${index + 1}`).css("background-color", color);
    $(`#myBtn${index + 1}`).css("border-color", "#343434");
    $(`.square_p${index + 1}`).css("background-color", color);
  });
}
// Example implementation of statusToColor, adjust as per your requirements
function statusToColor(status) {
  switch (status) {
    case "Full":
      return "green";
    case "Overload":
      return "red";
    case "Empty":
      return "white";
    // Add more cases as necessary
    default:
      return "gray"; // A default case for unexpected statuses
  }
}

var modal = document.getElementById("infoModal");

// Get the button that opens the modal

var span = document.getElementsByClassName("close-second")[0];

function displayBoxInfo(classname) {
  var boxContent = document.querySelector(`.${classname}`);
  if (boxContent) {
    // Hide all box contents
    var allBoxContents = document.querySelectorAll("#boxAccordion > div ");
    allBoxContents.forEach(function (box) {
      box.style.display = "none";
    });

    // Show the selected box content
    boxContent.style.display = "block";

    // Display the modal
    modal.style.display = "block";
  }
}

let xmlData = null; // global variable to store XML data
let boxDataFromXML = {};
let boxesToHandle = [];
$(function () {
  fetch("data.xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      xmlData = parser.parseFromString(data, "application/xml");
      parseXml(xmlData, boxesToHandle);
    })
    .catch((error) => console.error("Error fetching the XML:", error));
});

function parseXml(xml, boxesToHandle = []) {
  $("#boxAccordion").empty(); // Clear existing accordion items
  $(xml)
    .find("box")
    .each(function (boxIndex) {
      var classname = $(this).attr("class");
      var palletStatus = $(this).find("palletStatus").text();
      boxDataFromXML[classname] = palletStatus;

      // Check if classname exists in boxesToHandle array
      if (!boxesToHandle.length || boxesToHandle.includes(classname)) {
        // Create accordion item for the box
        var accordionItem = $(`
          <div class="accordion-item border">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse${boxIndex}"
                aria-expanded="false"
                aria-controls="collapse${boxIndex}">
                Box: ${classname}
              </button>
            </h2>
            <div
              id="collapse${boxIndex}"
              class="accordion-collapse collapse"
              data-bs-parent="#boxAccordion">
              <div class="accordion-body">
                <div id="accordionParent${boxIndex}" class="accordion-style">
                </div>
              </div>
            </div>
          </div>
        `);

        // Append accordion item to the accordion container
        $("#boxAccordion").append(accordionItem);

        // Iterate over child elements of the box to create nested accordions
        $(this)
          .find("warehouse")
          .each(function (warehouseIndex) {
            var warehouse = $(this).text();
            var storageType = $(this).next("storageType").text();
            var palletContent = $(this)
              .next("storageType")
              .next("palletContent")
              .text();
            var palletStatus = $(this)
              .next("storageType")
              .next("palletContent")
              .next("palletStatus")
              .text();

            // Create nested accordion for warehouse data
            var nestedAccordion = $(`
            <div class="accordion accordion-flush pb-2">
              <div class="card">
                <div class="card-header  id="headingOne"">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link collapsed"
                   
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseNested${boxIndex}_${warehouseIndex}"
                      aria-expanded="false"
                      aria-controls="collapseNested${boxIndex}_${warehouseIndex}">
                      Warehouse: ${warehouse}
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseNested${boxIndex}_${warehouseIndex}"
                  aria-labelledby="headingOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionParent${boxIndex}">
                  <div class="card-body position-relative">
                    <p>Storage Type: ${storageType}</p>
                    <p>Pallet Content: ${palletContent}</p>
                    <p>Pallet Status: ${palletStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          `);

            // Append nested accordion to the accordion parent
            accordionItem
              .find(`#accordionParent${boxIndex}`)
              .append(nestedAccordion);
          });
      }
    });
}

// When filtering:
function FilteredPalletData(boxName) {
  var baseBoxName = boxName.split("_")[0];
  boxesToHandle = [];
  for (let i = 0; i < 3; i++) {
    boxesToHandle.push(i === 0 ? baseBoxName : `${baseBoxName}_${i}`);
  }
  if (xmlData) {
    parseXml(xmlData, boxesToHandle);
    $("#boxAccordion").css("display", "block");
    $("#boxAccordion").show();
  } else {
    console.error("XML data not loaded");
  }
}
let hoveredObj = null;
let boxesInRow = [];
const originalColors = {};
function onMouseMove(event) {
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  const validBoxPrefix = "Box";
  const filteredIntersects = intersects.filter((intersect) =>
    intersect.object.name.startsWith(validBoxPrefix)
  );

  // Check if previously hovered object is not in the current hover
  if (
    hoveredObj &&
    (!filteredIntersects.length || filteredIntersects[0].object !== hoveredObj)
  ) {
    // Reset all boxes in the row to their original color
    scene.traverse((obj) => {
      if (obj.name.startsWith("Box") && obj.name.startsWith("Box")) {
        obj.material.color.set(originalColors[obj.name]);
        obj.material.transparent = false;
        obj.material.opacity = 1;
        obj.material.needsUpdate = true;
      }
    });
    hoveredObj = null;
    boxesInRow = [];
  }

  if (filteredIntersects.length > 0) {
    const intersected = filteredIntersects[0].object;

    // Detect if the hovered object has changed
    if (hoveredObj !== intersected) {
      hoveredObj = intersected;

      boxesInRow = [];
      var intersectedRow = intersected.name.split("_")[0];

      // Apply new hover effects
      scene.traverse((obj) => {
        if (obj.name.startsWith(intersectedRow)) {
          if (!originalColors[obj.name]) {
            originalColors[obj.name] = obj.material.color.clone();
          }

          obj.material.color.set(statusToColor(boxDataFromXML[obj.name]));
          boxesInRow.push(obj);
        } else if (obj.name.startsWith("Box")) {
          obj.material.transparent = true;
          obj.material.opacity = 0.2;
          obj.material.needsUpdate = true;
        }
      });
    }
  }
}

renderer.domElement.addEventListener("mousemove", onMouseMove);
