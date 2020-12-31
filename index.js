let map, markerCurrentPosition, markerTappedPosition;
const tappedPosition = { lat: null, lng: null };

const defaultCenter = { lat: 35.64889549961588, lng: 139.52722910198986 };
let currentPosition = JSON.parse(JSON.stringify(defaultCenter));

const distanceElement = document.getElementById("distance");
const hereButton = document.getElementById("here");

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    mapTypeId: "satellite",
    center: defaultCenter,
    zoom: 19,
  });
  map.setTilt(0);
  map.addListener("click", ({latLng}) => {
    console.log("map is tapped!");
    console.log({
      lat: latLng.lat(),
      lng: latLng.lng(),
    })
    tappedPosition.lat = latLng.lat();
    tappedPosition.lng = latLng.lng();

    if (markerTappedPosition) {
      markerTappedPosition.setMap(null);
    }
    markerTappedPosition = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable:true,
    });
    markerTappedPosition.addListener("dragend", callbackDragEndTappedPosition);

    distanceElement.innerHTML = calcDistanceByYard(currentPosition, tappedPosition);
  });

  markerCurrentPosition = new google.maps.Marker({
    position: defaultCenter,
    map: map,
    draggable:true,
  });
  markerCurrentPosition.addListener("dragend", callbackDragEndCurrentPosition);

  getGeolocation();

  hereButton.addEventListener('click', () => {
    clear();
    getGeolocation();
  })
}

function callbackDragEndCurrentPosition({ latLng }) {
  currentPosition.lat = latLng.lat();
  currentPosition.lng = latLng.lng();
  distanceElement.innerHTML = calcDistanceByYard(currentPosition, tappedPosition);
};

function callbackDragEndTappedPosition({ latLng }) {
  tappedPosition.lat = latLng.lat();
  tappedPosition.lng = latLng.lng();
  distanceElement.innerHTML = calcDistanceByYard(currentPosition, tappedPosition);
};

function getGeolocation() {
  console.log('start getGeolocation');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        markerCurrentPosition.setPosition(pos);
        currentPosition = pos;
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

  if (!current.lat || !current.lng || !target.lat || !target.lng) {
    return 0;
  }

  lat1 = current.lat * Math.PI / 180;
  lng1 = current.lng * Math.PI / 180;
  lat2 = target.lat * Math.PI / 180;
  lng2 = target.lng * Math.PI / 180;
  console.log({
    lat1,
    lng1,
    lat2,
    lng2,
  });
  return Math.floor(6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000 * 1.09361);
}

function clear() {
  if (markerTappedPosition) {
    markerTappedPosition.setMap(null);
  }
  distanceElement.innerHTML = 0;
}