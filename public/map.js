const initMap = function() {
    const myLatlng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });
  
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      const latlng = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      infoWindow.setContent(latlng);
      infoWindow.open(map);

      const ltln = JSON.parse(latlng)
      
      const lat = ltln["lat"];
      const lng = ltln["lng"];

      document.querySelector(".latitude").value = lat
      document.querySelector(".longitude").value = lng
    });
  }


window.initMap = initMap;
