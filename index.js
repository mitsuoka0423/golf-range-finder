let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    mapTypeId: "satellite",
    center: { lat: 35.6809591, lng: 139.7673068 },
    zoom: 18,
  });

  const marker = new google.maps.Marker({
    position: { lat: 35.6809591, lng: 139.7673068 },
    map: map,
  });

  if (navigator.geolocation) {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          marker.setPosition(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    }, 3000);
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
