let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    defaultCenter: { lat: -34.397, lng: 150.644 },
    center: { lat: -34.397, lng: 150.644 },
    zoom: 18,
  });
}
