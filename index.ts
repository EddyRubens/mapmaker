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

  const findMeButton = createButton('Find me');
  findMeButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(function (location) {
      lastLocaton = { lat: location.coords.latitude, lng: location.coords.longitude };
      map.setCenter(lastLocaton);
      navigator.vibrate([100, 200, 200, 200, 500]);
    });
  });
  centerControlDiv.appendChild(findMeButton);

  const qrButton = createButton('Scan QR');
  qrButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(function (location) {
      lastLocaton = { lat: location.coords.latitude, lng: location.coords.longitude };
      addMarker(map, lastLocaton, `id: 300917 - Agora - Silent Study Seat 208 - lon:${location.coords.latitude} lat:${location.coords.longitude}`);
      navigator.vibrate([100, 200, 200, 200, 500]);
    });
  });
  centerControlDiv.appendChild(qrButton);
  
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function createButton(text: string) {
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
  controlButton.textContent = text;
  controlButton.title = text;
  controlButton.type = "button";

  return controlButton;
}

function getLocation() {
}

function addMarker(map: google.maps.Map, position: Position, title: string) {
  new google.maps.Marker({
    position: position,
    map,
    title: title,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
