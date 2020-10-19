let map, markerCurrentPosition, markerTappedPosition;

const defaultCenter = { lat: 35.649218, lng: 139.5255548 };
let current = JSON.parse(JSON.stringify(defaultCenter));

const distanceElement = document.getElementById("distance");

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    mapTypeId: "satellite",
    center: defaultCenter,
    zoom: 19,
  });
  map.setTilt(0);
  map.addListener("click", ({latLng}) => {
    console.log("map is tapped!");
    console.log({latLng});
    
    if (markerTappedPosition) {
      markerTappedPosition.setMap(null);
    }
    markerTappedPosition = new google.maps.Marker({
      position: latLng,
      map: map,
    });

    distanceElement.innerHTML = calcDistanceByYard(current, latLng);
  });

  markerCurrentPosition = new google.maps.Marker({
    position: defaultCenter,
    map: map,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        markerCurrentPosition.setPosition(pos);
        current = pos;
      },
      () => {
        handleLocationError(true);
      }
    );
  } else {
    handleLocationError(false);
  }
}

function handleLocationError(browserHasGeolocation) {
  const message = browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.";
  alert(message);
}

function calcDistanceByYard(current, target) {
  return Math.random();
}