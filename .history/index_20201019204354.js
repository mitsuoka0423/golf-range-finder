let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    map
    center: { lat: 35.6809591, lng: 139.7673068 },
    zoom: 18,
    mapTypeId: 'satellite'

  });
}
