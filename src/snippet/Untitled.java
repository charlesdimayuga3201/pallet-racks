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