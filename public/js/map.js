var map = L.map('map').setView(coordinates.reverse(), 12);
new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let marker = L.marker(coordinates).addTo(map);
marker.bindPopup("Exact address will be provided after booking");
