let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    defaultCenter: { lat: 35.6809591, lng: 139.7673068},
    center: { lat: -34.397, lng: 150.644 },
    zoom: 18,
  });
}
