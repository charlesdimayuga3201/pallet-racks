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

  $("#infoModal").css("display", "block");
  // $("#infoModal").css("display", "flex");

  $(document).on("click", ".close", function () {
    $("#infoModal").css("display", "none");
  });
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
    // Assign onclick and onmouseover for each button using jQuery
    // $(".test")
    //   .off("click mouseover mouseout") // Remove previous event handlers to prevent duplication
    //   .on("click", function () {
    //     displayBoxInfo(name);
    //   })
    //   .on("mouseover", function () {
    //     const box = scene.getObjectByName(name);
    //     console.log(box);

    //     console.log(name);

    //     scene.traverse((obj) => {
    //       if (obj.name === name) {
    //         console.log(obj);
    //         // obj.material.opacity = 0.2;
    //       }
    //     });

    //     console.log("Object: " + name, "Color: " + color);
    //     box.material.color.set(color);
    //   })
    //   .on("mouseout", function () {
    //     const box = scene.getObjectByName(name);
    //     box.material.color.set("black");
    //   });

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

var btn1 = document.getElementById("myBtn1");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");

var boxes = document.querySelectorAll(".pallet_content > div");

var span = document.getElementsByClassName("close-second")[0];

function displayBoxInfo(classname) {
  var boxContent = document.querySelector(`.${classname}`);
  if (boxContent) {
    // Hide all box contents
    var allBoxContents = document.querySelectorAll(".pallet_content > div");
    allBoxContents.forEach(function (box) {
      box.style.display = "none";
    });

    // Show the selected box content
    boxContent.style.display = "block";

    // Display the modal
    modal.style.display = "block";
  }
}
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let dataFetched = false; // Flag to check if data has been fetched
  let isContentVisible = false; // Flag to toggle content visibility

  document.getElementById("myBtn4").addEventListener("click", () => {
    const palletDiv = document.getElementById("pallet_content");

    // Toggle visibility if data has already been fetched
    if (dataFetched) {
      isContentVisible = !isContentVisible;
      palletDiv.style.display = isContentVisible ? "block" : "block";
      return;
    }

    // Fetch data from the server
    fetch("/data1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Ensure the content container is empty and show it
        palletDiv.innerHTML = "";
        palletDiv.style.display = "block";
        isContentVisible = true;

        // Loop through the retrieved data and create elements
        data.forEach((item) => {
          const content = document.createElement("div");
          content.innerHTML = `<h2>Pallet Details</h2>
          <p>LocationCode: ${item.LocationCode}</p>
          <p>Warehouse: ${item.WarehouseCode}</p>
          <p>PlantCode: ${item.PlantCode}</p>
          <p>Storage Type: ${item.StorageType}</p>
          <p>CurrentPalletCount: ${item.CurrentPalletCount}</p>
          <p>MaxPalletCount: ${item.MaxPalletCount}</p>
     `;

          palletDiv.appendChild(content);
        });

        // Update the flags
        dataFetched = true;
        console.log("Data fetched and displayed");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

$(function () {
  fetch("data.xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      parseXml(xml);
    })
    .catch((error) => console.error("Error fetching the XML:", error));
});

let boxDataFromXML = {};
function parseXml(xml) {
  $(".pallet_content").empty();
  console.log(xml);
  $(xml)
    .find("box")
    .each(function () {
      var classname = $(this).attr("class");
      var warehouse = $(this).find("warehouse").text();
      var storageType = $(this).find("storageType").text();
      var palletContent = $(this).find("palletContent").text();
      var palletStatus = $(this).find("palletStatus").text();
      boxDataFromXML[classname] = palletStatus;
      $(".pallet_content").append(`
          <div class="${classname}" style="display: none;">
              <p>Warehouse: ${warehouse}</p>
              <p>Storage Type: ${storageType}</p>
              <p>Pallet Content: ${palletContent}</p>
              <p>Pallet Status: ${palletStatus}</p>
          </div>
      `);

      // updateBoxColorInThreeJS(classname, palletStatus);
    });
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
