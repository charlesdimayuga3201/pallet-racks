<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet" />

    <!-- jQuery -->
    <script
      src="https://code.jquery.com/jquery-3.7.1.slim.min.js"
      integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8="
      crossorigin="anonymous"></script>
    <link rel="stylesheet" href="title.css" />
    <link rel="stylesheet" href="btn_card.css" />
    <link rel="stylesheet" href="accordion.css" />
    <!-- <link rel="stylesheet" href="style.css"> -->
    <!-- Bootstrap Bundle (includes Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.161.0/build/three.module.js",
          "three/addons/": "https://unpkg.com/three@0.161.0/examples/jsm/"
        }
      }
    </script>
    <title>My first three.js app</title>
    <style>
      body {
        margin: 0;
      }
    </style>
    <style>
      .icon-square {
        width: 4rem;
        height: 4rem;
        border-radius: 0.75rem;
      }
      small {
        font-size: 0.73em;
      }
      .pallet_content {
        justify-content: center;
        align-items: center;
        display: column;
        align-content: center;
        align-self: center;
      }
      #pallet_content {
        background-color: green;
        justify-content: center;
        align-items: center;
        display: column;
        align-content: center;
        align-self: center;
      }
      /* .Box1_content {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                align-self: center;
                align-content: center;
              } */
      .square_p1 {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        /* outline: 1px solid black; */
        height: 50px;
        width: 50px;
      }

      .square_p2 {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        /* outline: 1px solid black; */
        height: 50px;
        width: 50px;
      }
      .square_p3 {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        /* outline: 1px solid black; */
        height: 50px;
        width: 50px;
      }
      .square_p4 {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        /* outline: 1px solid black; */
        height: 50px;
        width: 50px;
      }
      .square_p5 {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline: 1px solid black;
        height: 50px;
        width: 50px;
      }
      .square_p6 {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline: 1px solid black;
        height: 50px;
        width: 50px;
      }
      .pallet1 {
        justify-content: center;
        align-items: center;
        display: flex;
        align-content: center;
        align-self: center;
      }
      .pallet2 {
        justify-content: center;
        align-items: center;
        display: flex;
        align-content: center;
        align-self: center;
      }
      .pallet3 {
        justify-content: center;
        align-items: center;
        display: flex;
        align-content: center;
        align-self: center;
      }
      .square_content {
        justify-content: center;
        align-items: center;
        display: column;
        align-content: center;
        align-self: center;
      }

      /* .modal {
          display: none;
          position: fixed;
          z-index: 2;
          left: 50%;
          top: 55%;
          transform: translate(-50%, -50%);
          width: auto;
          max-width: 400px;
          padding: 20px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          background-color: #fefefe;
          border-radius: 10px;
        } */
      /* .modal-content {
                display: flex;
              } */
      /* .modal-content > div {
                background-color: #f1f1f1;
                margin: 10px;
                padding: 20px;
              } */

      /* .pallet-content {
                display: flex;
              } */
      /* .modal > div {
                background-color: #f1f1f1;
                margin: 10px;
                padding: 20px;
              } */
      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      .modal-second {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 3; /* Sit on top */
        padding-top: 180px;
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      }
      .modal-box-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 27%;
        /* height: 90%; */
        border-radius: 6px;
      }
      .pallet-content {
        padding: 2px 16px;
      }

      /* The Close Button */
      .close-second {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        padding-right: 10px;
      }

      .close-second:hover,
      .close-second:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      #webgl-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1; /* Ensure it's above other elements */
      }

      /* Right panel styles */
      .modal {
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 300px; /* Adjust width as needed */
        background-color: #fefefe;
        z-index: 2; /* Sit on top of everything except WebGL container */
        overflow-y: auto; /* Enable vertical scroll */
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2); /* Add shadow to the left */
        padding: 20px;
      }
      .wider-vr {
        width: 2px; /* Adjust the width and color as needed */
        height: auto; /* Adjust based on your layout needs */
      }
      #boxAccordion {
        display: none;
      }
    </style>
  </head>
  <body>
    <main class="d-flex flex-row-reverse">
      <div id="webgl-container"></div>

      <script type="module" src="main.js"></script>

      <div
        class="d-flex flex-column z-3 flex-shrink-0 p-3 min-vh-100 ps-4 shadow bg-body-tertiary rounded"
        style="width: 500px">
        <!-- <img
          src="assets/mets_logorm.png"
          width="200"
          height="200"
          class="d-flex rounded mx-auto d-block" />
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"> -->
        <!-- <svg class="bi pe-none me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg> -->
        <!-- <span class="fs-4 align-text-top">Mets 3D Warehouse</span> -->
        <!-- </a> -->

        <!-- <input
          type="checkbox"
          checked
          data-toggle="toggle"
          data-on="Ready"
          data-off="Not Ready"
          data-onstyle="success"
          data-offstyle="danger" />

        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault" />
        </div> -->

        <!-- <div
          class="btn-group pt-4"
          role="group"
          aria-label="Basic radio toggle button group">
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            checked />
          <label class="btn btn-outline-primary" for="btnradio1"
            >Button 1</label
          >

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off" />
          <label class="btn btn-outline-primary" for="btnradio2"
            >Button 2</label
          >
        </div> -->
        <section class="container pt-5">
          <div class="pt-2 mt-30">
            <div class="-30 pb-5">
              <div class="card">
                <div
                  class="box-shadow bg-white rounded-circle mx-auto text-center"
                  style="width: 130px; height: 130px; margin-top: -40px">
                  <img src="assets/mets_logorm.png" class="img-fluid" alt="" />
                </div>
                <div class="card-body text-center">
                  <h3 class="card-title">Mets 3D Warehouse</h3>

                  <p class="card-text text-sm">
                    Welcome to Viewer Mets 3D Warehouse <br />Mapping and
                    Maintenance of the Warehouse Contents
                  </p>
                  <p class="d-inline-flex mx-auto">
                    <button
                      class="btn btn-primary dim btn-large-dim w-xs"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseInfo"
                      aria-expanded="false"
                      aria-controls="collapseInfo">
                      <i class="bi bi-check"></i>

                      <span>CHECK DETAILS</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="collapse pb-5" id="collapseInfo">
          <div class="card card-body">
            <div class="container">
              <div class="row justify-content-evenly">
                <div class="col-md-10 text-center p-2">
                  <div class="big-title">
                    <h3 class="big_title">WAREHOUSE INFORMATION</h3>
                  </div>
                  <!-- <h5 class="mt-2 mb-4 lh-1 fw-bold ">WAREHOUSE INFORMATION</h5> -->
                </div>
                <div class="col-md-3 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0"
                    id="WarehouseCode">
                    <i class="bi bi-houses" style="font-size: 2.5rem"></i>
                  </div>
                  <p class=""><small>MLICEB</small></p>
                </div>
                <div class="col-md-3 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <i class="bi bi-house" style="font-size: 2.5rem"></i>
                  </div>
                  <p class=""><small>METS 1</small></p>
                </div>

                <div class="col-md-3 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <i class="bi bi-door-open" style="font-size: 2.5rem"></i>
                  </div>
                  <p class=""><small>ROOM 1</small></p>
                </div>
                <div class="col-md-3 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <i class="bi bi-snow" style="font-size: 2.5rem"></i>
                  </div>
                  <p><small>COLD STORAGE</small></p>
                </div>
              </div>
              <hr />
              <div class="row justify-content-evenly">
                <div class="col-md-10 text-center p-2">
                  <div class="big-title2">
                    <h3 class="big_title2">PALLET LOCATION</h3>
                  </div>

                  <!-- <h5 class="mt-2 mb-4 lh-1 fw-bold">PALLET LOCATION</h5> -->
                </div>
                <div class="col-md-3 p-2 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <i class="bi bi-align-start" style="font-size: 2.5rem"></i>
                  </div>
                  <p><small>ROW: 1</small></p>
                </div>
                <div class="col-md-3 p-2 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <i
                      class="bi bi-bar-chart-line-fill"
                      style="font-size: 2.5rem"></i>
                  </div>
                  <p><small>LEVEL: 1</small></p>
                </div>
                <div class="col-md-3 p-2 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <i class="bi bi-align-bottom" style="font-size: 2.5rem"></i>
                  </div>
                  <p><small>DEPTH: 4</small></p>
                </div>
              </div>
              <hr />
              <div class="row justify-content-evenly">
                <div class="col-md-10 text-center p-2">
                  <div class="big-title3">
                    <h3 class="big_title3">PALLET COUNT</h3>
                  </div>
                  <!-- <h5 class="mt-2 mb-4 lh-1 fw-bold">PALLET COUNT</h5> -->
                </div>
                <div class="col-md-5 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <h6 style="font-size: 2rem" class="">1</h6>
                  </div>
                </div>
                <div class="col-md-5 text-center">
                  <div
                    class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0">
                    <h6 style="font-size: 2rem" class="">4</h6>
                  </div>
                </div>

                <div class="col-md-5 text-center">
                  <p><small>CURRENT</small></p>
                </div>

                <div class="col-md-5 text-center">
                  <p><small>MAX</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- collapse -->

        <!-- <div id="infoModal">
          <div
            class="square_content d-grid gap-3 d-md-flex justify-content-md mx-auto">
            <button id="myBtn4" class="btn btn-primary btn-sm">
              <div class="square_p4"></div>
            </button>

            <button id="myBtn1" class="btn btn-primary btn-sm" type="button">
              <div class="square_p1"></div>
            </button>

            <button id="myBtn2" class="btn btn-primary btn-sm" type="button">
              <div class="square_p2"></div>
            </button>

            <button id="myBtn3" class="btn btn-primary btn-sm" type="button">
              <div class="square_p3"></div>
            </button>
          </div>

          <p id="modalText">Click the specific Box to show the details...</p>
          <div class="pallet_content"></div>
          <div id="pallet_content" class="side-panel"></div>
          <div class="modal-second" id="myModal">
            <div class="modal-box-content">
              <span class="close-second">&times;</span>
            </div>
          </div> -->

        <!-- Accordion -->
        <div id="boxAccordion" class="accordion accordion-flush p-2">
          <!-- <div class="accordion accordion-flush" id="accordionFlushExample ">
            <div class="accordion-item border">
              <h2 class="accordion-header" id="heading${index}">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse${index}"
                  aria-expanded="true"
                  aria-controls="collapse${index}">
                  Box: ${classname}
                </button>
              </h2>
              <div
                id="collapse${index}"
                class="accordion-collapse collapse"
                aria-labelledby="heading${index}"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <div>
                    <div id="accordion" class="accordion-style">
                      <div class="card">
                        <div class="card-header" id="headingOne">
                          <h5 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="false"
                              aria-controls="collapseOne">
                              <i
                                class="bi bi-x-diamond"
                                style="font-size: 1rem"></i>
                              Box: ${classname}
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseOne"
                          class="collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordion"
                          style="">
                          <div class="card-body position-relative">
                            <p>Warehouse: ${warehouse}</p>
                            <p>Storage Type: ${storageType}</p>
                            <p>Pallet Content: ${palletContent}</p>
                            <p>Pallet Status: ${palletStatus}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!--  -->
          <!-- <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Accordion Item #1
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Accordion Item #2
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Accordion Item #3
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  Accordion Item #4
                </button>
              </h2>
              <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
              </div>
            </div>
          </div> -->
        </div>
        <!-- <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#home" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#speedometer2" />
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#table" />
              </svg>
              Orders
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#grid" />
              </svg>
              Products
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#people-circle" />
              </svg>
              Customers
            </a>
          </li>
        </ul> -->
        <hr />
        <!-- <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div> -->
      </div>

      <!-- <div id="webgl-container"></div>

    <script type="module" src="main.js"></script>

    <div id="infoModal" class="modal">
      <h1>Mets Warehouse</h1>
      <h2>Pallet Box Row</h2>
      <div class="modal-content">
        <div class="pallet4"></div>
        <div class="square_content">
          <button id="myBtn4">
            <div class="square_p4"></div>
          </button>
          <br />
        <div class="pallet3"></div>
        <div class="square_content">
          <button id="myBtn3">
            <div class="square_p3"></div>
          </button>
          <br />
        </div>
        <div class="pallet2"></div>
        <div class="square_content">
          <button id="myBtn2">
            <div class="square_p2"></div>
          </button>
          <br />
        </div>
        <div class="pallet1"></div>
        <div class="square_content">
          <button id="myBtn1">
            <div class="square_p1"></div>
          </button>
          <br />
        </div>

        <p id="modalText">Click the specific Box to show the details...</p>
   
        <div id="pallet_content" class = "side-panel"></div>
      </div>
    </div>
    <div class="modal-second" id="myModal">
      <div class="modal-box-content">
        <span class="close-second">&times;</span>

        <div class="pallet_content"></div>
       
      </div>
    </div> -->
    </main>
  </body>

  <script>
    /* global bootstrap: false */
    (() => {
      "use strict";
      const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    })();
  </script>
</html>









// $(function () {
//   fetch("data.xml")
//     .then((response) => response.text())
//     .then((data) => {
//       const parser = new DOMParser();
//       const xml = parser.parseFromString(data, "application/xml");
//       parseXml(xml);
//     })
//     .catch((error) => console.error("Error fetching the XML:", error));
// });
// let boxDataFromXML = {};
// function parseXml(xml, boxesToHandle) {
//   $("#boxAccordion").empty(); // Clear existing accordion items
//   $(xml)
//     .find("box")
//     .each(function (index) {
//       var classname = $(this).attr("class");
//       var warehouse = $(this).find("warehouse").text();
//       var storageType = $(this).find("storageType").text();
//       var palletContent = $(this).find("palletContent").text();
//       var palletStatus = $(this).find("palletStatus").text();

//       boxDataFromXML[classname] = palletStatus;
//       // Check if classname exists in boxesToHandle array
//       if (boxesToHandle.includes(classname)) {
//         $("#boxAccordion").append(`
//           <div class="accordion accordion-flush pb-2" id="accordionFlushExample ">
//             <div class="accordion-item border">
//               <h2 class="accordion-header" id="heading${index}">
//                 <button
//                   class="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#collapse${index}"
//                   aria-expanded="true"
//                   aria-controls="collapse${index}">
//                   Box: ${classname}
//                 </button>
//               </h2>
//               <div
//                 id="collapse${index}"
//                 class="accordion-collapse collapse"
//                 aria-labelledby="heading${index}"
//                 data-bs-parent="#accordionFlushExample">
//                 <div class="accordion-body">
//                   <div>
//                     <div id="accordion${index}" class="accordion-style">
//                       <div class="card">
//                         <div class="card-header" id="headingOne">
//                           <h5 class="mb-0">
//                             <button
//                               class="btn btn-link collapsed"
//                               data-bs-toggle="collapse"
//                               data-bs-target="#collapseOne${index}"
//                               aria-expanded="false"
//                               aria-controls="collapseOne${index}">
//                               <i
//                                 class="bi bi-x-diamond"
//                                 style="font-size: 1rem"></i>
//                               Box: ${classname}
//                             </button>
//                           </h5>
//                         </div>
//                         <div
//                           id="collapseOne${index}"
//                           class="collapse"
//                           aria-labelledby="headingOne"
//                           data-bs-parent="#accordion${index}"
//                           style="">
//                           <div class="card-body position-relative">
//                             <p>Warehouse: ${warehouse}</p>
//                             <p>Storage Type: ${storageType}</p>
//                             <p>Pallet Content: ${palletContent}</p>
//                             <p>Pallet Status: ${palletStatus}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `);
//       }
//     });
// }
// let boxesToHandle = [];
// function FilteredPalletData(boxName) {
//   var baseBoxName = boxName.split("_")[0];
//   // Initialize the boxesToHandle array

//   boxesToHandle = [];
//   // Dynamically generate boxesToHandle with the base box and two numbered boxes
//   for (let i = 0; i < 3; i++) {
//     boxesToHandle.push(i === 0 ? baseBoxName : `${baseBoxName}_${i}`);
//   }
//   console.log("OBJ NAME PER ROW: ", boxesToHandle);
//   parseXml(boxesToHandle);
// }