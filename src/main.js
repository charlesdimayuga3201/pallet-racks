import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

const width = window.innerWidth,
  height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(10, width / height, 0.01, 1000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
// document.body.appendChild(renderer.domElement);
document.getElementById("webgl-container").appendChild(renderer.domElement);
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

//GLTFLoader

animation;
loader.load(
  // resource URL
  "/bmet4racks.glb",
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
  }
);

//Raycaster
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 3;
// camera.rotation.y = -4;
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 100, 100);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
renderer.domElement.addEventListener("click", onClick);

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

// function updateHTMLSquaresForBox(boxName) {
//   btn1.onclick = function () {
//     displayBoxInfo(boxesToHandle[0]);
//   };
//   btn2.onclick = function () {
//     displayBoxInfo(boxesToHandle[1]);
//   };
//   btn3.onclick = function () {
//     displayBoxInfo(boxesToHandle[2]);
//   };

//   var baseNameParts = boxName.split("_");
//   var baseBoxName = baseNameParts[0];
//   console.log("Parts", baseNameParts);
//   var boxesToHandle = [baseBoxName, `${baseBoxName}_1`, `${baseBoxName}_2`];
//   console.log("Boxes to handle", boxesToHandle);
//   console.log(
//     "Boxes Names",
//     baseBoxName,
//     `${baseBoxName}_1`,
//     `${baseBoxName}_2`
//   );
//   let colorHexes = boxesToHandle.map((name) => getColorHexString(name));
//   $("#modalText").text("Modal should be shown now, name: " + boxesToHandle);

//   // $(".pallet1").text(boxesToHandle[0]);
//   // $(".pallet2").text(boxesToHandle[1]);
//   // $(".pallet3").text(boxesToHandle[2]);
//   console.log("Colors: ", colorHexes.join(", "));

//   colorHexes.forEach((colorHex, index) => {
//     $(`.square_p${index + 1}`).css("background-color", `#${colorHex}`);
//   });
// }

// function getColorHexString(boxName) {
//   const object = scene.getObjectByName(boxName);
//   console.log("BoxName: ", object);

//   if (object) {
//     return object.material.color.getHexString();
//   }
//   return "";
// }

function updateHTMLSquaresForBox(boxName) {
  // Other logic remains the same
  btn1.onclick = function () {
    displayBoxInfo(boxesToHandle[0]);
  };
  btn2.onclick = function () {
    displayBoxInfo(boxesToHandle[1]);
  };
  btn3.onclick = function () {
    displayBoxInfo(boxesToHandle[2]);
  };
  // Use the stored XML data to set button colors
  var baseNameParts = boxName.split("_");
  var baseBoxName = baseNameParts[0];
  var boxesToHandle = [baseBoxName, `${baseBoxName}_1`, `${baseBoxName}_2`];
  $("#modalText").text("Modal should be shown now, name: " + boxesToHandle);
  boxesToHandle.forEach((name, index) => {
    // Assuming you have a function to map status to color
    let status = boxDataFromXML[name];
    let color = statusToColor(status); // You need to define statusToColor based on your color logic
    $(`.square_p${index + 1}`).css("background-color", color);
  });
}

// Example statusToColor function (you need to implement this based on your requirements)
function statusToColor(status) {
  switch (status) {
    case "Full":
      return "green"; // Green
    case "Overload":
      return "red"; // Blue
    // Add other cases as needed
    case "Empty":
      return "white"; // White
  }
}

function animation() {
  scene.add(ambientLight, mainLight);
  controls.update();
  renderer.render(scene, camera);
}

// Get the button that opens the modal
var modal = document.getElementById("myModal");
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

// function updateBoxColorInThreeJS(classname, palletStatus) {
//   const boxObject = scene.getObjectByName(classname);

//   if (boxObject) {
//     switch (palletStatus) {
//       case "Empty":
//         boxObject.material.color.set("white");
//         boxObject.material.opacity = 0.5;
//         break;

//       case "Partial":
//         boxObject.material.color.set("blue");
//         break;

//       case "Full":
//         boxObject.material.color.set("green");
//         break;

//       case "Overload":
//         boxObject.material.color.set("red");
//         break;

//       default:
//         break;
//     }
//   }
// }

// SINGLE HOVER
// let hoveredObj = null;
// let originalColor = new THREE.Color();
// function onMouseMove(event) {
//   mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
//   mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(scene.children, true);
//   const validBoxPrefix = "Box";
//   const filteredIntersects = intersects.filter((intersect) =>
//     intersect.object.name.startsWith(validBoxPrefix)
//   );

//   if (
//     hoveredObj &&
//     (!filteredIntersects.length || hoveredObj !== filteredIntersects[0].object)
//   ) {
//     // Restore original color if not hovering over the same object
//     hoveredObj.material.color.copy(originalColor);
//     hoveredObj = null;
//   }

//   if (filteredIntersects.length > 0) {
//     const intersected = filteredIntersects[0].object;

//     if (hoveredObj !== intersected) {
//       hoveredObj = intersected;
//       originalColor.copy(intersected.material.color);
//       // showModal(intersected.name);
//       // Change color based on pallet status

//       // Assuming you have a function to map status to color
//       const palletStatus = boxDataFromXML[hoveredObj.name];
//       const color = statusToColor(palletStatus); // Assuming statusToColor function is defined
//       hoveredObj.material.color.set(color);
//     }
//   }
// }

// renderer.domElement.addEventListener("mousemove", onMouseMove);

// MULTIPLE HOVER

let hoveredObj = null;
let boxesInRow = [];
// function onMouseMove(event) {
//   mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
//   mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(scene.children, true);
//   const validBoxPrefix = "Box";
//   const filteredIntersects = intersects.filter((intersect) =>
//     intersect.object.name.startsWith(validBoxPrefix)
//   );

//   if (hoveredObj) {
//     // Check if we're still hovering over the same object or any of its related boxes
//     if (
//       !filteredIntersects.length ||
//       !boxesInRow.includes(filteredIntersects[0].object)
//     ) {
//       // Restore original colors to all related boxes and clear the list
//       boxesInRow.forEach((box) => {
//         if (box.originalColor) box.material.color.copy(box.originalColor);
//       });
//       boxesInRow = [];
//       hoveredObj = null; // Clear the hovered object since we're no longer hovering over it
//     }
//   }

//   if (
//     filteredIntersects.length > 0 &&
//     (!hoveredObj || !boxesInRow.includes(filteredIntersects[0].object))
//   ) {
//     const intersected = filteredIntersects[0].object;

//     // Clear previous boxesInRow if moving to a new row
//     if (hoveredObj !== intersected) {
//       boxesInRow.forEach((box) => {
//         if (box.originalColor) box.material.color.copy(box.originalColor);
//       });
//       boxesInRow = [];
//     }

//     hoveredObj = intersected;
//     var intersectedRow = intersected.name.split("_")[0];
//     var boxesHandle = [
//       intersectedRow,
//       `${intersectedRow}_1`,
//       `${intersectedRow}_2`,
//     ];
//     boxesHandle.forEach((boxName) => {
//       let box = scene.getObjectByName(boxName);
//       if (box) {
//         boxesInRow.push(box);
//         // Store original color if it hasn't been stored yet
//         if (!box.originalColor) {
//           box.originalColor = box.material.color.clone();
//         }
//         // Optionally change the color, e.g., to indicate hover
//         // showModal(intersected.name);
//         const palletStatus = boxDataFromXML[box.name];
//         const color = statusToColor(palletStatus); // Assumes statusToColor function is defined
//         box.material.color.set(color);
//       }
//     });
//   }
// }

// For Looop
function onMouseMove(event) {
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  const validBoxPrefix = "Box";
  const filteredIntersects = intersects.filter((intersect) =>
    intersect.object.name.startsWith(validBoxPrefix)
  );

  if (hoveredObj) {
    if (
      !filteredIntersects.length ||
      !boxesInRow.includes(filteredIntersects[0].object)
    ) {
      boxesInRow.forEach((box) => {
        if (box.originalColor) box.material.color.copy(box.originalColor);
      });
      boxesInRow = [];
      hoveredObj = null;
    }
  }

  if (
    filteredIntersects.length > 0 &&
    (!hoveredObj || !boxesInRow.includes(filteredIntersects[0].object))
  ) {
    const intersected = filteredIntersects[0].object;

    if (hoveredObj !== intersected) {
      boxesInRow.forEach((box) => {
        if (box.originalColor) box.material.color.copy(box.originalColor);
      });
      boxesInRow = [];
    }

    hoveredObj = intersected;
    var intersectedRow = intersected.name.split("_")[0];

    // Assuming intersectedRow itself should be included
    boxesInRow.push(intersected);
    if (!intersected.originalColor) {
      intersected.originalColor = intersected.material.color.clone();
    }
    intersected.material.color.set(
      statusToColor(boxDataFromXML[intersected.name])
    );

    // Use a for loop to dynamically check and add boxes
    for (let index = 0; ; index++) {
      let boxName = index === 0 ? intersectedRow : `${intersectedRow}_${index}`;
      let box = scene.getObjectByName(boxName);
      console.log("Boxrow:", boxName);
      if (box) {
        boxesInRow.push(box);
        if (!box.originalColor) {
          box.originalColor = box.material.color.clone();
        }
        box.material.color.set(statusToColor(boxDataFromXML[box.name]));
      } else {
        break; // If no box is found, exit the loop
      }
    }
  }
}
renderer.domElement.addEventListener("mousemove", onMouseMove);
