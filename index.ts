/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Position } from "./Position";

let lastLocaton: Position = { lat: 50.873920156349776, lng: 4.7039938778997925 }; // Agora

function initBarcodeReader() {
  
}

function initMap(): void {
  const myLatLng = lastLocaton;

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 22, 
      center: myLatLng,
    }
  );

  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement("div");
  // Create the control.
  const centerControl = createScanButton(map);

  // Setup the click event listeners: simply set the map to Chicago.
  centerControl.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(function (location) {
      lastLocaton = { lat: location.coords.latitude, lng: location.coords.longitude };
      addMarker(map, lastLocaton);
      navigator.vibrate([100, 200, 200, 200, 500]);
    });
  });
  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl);

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function createScanButton(map) {
  const controlButton = document.createElement("button");

  // Set CSS for the control.
  controlButton.style.backgroundColor = "#fff";
  controlButton.style.border = "2px solid #fff";
  controlButton.style.borderRadius = "3px";
  controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlButton.style.color = "rgb(25,25,25)";
  controlButton.style.cursor = "pointer";
  controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
  controlButton.style.fontSize = "16px";
  controlButton.style.lineHeight = "38px";
  controlButton.style.margin = "8px 0 22px";
  controlButton.style.padding = "0 5px";
  controlButton.style.textAlign = "center";
  controlButton.textContent = "Scan QR";
  controlButton.title = "Scan QR code of the seat";
  controlButton.type = "button";

  return controlButton;
}

function getLocation() {
}

function addMarker(map: google.maps.Map, position: Position) {
  new google.maps.Marker({
    position: position,
    map,
    title: "ResourceID here",
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
