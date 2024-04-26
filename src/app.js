import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AmbientLight, DirectionalLight, HemisphereLight } from "three";
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
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

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
$(function () {
  // Your jQuery code goes here
  // Example: Send an AJAX request to your server when a button is clicked
  $("#myBtn4").on("click", function () {
    $.ajax({
      url: "/getData", // Assuming this is the route to fetch data from the server
      method: "GET",
      success: function (data) {
        // Handle successful response from the server
        console.log("Data received:", data);
      },
      error: function (xhr, status, error) {
        // Handle errors
        console.error("Error fetching data:", error);
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myBtn4").addEventListener("click", () => {
    // Fetch data from the server (replace "/data" with your actual API endpoint)
    fetch("/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // const palletDiv = document.getElementById("pallet_content");

        // Loop through the retrieved data and create <p> elements
        data.forEach((item) => {
          // const p = document.createElement("p");
          // p.textContent = `${item.WarehouseCode}, ${item.PalletCode}`;
          $("#pallet_content").append(`
          <div id"pallet_content" style="display: block;">
              <p>Warehouse: ${item.LocationCode}</p>
       
          </div>
      `);

          console.log(item.LocationCode);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
